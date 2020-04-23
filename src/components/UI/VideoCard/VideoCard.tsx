import React from 'react';
import classes from './VideoCard.module.css';

interface VideoCardProps {
    src: string;
    width?: string;
    height?: string;
    alt: string;
    title: string;
    descr?: string;
}

const VideoCard = (props: VideoCardProps) => {
    return (
        <React.Fragment>
            <img
                style={{ display: 'flex' }}
                src={props.src}
                width={props.width}
                height={props.height}
                alt={props.alt}
            />
            <div className={classes.VideoCardDesc}>
                <h1>{props.title}</h1>
                {props.descr && <h2>{props.descr}</h2>}
            </div>
        </React.Fragment>
    );
};

export default VideoCard;
