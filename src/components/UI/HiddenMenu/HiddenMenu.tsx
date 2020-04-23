import React from 'react';
import classes from './HiddenMenu.module.css';

interface HiddenMenuProps {
    name: string;
    children: any;
}

const HiddenMenu = (props: HiddenMenuProps) => {
    return (
        <div className={classes.HiddenMenuDiv}>
            <div className={classes.HiddenMenuText}>
                <h3>{props.name}</h3>
            </div>
            <ul className={classes.HiddenMenu}>{props.children}</ul>
        </div>
    );
};

export default HiddenMenu;
