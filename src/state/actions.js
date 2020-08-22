// types
export const SET_USER = 'SET_USER';

export const SET_TOKEN = 'SET_TOKEN';

export const SET_PLAYLISTS = 'SET_PLAYLISTS';

export const SET_CURRENT_PLAYLIST = 'SET_CURRENT_PLAYLIST';

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

// actions
export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
}

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    };
}

export const setPlaylists = (playlists) => {
    return {
        type: SET_PLAYLISTS,
        payload: playlists
    };
}

export const setCurrentPlaylist = (currentPlaylist) => {
    return {
        type: SET_CURRENT_PLAYLIST,
        payload: currentPlaylist
    };
}

export const setCurrentSong = (currentSong) => {
    return {
        type: SET_CURRENT_SONG,
        payload: currentSong
    };
}