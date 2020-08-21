import { SET_USER, SET_TOKEN } from './actions'

export const initialState = {
    token: null,
    user: null,
    playlists: [],
    playing: false,
    item: null
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
        default:
            return state;
    }
}

export default reducer;