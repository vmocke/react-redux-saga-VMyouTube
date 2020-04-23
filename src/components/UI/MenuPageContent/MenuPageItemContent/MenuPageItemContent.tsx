import React from 'react';
import classes from './MenuPageItemContent.module.css';
import Button from '../../Button/Button';

interface MenuPageItemContentProps {
    id: string;
    onClick: any;
    text?: string;
    children?: any;
    onClickButton: any;
}

const MenuPageItemContent = (props: MenuPageItemContentProps) => {
    return (
        <div className={classes.MenuPageContentDiv}>
            <Button title="X" onClick={props.onClickButton} className={classes.MenuPageItemButton} />
            <li className={classes.MenuPageItemContent} id={props.id} onClick={props.onClick}>
                {props.children || <p>{props.text}</p>}
            </li>
        </div>
    );
};

export default MenuPageItemContent;
