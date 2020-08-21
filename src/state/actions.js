// types
export const SET_USER = 'SET_USER';

export const SET_TOKEN = 'SET_TOKEN';

export const SET_PLAYLISTS = 'SET_PLAYLISTS';

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