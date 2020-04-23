import React from 'react';

interface HiddenMenuItemProps {
    id: string;
    title: string;
    onClick: any;
}

const HiddenMenuItem = (props: HiddenMenuItemProps) => {
    return (
        <li id={props.id} onClick={props.onClick}>
            {props.title}
        </li>
    );
};

export default HiddenMenuItem;
