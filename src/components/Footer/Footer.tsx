import React from 'react';
import classes from './Footer.module.css';
import { withRouter } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={classes.Footer}>
            <p>Footer</p>
        </footer>
    );
};

export default withRouter(Footer);
