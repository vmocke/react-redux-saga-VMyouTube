import React from 'react';
import classes from './MenuPageItem.module.css';

interface MenuPageItemProps {
    onClick: any;
    title: string;
    id: string;
}

const MenuPageItem = (props: MenuPageItemProps) => {
    return (
        <React.Fragment>
            <li className={classes.MenuPageItem} id={props.id} onClick={props.onClick}>
                {props.title}
            </li>
        </React.Fragment>
    );
};

export default MenuPageItem;
