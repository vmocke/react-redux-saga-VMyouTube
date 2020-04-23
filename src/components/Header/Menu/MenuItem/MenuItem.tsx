import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MenuItem.module.css';

interface MenuItemProps {
    to: string;
    children: any;
    onClick?: any;
}
const MenuItem = (props: MenuItemProps) => {
    return (
        <li className={classes.MenuItem} onClick={props.onClick}>
            <NavLink to={props.to} activeClassName={classes.active}>
                {props.children}
            </NavLink>
        </li>
    );
};

export default MenuItem;
