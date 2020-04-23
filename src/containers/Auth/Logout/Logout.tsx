import React, { useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionsAuth from '../../../store/actions/actionsAuth';
import * as actionsVideos from '../../../store/actions/actionsVideos';

const Logout = () => {
    const dispatch = useDispatch();
    const on_Logout = useCallback(() => dispatch(actionsAuth.onLogout()), [dispatch]);
    const on_Logout_Clear = useCallback(() => dispatch(actionsAuth.onLogoutClear()), [dispatch]);
    const on_Logout_Clear_Videos = useCallback(() => dispatch(actionsVideos.logoutClearVideos()), [dispatch]);

    useEffect(() => {
        return () => {
            on_Logout();
            on_Logout_Clear();
            on_Logout_Clear_Videos();
        };
    }, [on_Logout, on_Logout_Clear]);

    return <Redirect to="/login" />;
};

export default Logout;
