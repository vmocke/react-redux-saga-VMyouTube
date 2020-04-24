import React from 'react';
import classes from './Logo.module.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../..';
import anonymous from '../../../assets/img/anonymous.jpg';

const Logo = () => {
    const userInfo = useSelector((state: AppState) => state.reducer_Auth.userInfo);

    let logo;
    if (!userInfo.img) {
        logo = <img src={anonymous} alt="Anonymous" />;
    } else {
        logo = <img src={userInfo.img} alt={userInfo.img} />;
    }
    return <div className={classes.Logo}>{logo}</div>;
};

export default Logo;
