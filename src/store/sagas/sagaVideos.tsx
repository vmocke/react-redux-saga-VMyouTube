import { put } from 'redux-saga/effects';
import { youtubeTest, apiYTtest } from '../../axios-export';
import * as actionsVideos from '../actions/actionsVideos';

export function* onPageReloadSaga() {
    const userId = yield localStorage.getItem('userId');
    const getLocalStorage: any = yield localStorage.getItem(userId);
    if (getLocalStorage !== null) {
        const menuItems = yield JSON.parse(getLocalStorage);
        try {
            yield put(actionsVideos.onPageReloadOk(menuItems));
        } catch (error) {
            yield put(actionsVideos.onPageReloadFail(error));
        }
    } else {
        yield put(actionsVideos.onPageReloadFail('error in here'));
    }
}

export function* getDataSaga(action: { searchInput: { value: string }; menuItemsCopy: {}[] }) {
    if (action.searchInput.value !== '') {
        try {
            const response = yield youtubeTest.get('search', {
                params: {
                    part: 'snippet',
                    fields: 'items(id,snippet(title,description,thumbnails(medium)))',
                    maxResults: '50',
                    key: apiYTtest,
                    q: action.searchInput,
                },
            });
            const data = response.data.items.map((item: any) => {
                return {
                    id: item.id,
                    title: item.snippet.title,
                    desc: item.snippet.description,
                    img: item.snippet.thumbnails.medium,
                };
            });
            yield put(actionsVideos.getDataOk(data, action.menuItemsCopy));
        } catch (error) {
            yield put(actionsVideos.getDataFail(error));
        }
    } else {
        yield put(actionsVideos.getDataFail(alert('SEARCH FIELD IS EMPTY!!!')));
    }
}

export function* onSearchHistorySaga(action: { searchVal: { value: string }; menuItemsCopy: {}[] }) {
    if (action.searchVal.value !== '') {
        try {
            const response = yield youtubeTest.get('search', {
                params: {
                    part: 'snippet',
                    fields: 'items(id,snippet(title,description,thumbnails(medium)))',
                    maxResults: '5',
                    key: apiYTtest,
                    q: action.searchVal,
                },
            });
            const data = response.data.items.map((item: any) => {
                return {
                    id: item.id,
                    title: item.snippet.title,
                    desc: item.snippet.description,
                    img: item.snippet.thumbnails.medium,
                };
            });
            yield put(actionsVideos.onSearchHistoryOk(data, action.menuItemsCopy));
        } catch (error) {
            yield put(actionsVideos.onSearchHistoryFail(error));
        }
    } else {
        yield put(actionsVideos.onSearchHistoryFail(alert('SEARCH FIELD IS EMPTY!!!')));
    }
}
