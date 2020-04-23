import * as actionTypes from './actionTypes';
//ON LOGOUT CLEAR
export const logoutClearVideos = () => {
    return {
        type: actionTypes.LOGOUT_CLEAR_VIDEOS,
    };
};
// ON PAGE RELOAD
export const onPageReload = () => {
    return {
        type: actionTypes.PAGE_REALOAD_GET_LOCAL_STORAGE_SAGA,
    };
};
export const onPageReloadOk = (menuItems: {}[]) => {
    return {
        type: actionTypes.PAGE_REALOAD_GET_LOCAL_STORAGE_OK,
        menuItems: menuItems,
    };
};
export const onPageReloadFail = (error: any) => {
    return {
        type: actionTypes.PAGE_REALOAD_GET_LOCAL_STORAGE_FAIL,
        error: error,
    };
};
// GET DATA
export const getData = (searchInput: { value: string }, menuItemsCopy: {}[]) => {
    return {
        type: actionTypes.GET_DATA_SAGA,
        searchInput: searchInput,
        menuItemsCopy: menuItemsCopy,
    };
};
export const getDataOk = (response: [], menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.GET_DATA_OK,
        data: response,
        menuItemsCopy: menuItemsCopy,
    };
};
export const getDataFail = (error: any) => {
    return {
        type: actionTypes.GET_DATA_FAIL,
        error: error,
    };
};
// ON VIDEO CARD CLICKED from ("/search")
export const onVideoCardClicked = (fiterItem: {}[], menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.ON_VIDEO_CARD_CLICKED,
        fiterItem: fiterItem,
        menuItemsCopy: menuItemsCopy,
    };
};
// ON VIDEO CARD CLICKED FROM ("/videoPlay")
export const onVideoCardClickedvideoPlay = (item: {}, menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.ON_VIDEO_CARD_CLICKED_VIDEO_PLAY,
        fiterItem: [item],
        menuItemsCopy: menuItemsCopy,
    };
};
// CREATE NEW PLAYLIST && REMOVE PLAYLIST
export const onCreateNewPlaylist = (menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.CREATE_NEW_PLAYLIST,
        menuItemsCopy: menuItemsCopy,
    };
};
export const onDeletePlaylist = (menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.REMOVE_PLAYLIST,
        menuItemsCopy: menuItemsCopy,
    };
};
// ON SEARCH HISTORY
export const onSearchHistory = (searchVal: { value: string }, menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.ON_SEARCH_FROM_HISTORY_SAGA,
        searchVal: searchVal,
        menuItemsCopy: menuItemsCopy,
    };
};
export const onSearchHistoryOk = (response: [], menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.ON_SEARCH_FROM_HISTORY_OK,
        data: response,
        menuItemsCopy: menuItemsCopy,
    };
};
export const onSearchHistoryFail = (error: any) => {
    return {
        type: actionTypes.ON_SEARCH_FROM_HISTORY_FAIL,
        error: error,
    };
};
// PLAY VIDEO FROM HISTORY
export const onPlayVideoFromHistory = (itemFromHistory: {}[]) => {
    return {
        type: actionTypes.PLAY_VIDEO_FROM_HISTORY,
        itemFromHistory: itemFromHistory,
    };
};
// ITEM MOVE TO PLAYLIST && REMOVE ITEM FROM PLAYLIST && DELETE ALL FROM PLAYLIST
export const onItemMoveToPlaylist = (menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.ITEM_MOVE_TO_PLAYLIST,
        menuItemsCopy: menuItemsCopy,
    };
};
export const onRemoveItemFromPlaylist = (menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.REMOVE_ITEM_FROM_PLAYLIST,
        menuItemsCopy: menuItemsCopy,
    };
};
export const onDeleteAll = (menuItemsCopy: {}[]) => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`${userId}`, JSON.stringify(menuItemsCopy));
    return {
        type: actionTypes.DELETE_ALL_FROM_PLAYLIST,
        menuItemsCopy: menuItemsCopy,
    };
};
