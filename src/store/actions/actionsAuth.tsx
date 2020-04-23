import * as actionTypes from './actionTypes';
// ON TRY AUTO SIGNUP
export const onTryAutoSignup = () => {
    return {
        type: actionTypes.ON_TRY_AUTO_SIGNUP_SAGA,
    };
};
// ANONYMOUS LOGIN
export const onAnonymousLogin = () => {
    localStorage.setItem('token', 'Anonymous123');
    localStorage.setItem('userId', 'anonymous');
    return {
        type: actionTypes.ANONYMOUS_LOGIN,
    };
};
// GOOGLE LOGIN
export const onGoogleLogin = (response: {}) => {
    return {
        type: actionTypes.GOOGLE_LOGIN_SAGA,
        response: response,
    };
};
export const onGoogleLoginOk = (userInfo: {}) => {
    return {
        type: actionTypes.GOOGLE_LOGIN_OK,
        userInfo: userInfo,
    };
};
export const onGoogleLoginFail = (error: any) => {
    return {
        type: actionTypes.GOOGLE_LOGIN_FAIL,
        error: error,
    };
};
// LOGOUT
export const onLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_SAGA,
    };
};
export const onLogoutOk = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_OK,
    };
};
export const onLogoutClear = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_CLEAR,
    };
};
