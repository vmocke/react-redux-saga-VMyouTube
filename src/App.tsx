import React, { Suspense, useEffect, useCallback } from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import classes from './App.module.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import { youtubeTest } from './axios-export';
import * as actionsVideos from './store/actions/actionsVideos';
import * as actionsAuth from './store/actions/actionsAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '.';
import Logout from './containers/Auth/Logout/Logout';

const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const VideosShowPage = React.lazy(() => import('./containers/VideosShowPage/VideosShowPage'));
const VideoPlayPage = React.lazy(() => import('./containers/VideoPlayPage/VideoPlayPage'));
const MenuPage = React.lazy(() => import('./containers/MenuPage/MenuPage'));

const App = () => {
    const token_ = useSelector((state: AppState) => state.reducer_Auth.userInfo.token);

    const dispatch = useDispatch();
    const on_Page_Reload_Handler = useCallback(() => dispatch(actionsVideos.onPageReload()), [dispatch]);
    const on_Try_Auto_Signup = useCallback(() => dispatch(actionsAuth.onTryAutoSignup()), [dispatch]);

    useEffect(() => {
        on_Try_Auto_Signup();
        on_Page_Reload_Handler();
    }, [on_Page_Reload_Handler]);

    let routes = null;

    if (token_) {
        routes = (
            <React.Fragment>
                <Route path="/search" component={(props: any) => <VideosShowPage {...props} />} />
                <Route path="/videoPlay" component={(props: any) => <VideoPlayPage {...props} />} />
                <Route path="/menu" component={(props: any) => <MenuPage {...props} />} />
                <Route path="/login" component={(props: any) => <Auth {...props} />} />
                <Route path="/logout" component={(props: any) => <Logout {...props} />} />
                <Redirect to="/search" />
            </React.Fragment>
        );
    } else {
        routes = (
            <React.Fragment>
                <Route path="/login" component={(props: any) => <Auth {...props} />} />
                <Redirect to="/login" />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {token_ && <Header />}
            <main className={classes.App}>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </main>
            {token_ && <Footer />}
        </React.Fragment>
    );
};

export default withErrorHandler(withRouter(App), youtubeTest);
