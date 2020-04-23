import React from 'react';
import classes from './Menu.module.css';
import MenuItem from './MenuItem/MenuItem';
import { GoogleLogout } from 'react-google-login';
import { useSelector } from 'react-redux';
import { AppState } from '../../..';

const Menu = () => {
    const fullName = useSelector((state: AppState) => state.reducer_Auth.userInfo.fullName);

    return (
        <ul className={classes.Menu}>
            <MenuItem to="/menu">Menu</MenuItem>
            {fullName === 'Anonymus' && <MenuItem to="/logout">Logout</MenuItem>}
            {fullName !== 'Anonymus' && (
                <MenuItem to="/logout">
                    <GoogleLogout
                        clientId="260628898530-cl81dpljuaj4gd6q0aeopg4csngp0lq9.apps.googleusercontent.com"
                        buttonText="Logout"
                        render={(renderProps) => <div onClick={renderProps.onClick}>Logout</div>}
                    />
                </MenuItem>
            )}
        </ul>
    );
};

export default Menu;
