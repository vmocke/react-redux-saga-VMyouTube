import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getDataSaga, onSearchHistorySaga, onPageReloadSaga } from './sagaVideos';
import { onGoogleLoginSaga, onLogoutSaga, onTryAutoSignupSaga } from './sagaAuth';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.GOOGLE_LOGIN_SAGA, onGoogleLoginSaga),
        takeEvery(actionTypes.AUTH_LOGOUT_SAGA, onLogoutSaga),
        takeEvery(actionTypes.ON_TRY_AUTO_SIGNUP_SAGA, onTryAutoSignupSaga),
    ]);
}

export function* watchVideos() {
    yield all([
        takeEvery(actionTypes.GET_DATA_SAGA, getDataSaga),
        takeEvery(actionTypes.ON_SEARCH_FROM_HISTORY_SAGA, onSearchHistorySaga),
        takeLatest(actionTypes.PAGE_REALOAD_GET_LOCAL_STORAGE_SAGA, onPageReloadSaga),
    ]);
}
