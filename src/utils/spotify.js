const development = true;

const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUrlLocal = "http://localhost:3000/";

const redirectUrlWeb = "https://spotify-clone-app-2afe5.web.app/";

const clientId = "6832d4a6b29642e8963d0c1565207cb2";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-follow-read",
    "user-library-read"
];

const other = "response_type=token&show_dialog=true";

export const loginUrl = `${authEndpoint}?${other}&client_id=${clientId}&redirect_uri=${development ? redirectUrlLocal : redirectUrlWeb}&scope=${encodeURIComponent(scopes)}`;

export const getAccessTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));

    const accessTokenFromUrl = urlParams.get("access_token");

    window.location.hash = "";

    return accessTokenFromUrl;
}

const PREFIX = "spotify_access_token";

export const setAccessTokenLocalStorage = (accessToken) => {
    localStorage.setItem(PREFIX, accessToken);
}

export const removeAccessTokenFromLocalStorage = () => {
    localStorage.removeItem(PREFIX);
}

export const getAccessTokenFromLocalStorage = () => {
    if (localStorage.length === 0) return null;
    return localStorage.getItem(PREFIX);
}
