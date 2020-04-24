import React, { useState } from 'react';
import classes from './VideosShowPage.module.css';
import VideoCard from '../../components/UI/VideoCard/VideoCard';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../..';
import { limitTitle } from '../../shared/utility';
import * as actionsVideos from '../../store/actions/actionsVideos';
import SpinnerBig from '../../components/UI/SpinnerBig/SpinnerBig';
import anonymous from '../../assets/img/anonymous.jpg';

const VideosShowPage = (props: any) => {
    const [showVideo, setShowVideo] = useState(false);

    const searchSpinner_ = useSelector((state: AppState) => state.reducer_Videos.searchSpinner);
    const data_ = useSelector((state: AppState) => state.reducer_Videos.data);
    const menuItems_ = useSelector((state: AppState) => state.reducer_Videos.menuItems);
    const userInfo_ = useSelector((state: AppState) => state.reducer_Auth.userInfo);

    const dispatch = useDispatch();
    const on_Video_Card_Clicked = (fiterItem: [], menuItemsCopy: any[]) =>
        dispatch(actionsVideos.onVideoCardClicked(fiterItem, menuItemsCopy));

    const videoHistory_: any[] = [];
    const elIndex = menuItems_.findIndex((el) => el.itemTitle === 'Videos history');
    const menuItemsCopy: any[] = [...menuItems_];
    videoHistory_.push(...menuItemsCopy[elIndex].content);

    const onVideoCardClickHandler = (e: any, id: string) => {
        e.preventDefault();
        setShowVideo(true);
        setTimeout(() => {
            setShowVideo(false);
            const fiterItem: any = data_ && data_.filter((item: { id: { videoId: string } }) => item.id.videoId === id);
            videoHistory_.push(...fiterItem);
            menuItemsCopy[elIndex] = { ...menuItemsCopy[elIndex], content: videoHistory_ };

            on_Video_Card_Clicked(fiterItem, menuItemsCopy);
            props.history.push('/videoPlay');
        }, 1000);
    };

    let videoCards = null;
    if (data_ !== null && data_ !== undefined && data_.length !== 0) {
        videoCards = (
            <React.Fragment>
                {data_.map((item: { id: { videoId: string }; title: string; img: { url: string } }, index: number) => {
                    return (
                        <figure
                            className={classes.VideoShowPageCard}
                            key={`${item.id.videoId}${index}`}
                            id={item.id.videoId}
                            onClick={(e) => {
                                onVideoCardClickHandler(e, item.id.videoId);
                            }}
                        >
                            <VideoCard src={item.img.url} alt={item.title} title={limitTitle(item.title, 60)} />
                        </figure>
                    );
                })}
            </React.Fragment>
        );
    }

    let someInfo = (
        <div className={classes.someInfo}>
            {userInfo_.img ? (
                <img src={userInfo_.img} alt={userInfo_.img} />
            ) : (
                <img src={anonymous} alt={anonymous} width="400rem" />
            )}
            <div>
                <h3>Logged in as:</h3>
                <h2>{userInfo_.fullName}</h2>
                {userInfo_.email && (
                    <React.Fragment>
                        <h3>whit email:</h3>
                        <h2>{userInfo_.email}</h2>
                    </React.Fragment>
                )}
            </div>
        </div>
    );

    return (
        <div className={classes.VideosShowPage}>
            {searchSpinner_ || showVideo ? <SpinnerBig /> : videoCards ? videoCards : someInfo}
        </div>
    );
};

export default VideosShowPage;
