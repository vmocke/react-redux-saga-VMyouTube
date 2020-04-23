import { put } from 'redux-saga/effects';
import * as actionsAuth from '../actions/actionsAuth';

export function* onGoogleLoginSaga(response: {
    response: {
        error?: any;
        tokenId: string;
        googleId: string;
        profileObj: { email: string; name: string; givenName: string; familyName: string; imageUrl: string };
    };
}) {
    const res = response.response;
    if (typeof res.error === typeof '') {
        yield put(actionsAuth.onGoogleLoginFail(res.error));
    } else {
        const userInfo = {
            token: res.tokenId,
            userId: res.googleId,
            email: res.profileObj.email,
            fullName: res.profileObj.name,
            firstName: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            img: res.profileObj.imageUrl,
        };
        yield localStorage.setItem('res', JSON.stringify(res));
        yield localStorage.setItem('userInfo', JSON.stringify(userInfo));
        yield localStorage.setItem('token', userInfo.token);
        yield localStorage.setItem('userId', userInfo.userId);
        yield put(actionsAuth.onGoogleLoginOk(userInfo));
    }
}

export function* onLogoutSaga() {
    yield localStorage.removeItem('res');
    yield localStorage.removeItem('userInfo');
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield put(actionsAuth.onLogoutOk());
}

export function* onTryAutoSignupSaga() {
    const token_ = yield localStorage.getItem('token');
    if (!token_) {
        yield put(actionsAuth.onLogout());
    } else if (token_ === 'Anonymous123') {
        yield put(actionsAuth.onAnonymousLogin());
    } else {
        const userInfo_ = yield localStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfo_);
        yield put(actionsAuth.onGoogleLoginOk(userInfo));
    }
}
