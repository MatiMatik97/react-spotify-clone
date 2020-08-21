import { SET_USER, SET_TOKEN, SET_PLAYLISTS, SET_DISCOVER_WEEKLY } from './actions'

export const initialState = {
    token: null,
    user: null,
    playlists: [],
    playing: false,
    item: null,
    discover_weekly: null
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
        case SET_DISCOVER_WEEKLY:
            return {
                ...state,
                discover_weekly: action.payload
            }
        default:
            return state;
    }
}

export default reducer;