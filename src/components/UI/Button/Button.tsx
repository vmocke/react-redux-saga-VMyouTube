import React from 'react';

interface ButtonProps {
    id?: string;
    value?: string;
    title: string;
    onClick: any;
    className?: any;
}

const Button = (props: ButtonProps) => {
    return (
        <button id={props.id} value={props.value} onClick={props.onClick} className={props.className}>
            {props.title}
        </button>
    );
};

export default Button;
