import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface ModalProps {
    show: boolean | any;
    onClick?: any;
    children: any;
}

const Modal = (props: ModalProps) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} onClick={props.onClick} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default React.memo(Modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});
