import * as actionTypes from '../actions/actionTypes';

export interface stateTS {
    data: [] | null;
    menuItems: [
        { itemTitle: string; content: string[] },
        { itemTitle: string; content: any[] },
        { itemTitle: string; content: any[] },
    ];
    chosenVideo: [];
    playVideoFromHistory: string[];
    error: null | any;
    spinner: boolean;
    searchSpinner: boolean;
    redirectSpinner: boolean;
}

const initialState: stateTS = {
    data: null,
    menuItems: [
        { itemTitle: 'Search history', content: [] },
        { itemTitle: 'Videos history', content: [] },
        { itemTitle: 'Favorite videos', content: [] },
    ],
    chosenVideo: [],
    playVideoFromHistory: [],
    error: null,
    spinner: false,
    searchSpinner: false,
    redirectSpinner: false,
};
// PAGE REALOAD GET LOCAL STORAGE
const onPageReloadSaga_ = (state: stateTS) => {
    return {
        ...state,
        error: null,
        searchSpinner: true,
    };
};
const onPageReloadOk_ = (state: stateTS, action: { menuItems: any }) => {
    return {
        ...state,
        eror: null,
        searchSpinner: false,
        menuItems: action.menuItems,
    };
};
const onPageReloadFail_ = (state: stateTS, action: { error: any }) => {
    return {
        ...state,
        error: action.error,
        searchSpinner: false,
    };
};
// GET DATA
const getDataSaga_ = (state: stateTS) => {
    return {
        ...state,
        error: null,
        searchSpinner: true,
    };
};
const getDataOk_ = (state: stateTS, action: { data: []; menuItemsCopy: any }) => {
    return {
        ...state,
        data: action.data,
        menuItems: action.menuItemsCopy,
        error: null,
        searchSpinner: false,
    };
};
const getDataFail_ = (state: stateTS, action: { error: any }) => {
    return {
        ...state,
        error: action.error,
        searchSpinner: false,
    };
};
// ON VIDEO CARD CLICKED from ("/search")
const onVideoCardClicked_ = (state: stateTS, action: { fiterItem: []; menuItemsCopy: any }) => {
    return {
        ...state,
        chosenVideo: action.fiterItem,
        menuItems: action.menuItemsCopy,
    };
};
// ON VIDEO CARD CLICKED FROM ("/videoPlay")
const onVideoCardClickedvideoPlay_ = (state: stateTS, action: { fiterItem: []; menuItemsCopy: any }) => {
    return {
        ...state,
        chosenVideo: action.fiterItem,
        menuItems: action.menuItemsCopy,
    };
};
// CREAETE NEW MENU ITEM && REMOVE PLAYLIST
const onCreateNewPlaylist_ = (state: stateTS, action: { menuItemsCopy: any }) => {
    return {
        ...state,
        menuItems: action.menuItemsCopy,
    };
};
const onDeleteMenuItem_ = (state: stateTS, action: { menuItemsCopy: any }) => {
    return {
        ...state,
        menuItems: action.menuItemsCopy,
    };
};
// ON SEARCH FROM HISTORY
const onSearchHistorySaga_ = (state: stateTS) => {
    return {
        ...state,
        error: null,
        searchSpinner: true,
    };
};
const onSearchHistoryOk_ = (state: stateTS, action: { data: []; menuItemsCopy: any }) => {
    return {
        ...state,
        data: action.data,
        menuItems: action.menuItemsCopy,
        error: null,
        searchSpinner: false,
    };
};
const onSearchHistoryFail_ = (state: stateTS, action: { error: any }) => {
    return {
        ...state,
        searchSpinner: false,
        error: action.error,
    };
};
// PLAY VIDEO FROM HISTORY
const onPlayVideoFromHistory_ = (state: stateTS, action: { itemFromHistory: any }) => {
    return {
        ...state,
        chosenVideo: action.itemFromHistory,
    };
};
// ITEM MOVE TO PLAYLIST && REMOVE ITEM FROM PLAYLIST && DELETE ALL FROM PLAYLIST
const onItemMoveToPlaylist_ = (state: stateTS, action: { menuItemsCopy: any }) => {
    return {
        ...state,
        menuItems: action.menuItemsCopy,
    };
};
const onRemoveItemFromPlaylist_ = (state: stateTS, action: { menuItemsCopy: any }) => {
    return {
        ...state,
        menuItems: action.menuItemsCopy,
    };
};
const onDeleteAll_ = (state: stateTS, action: { menuItemsCopy: any }) => {
    return {
        ...state,
        menuItems: action.menuItemsCopy,
    };
};
// ON LOGOUT CLEAR VIDEOS
const logoutClearVideos_ = (state: stateTS) => {
    return {
        ...state,
        data: null,
        menuItems: [
            { itemTitle: 'Search history', content: [] },
            { itemTitle: 'Videos history', content: [] },
            { itemTitle: 'Favorite videos', content: [] },
        ],
        chosenVideo: [],
        playVideoFromHistory: [],
        error: null,
        spinner: false,
        searchSpinner: false,
        redirectSpinner: false,
    };
};
// REDUCER
const reducer = (state = initialState, action: any): stateTS => {
    switch (action.type) {
        // PAGE REALOAD GET LOCAL STORAGE
        case actionTypes.PAGE_REALOAD_GET_LOCAL_STORAGE_SAGA:
            return onPageReloadSaga_(state);
        case actionTypes.PAGE_REALOAD_GET_LOCAL_STORAGE_OK:
            return onPageReloadOk_(state, action);
        case actionTypes.PAGE_REALOAD_GET_LOCAL_STORAGE_FAIL:
            return onPageReloadFail_(state, action);
        // GET DATA
        case actionTypes.GET_DATA_SAGA:
            return getDataSaga_(state);
        case actionTypes.GET_DATA_OK:
            return getDataOk_(state, action);
        case actionTypes.GET_DATA_FAIL:
            return getDataFail_(state, action);
        // ON VIDEO CARD CLICKED from ("/search")
        case actionTypes.ON_VIDEO_CARD_CLICKED:
            return onVideoCardClicked_(state, action);
        // ON VIDEO CARD CLICKED FROM ("/videoPlay")
        case actionTypes.ON_VIDEO_CARD_CLICKED_VIDEO_PLAY:
            return onVideoCardClickedvideoPlay_(state, action);
        // CREAETE NEW MENU ITEM && REMOVE PLAYLIST
        case actionTypes.CREATE_NEW_PLAYLIST:
            return onCreateNewPlaylist_(state, action);
        case actionTypes.REMOVE_PLAYLIST:
            return onDeleteMenuItem_(state, action);
        // ON SEARCH FROM HISTORY
        case actionTypes.ON_SEARCH_FROM_HISTORY_SAGA:
            return onSearchHistorySaga_(state);
        case actionTypes.ON_SEARCH_FROM_HISTORY_OK:
            return onSearchHistoryOk_(state, action);
        case actionTypes.ON_SEARCH_FROM_HISTORY_FAIL:
            return onSearchHistoryFail_(state, action);
        // PLAY VIDEO FROM HISTORY
        case actionTypes.PLAY_VIDEO_FROM_HISTORY:
            return onPlayVideoFromHistory_(state, action);
        // ITEM MOVE TO PLAYLIST && REMOVE ITEM FROM PLAYLIST && DELETE ALL FROM PLAYLIST
        case actionTypes.ITEM_MOVE_TO_PLAYLIST:
            return onItemMoveToPlaylist_(state, action);
        case actionTypes.REMOVE_ITEM_FROM_PLAYLIST:
            return onRemoveItemFromPlaylist_(state, action);
        case actionTypes.DELETE_ALL_FROM_PLAYLIST:
            return onDeleteAll_(state, action);
        // ON LOGOUT CLEAR VIDEOS
        case actionTypes.LOGOUT_CLEAR_VIDEOS:
            // @ts-ignore
            return logoutClearVideos_(state);
        default:
            return state;
    }
};

export default reducer;
