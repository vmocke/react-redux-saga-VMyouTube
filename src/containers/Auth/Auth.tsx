import React from 'react';
import classes from './Auth.module.css';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import * as actionsAuth from '../../store/actions/actionsAuth';
import * as actionsVideos from '../../store/actions/actionsVideos';

const Auth = (props: any) => {
    const dispatch = useDispatch();
    const on_Google_Login = (response: {}) => dispatch(actionsAuth.onGoogleLogin(response));
    const on_Anonymous_Handler = () => dispatch(actionsAuth.onAnonymousLogin());
    const on_After_Login = () => dispatch(actionsVideos.onPageReload());

    const responseGoogle = (response: {}) => {
        on_Google_Login(response);
        on_After_Login();
    };

    const onAnonymousHandler = (e: any) => {
        e.preventDefault();
        on_Anonymous_Handler();
        on_After_Login();
        props.history.push('/search');
    };
    return (
        <div className={classes.Auth}>
            <div className={classes.AuthLeft}>
                <h1>Welcome to my Page</h1>
                <p>Here you can browse videos from YouTube</p>
                <p>You can save them to playlist</p>
                <p>You can edit or delete them</p>
                <p>You can see history</p>
                <p>Login whit Google to START</p>
                <p>Or simply start viewing as an anonymous</p>
            </div>
            <div className={classes.AuthRight}>
                <div className={classes.LoginHeader}>
                    <h2>Login whit Google</h2>
                    <h2>or go as</h2>
                    <h2>anonymous</h2>
                </div>
                <div className={classes.Buttons}>
                    <GoogleLogin
                        clientId="260628898530-cl81dpljuaj4gd6q0aeopg4csngp0lq9.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                Login whit Google
                            </button>
                        )}
                        buttonText="Login whit Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <button onClick={(e) => onAnonymousHandler(e)}>Anonymous</button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
