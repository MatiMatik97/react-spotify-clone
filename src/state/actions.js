// types
export const SET_USER = 'SET_USER';

export const SET_TOKEN = 'SET_TOKEN';

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