import React, { useState } from 'react';
import classes from './MenuPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../..';
import * as actionsVideos from '../../store/actions/actionsVideos';
import { withRouter } from 'react-router-dom';
import MenuPageItem from '../../components/UI/MenuPageContent/MenuPageItem/MenuPageItem';
import MenuPageItemContent from '../../components/UI/MenuPageContent/MenuPageItemContent/MenuPageItemContent';
import Button from '../../components/UI/Button/Button';
import VideoCard from '../../components/UI/VideoCard/VideoCard';

const MenuPage = (props: any) => {
    const [newField, setNewField] = useState(false);
    const [fieldInput, setInputField] = useState('');
    const [menuItemContent, setMenuItemContent]: any[] = useState([]);

    const menuItems_ = useSelector((state: AppState) => state.reducer_Videos.menuItems);

    const dispatch = useDispatch();
    const on_Create_New_Playlist = (menuItemsCopy: {}[]) => dispatch(actionsVideos.onCreateNewPlaylist(menuItemsCopy));
    const on_Delete_Playlist_Handler = (menuItemsCopy: {}[]) => dispatch(actionsVideos.onDeletePlaylist(menuItemsCopy));
    const on_Search_History_Handler = (searchVal: { value: string }, menuItemsCopy: {}[]) =>
        dispatch(actionsVideos.onSearchHistory(searchVal, menuItemsCopy));
    const on_Play_Video_From_History_Handler = (itemFromHistory: {}[]) =>
        dispatch(actionsVideos.onPlayVideoFromHistory(itemFromHistory));
    const on_Remove_Item_From_Play_list = (menuItemsCopy: {}[]) =>
        dispatch(actionsVideos.onRemoveItemFromPlaylist(menuItemsCopy));
    const on_Delete_All_Handler = (menuItemsCopy: {}[]) => dispatch(actionsVideos.onDeleteAll(menuItemsCopy));

    const goBack = (e: any) => {
        e.preventDefault();
        props.history.goBack();
    };

    const onAddNewMenuItem = (e: any) => {
        e.preventDefault();
        setNewField(true);
    };

    const onInputHandler = (e: any) => {
        e.preventDefault();
        setInputField(e.target.value);
    };

    const onButtonOkHandler = (e: any) => {
        e.preventDefault();
        const menuItemsCopy: any[] = menuItems_;
        const checkDublicate = menuItemsCopy.filter((item: { itemTitle: string }) => item.itemTitle === fieldInput);
        if (checkDublicate.length === 0) {
            menuItemsCopy.push({ itemTitle: fieldInput, content: [] });
            setNewField(false);
            on_Create_New_Playlist(menuItemsCopy);
        } else {
            alert('This name is taken! Try other.');
        }
    };

    const onButtonCancelHandler = (e: any) => {
        e.preventDefault();
        setNewField(false);
    };

    const showMenuContent = (id: string) => {
        const arr: any = menuItems_.filter((item: { itemTitle: string }) => item.itemTitle === id);
        setMenuItemContent(arr);
    };

    const onPlayVideoFromHistoryHandler = (e: any, id: string) => {
        e.preventDefault();
        const itemFromHistory: {}[] = [];
        menuItemContent.map((item: any) =>
            // eslint-disable-next-line
            item.content.filter((item: { id: { videoId: string } }) => {
                if (item.id.videoId === id && itemFromHistory.length === 0) {
                    itemFromHistory.push(item);
                }
            }),
        );
        on_Play_Video_From_History_Handler(itemFromHistory);
        props.history.push('/videoPlay');
    };

    const onSearchHistoryHandler = (e: any, id: string) => {
        e.preventDefault();
        const searchVal = { value: id };
        const history: string[] = [];
        const elIndex: number = menuItems_.findIndex(
            (el: { itemTitle: string }) => el.itemTitle === menuItems_[0].itemTitle,
        );
        const menuItemsCopy: any[] = [...menuItems_];
        history.push(...menuItemsCopy[elIndex].content);
        const updateHistory = history.concat(searchVal.value);
        menuItemsCopy[elIndex] = { ...menuItemsCopy[elIndex], content: updateHistory };

        on_Search_History_Handler(searchVal, menuItemsCopy);
        props.history.push('/search');
    };

    const onDeletePlaylistHandler = (e: any) => {
        e.preventDefault();
        const elIndex: number = menuItems_.findIndex((el: any) => el.itemTitle === e.target.id);
        const menuItemsCopy: {}[] = [...menuItems_];
        menuItemsCopy.splice(elIndex, 1);
        on_Delete_Playlist_Handler(menuItemsCopy);
    };

    const onDeleteFromPlaylistHandler = (e: any, index: number) => {
        e.preventDefault();
        const menuItemContentCopy: any = [...menuItemContent];
        menuItemContentCopy[0].content.splice(index, 1);

        const menuItemsCopy: {}[] = [...menuItems_];
        const elIndex: number = menuItems_.findIndex((el: any) => el.itemTitle === menuItemContentCopy[0].itemTitle);
        menuItemsCopy[elIndex] = { ...menuItemsCopy[elIndex], content: menuItemContentCopy[0].content };
        on_Remove_Item_From_Play_list(menuItemsCopy);
    };

    const onDeleteAllHandler = (e: any) => {
        e.preventDefault();
        const menuItemsCopy: {}[] = [...menuItems_];
        const elIndex: number = menuItems_.findIndex((el: any) => el.itemTitle === e.target.id);
        menuItemsCopy[elIndex] = { ...menuItemsCopy[elIndex], content: [] };
        on_Delete_All_Handler(menuItemsCopy);
        props.history.push('/menu');
    };

    const MenuItems = menuItems_.map((item) => {
        return (
            <div key={item.itemTitle} className={classes.MenuListItem}>
                <Button
                    id={item.itemTitle}
                    title="X"
                    onClick={(e: any) => {
                        onDeletePlaylistHandler(e);
                    }}
                />
                <MenuPageItem
                    id={item.itemTitle}
                    onClick={(e: any) => {
                        showMenuContent(e.target.id);
                    }}
                    title={item.itemTitle}
                />
            </div>
        );
    });

    let showItemContent = <h1>The list is empty</h1>;
    if (menuItemContent.length !== 0 && menuItemContent[0].content.length !== 0) {
        if (typeof menuItemContent[0].content[0] !== 'string') {
            showItemContent = (
                <React.Fragment>
                    <div className={classes.MenuWatchHistoryHeader}>
                        <Button
                            id={menuItemContent[0].itemTitle}
                            title="DELTE ALL"
                            onClick={(e: any) => {
                                onDeleteAllHandler(e);
                            }}
                        />
                        <h1>{menuItemContent[0].itemTitle}</h1>
                    </div>
                    <ul>
                        {menuItemContent[0].content.map((item: any, index: number) => {
                            return (
                                <MenuPageItemContent
                                    key={`${item.id.videoId}${index}`}
                                    id={item.id.videoId}
                                    onClickButton={(e: any) => {
                                        onDeleteFromPlaylistHandler(e, index);
                                    }}
                                    onClick={(e: any) => {
                                        onPlayVideoFromHistoryHandler(e, item.id.videoId);
                                    }}
                                >
                                    <VideoCard
                                        src={item.img.url}
                                        alt={item.title}
                                        title={item.title}
                                        width="100rem"
                                        height="50rem"
                                    />
                                </MenuPageItemContent>
                            );
                        })}
                    </ul>
                </React.Fragment>
            );
        } else {
            showItemContent = (
                <React.Fragment>
                    <div className={classes.MenuWatchHistoryHeader}>
                        <Button id={menuItemContent[0].itemTitle} title="DELTE ALL" onClick={() => {}} />
                        <h1>{menuItemContent[0].itemTitle}</h1>
                    </div>
                    <ul>
                        {menuItemContent[0].content.map((item: any, index: number) => {
                            return (
                                <MenuPageItemContent
                                    key={`${item}${index}`}
                                    id={item}
                                    text={item}
                                    onClickButton={(e: any) => {
                                        onDeleteFromPlaylistHandler(e, index);
                                    }}
                                    onClick={(e: any) => {
                                        onSearchHistoryHandler(e, item);
                                    }}
                                />
                            );
                        })}
                    </ul>
                </React.Fragment>
            );
        }
    }

    let newItemInput = (
        <form onSubmit={onButtonOkHandler}>
            <p>Playlist title</p>
            <input
                onChange={(e) => {
                    onInputHandler(e);
                }}
                autoFocus
            />
            <Button title="OK" onClick={onButtonOkHandler} />
            <Button title="CANCEL" onClick={onButtonCancelHandler} />
        </form>
    );

    let buttons = (
        <React.Fragment>
            <Button
                title="EXIT MENU"
                onClick={(e: any) => {
                    goBack(e);
                }}
            />
            <Button
                title="CREATE NEW PLAYLIST"
                onClick={(e: any) => {
                    onAddNewMenuItem(e);
                }}
            />
        </React.Fragment>
    );

    return (
        <div className={classes.MenuPage}>
            <div className={classes.MenuList}>
                {buttons}
                <h1>Menu</h1>
                <ul>{MenuItems}</ul>
                {newField ? newItemInput : null}
            </div>
            <div className={classes.MenuWatchHistory}>{showItemContent}</div>
        </div>
    );
};

export default withRouter(MenuPage);
