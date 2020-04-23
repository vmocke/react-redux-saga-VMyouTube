import React from 'react';
import classes from './Backdrop.module.css';

interface BackdropProps {
    show: boolean | any;
    onClick?: () => void;
}

const Backdrop = (props: BackdropProps) => {
    return props.show ? <div className={classes.Backdrop} onClick={props.onClick}></div> : null;
};

export default Backdrop;
