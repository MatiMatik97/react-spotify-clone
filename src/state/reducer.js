import { SET_USER, SET_TOKEN, SET_PLAYLISTS, SET_CURRENT_PLAYLIST, SET_CURRENT_SONG } from './actions'

export const initialState = {
    token: null,
    user: null,
    playlists: [],
    currentSong: {
        img: "https://i.imgflip.com/2flvc1.jpg",
        name: "Hotline Bling",
        artist: "Drake"
    },
    currentPlaylist: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload
            }
        case SET_CURRENT_PLAYLIST:
            return {
                ...state,
                currentPlaylist: action.payload
            }
        case SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.payload
            }
        default:
            return state;
    }
}

export default reducer;