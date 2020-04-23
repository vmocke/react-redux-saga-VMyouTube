import * as actionTypes from '../actions/actionTypes';

export interface stateTS {
    error: null | any;
    spinner: boolean;
    authRedirectPath: string;
    userInfo: {
        token: null | string;
        userId: null | string;
        email: null | string;
        fullName: null | string;
        firstName: null | string;
        lastName: null | string;
        img: string;
    };
}

const initialState: stateTS = {
    error: null,
    spinner: false,
    authRedirectPath: '/search',
    userInfo: {
        token: null,
        userId: null,
        email: null,
        fullName: null,
        firstName: null,
        lastName: null,
        img: '',
    },
};
// ANONYMOUS LOGIN
const onAnonymousLogin_ = (state: stateTS) => {
    return {
        ...state,
        error: null,
        spinner: false,
        authRedirectPath: '/search',
        userInfo: {
            token: 'anonymous123',
            userId: 'anonymous',
            email: null,
            fullName: 'Anonymus',
            firstName: null,
            lastName: null,
            img: '',
        },
    };
};
// GOOGLE LOGIN
const onGoogleLoginSaga_ = (state: stateTS) => {
    return {
        ...state,
        error: null,
        spinner: true,
    };
};
const onGoogleLoginOk_ = (state: stateTS, action: { userInfo: any }) => {
    return {
        ...state,
        error: null,
        spinner: false,
        userInfo: action.userInfo,
    };
};
const onGoogleLoginFail_ = (state: stateTS, action: { error: any }) => {
    return {
        ...state,
        error: action.error,
        spinner: false,
    };
};
// ON AUTH LOGOUT
const onLogoutSaga_ = (state: stateTS) => {
    return {
        ...state,
        error: null,
        spinner: true,
    };
};
const onLogoutOk_ = (state: stateTS) => {
    return {
        ...state,
        error: null,
        spinner: false,
    };
};
// ON LOGOUT CLEAR
const onLogoutClear_ = (state: stateTS) => {
    return {
        ...state,
        error: null,
        spinner: false,
        authRedirectPath: '/search',
        userInfo: {
            token: null,
            userId: null,
            email: null,
            fullName: 'Anonymus',
            firstName: null,
            lastName: null,
            img: '',
        },
    };
};
// REDUCER
const reducer = (state = initialState, action: any): stateTS => {
    switch (action.type) {
        // ANONYMOUS LOGIN
        case actionTypes.ANONYMOUS_LOGIN:
            return onAnonymousLogin_(state);
        // GOOGLE LOGIN
        case actionTypes.GOOGLE_LOGIN_SAGA:
            return onGoogleLoginSaga_(state);
        case actionTypes.GOOGLE_LOGIN_OK:
            return onGoogleLoginOk_(state, action);
        case actionTypes.GOOGLE_LOGIN_SAGA:
            return onGoogleLoginFail_(state, action);
        // ON AUTH LOGOUT
        case actionTypes.AUTH_LOGOUT_SAGA:
            return onLogoutSaga_(state);
        case actionTypes.AUTH_LOGOUT_OK:
            return onLogoutOk_(state);
        // ON LOGOUT CLEAR
        case actionTypes.AUTH_LOGOUT_CLEAR:
            return onLogoutClear_(state);
        default:
            return state;
    }
};

export default reducer;
