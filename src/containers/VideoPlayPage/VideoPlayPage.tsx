import React, { useState } from 'react';
import classes from './VideoPlayPage.module.css';
import VideoCard from '../../components/UI/VideoCard/VideoCard';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../..';
import { limitTitle } from '../../shared/utility';
import * as actionsVideos from '../../store/actions/actionsVideos';
import SpinnerBig from '../../components/UI/SpinnerBig/SpinnerBig';
import HiddenMenu from '../../components/UI/HiddenMenu/HiddenMenu';
import HiddenMenuItem from '../../components/UI/HiddenMenu/HiddenMenuItem/HiddenMenuItem';

const VideoPlayPage = () => {
    const [showVideo, setShowVideo] = useState(false);

    const chosenVideo_ = useSelector((state: AppState) => state.reducer_Videos.chosenVideo);
    const data_ = useSelector((state: AppState) => state.reducer_Videos.data);
    const menuItems_ = useSelector((state: AppState) => state.reducer_Videos.menuItems);

    const dispatch = useDispatch();
    const on_Video_Card_Clicked = (item: {}, menuItemsCopy: any[]) =>
        dispatch(actionsVideos.onVideoCardClickedvideoPlay(item, menuItemsCopy));
    const on_Item_Move_To_Playlist_Handler = (menuItemsCopy: []) =>
        dispatch(actionsVideos.onItemMoveToPlaylist(menuItemsCopy));

    const videoHistory_: any[] = [];
    const elIndex = menuItems_.findIndex((el) => el.itemTitle === 'Videos history');
    const menuItemsCopy: any[] = [...menuItems_];
    videoHistory_.push(...menuItemsCopy[elIndex].content);

    const onVideoCardClikedHandler = (e: any, item: {}) => {
        e.preventDefault();
        setShowVideo(true);
        setTimeout(() => {
            setShowVideo(false);
            videoHistory_.push(item);
            menuItemsCopy[elIndex] = { ...menuItemsCopy[elIndex], content: videoHistory_ };

            on_Video_Card_Clicked(item, menuItemsCopy);
        }, 2000);
    };

    const onItemMoveToPlaylistHandler = (e: any, playlist: string, item: { id: { videoId: string } }) => {
        e.preventDefault();
        const playlistNew: any[] = [];
        const elIndex = menuItems_.findIndex((el) => el.itemTitle === playlist);
        const menuItemsCopy: any = [...menuItems_];
        playlistNew.push(...menuItems_[elIndex].content);
        const checkDublicates = playlistNew.filter((itemOld) => itemOld.id.videoId === item.id.videoId);
        if (checkDublicates.length === 0) {
            playlistNew.push(item);
            menuItemsCopy[elIndex] = { ...menuItemsCopy[elIndex], content: playlistNew };
            on_Item_Move_To_Playlist_Handler(menuItemsCopy);
        } else {
            alert('You already have this video in PLAYLIST');
        }
    };

    let videoContent = null;
    if (chosenVideo_.length !== 0) {
        videoContent = (
            <React.Fragment>
                {chosenVideo_.map((item: { id: { videoId: string }; title: string; desc: string }, index: number) => {
                    const videoSrc = `https://www.youtube.com/embed/${item.id.videoId}`;
                    return (
                        <div key={`${item.id.videoId}${index}`} id={item.id.videoId} className={classes.VideoContent}>
                            <h1>{limitTitle(item.title, 40)}</h1>
                            <iframe
                                id="player"
                                width="767"
                                height="500"
                                src={videoSrc}
                                allowFullScreen
                                frameBorder="0"
                                title={item.title}
                            ></iframe>
                            <HiddenMenu name="Move To">
                                {menuItems_.map((itemMenu: any) => {
                                    if (
                                        itemMenu.itemTitle !== 'Search history' &&
                                        itemMenu.itemTitle !== 'Videos history'
                                    ) {
                                        return (
                                            <HiddenMenuItem
                                                key={itemMenu.itemTitle}
                                                id={itemMenu.itemTitle}
                                                title={itemMenu.itemTitle}
                                                onClick={(e: any) =>
                                                    onItemMoveToPlaylistHandler(e, itemMenu.itemTitle, item)
                                                }
                                            />
                                        );
                                    } // eslint-disable-next-line
                                    return;
                                })}
                            </HiddenMenu>
                            <h3>{limitTitle(item.desc, 400)}</h3>
                        </div>
                    );
                })}
            </React.Fragment>
        );
    }

    let videoPlayPageList = null;
    if (data_ !== null && data_ !== undefined && data_.length !== 0) {
        videoPlayPageList = (
            <div className={classes.VideoPlayPageList}>
                {data_.map(
                    (
                        item: { id: { videoId: string }; img: { url: string }; title: string; desc: string },
                        index: number,
                    ) => {
                        return (
                            <figure
                                key={`${item.id.videoId}${index}`}
                                id={item.id.videoId}
                                className={classes.VideoPlayPageListCard}
                                onClick={(e) => {
                                    onVideoCardClikedHandler(e, item);
                                }}
                            >
                                <VideoCard
                                    src={item.img.url}
                                    alt={item.title}
                                    title={limitTitle(item.title, 30)}
                                    descr={limitTitle(item.desc, 80)}
                                    width="160"
                                    height="90"
                                />
                            </figure>
                        );
                    },
                )}
            </div>
        );
    }

    return (
        <div className={classes.VideoPlayPage}>
            {showVideo ? <SpinnerBig /> : videoContent}
            {videoPlayPageList}
        </div>
    );
};

export default VideoPlayPage;
