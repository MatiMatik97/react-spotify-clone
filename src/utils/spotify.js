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
    "user-modify-playback-state"
];

const other = "response_type=token&show_dialog=true";

export const loginUrl = `${authEndpoint}?${other}&client_id=${clientId}&redirect_uri=${development ? redirectUrlLocal : redirectUrlWeb}&scope=${encodeURIComponent(scopes)}`;

export const getAccessTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));

    const accessTokenFromUrl = urlParams.get("access_token");
    const expiresIn = urlParams.get("expires_in");

    window.location.hash = "";

    return { accessTokenFromUrl, expiresIn };
}

export const setAccessTokenCookies = (accessToken, expiresIn) => {
    const date = new Date();
    date.setTime(date.getTime() + expiresIn * 1000);

    document.cookie = `spotify_access_token=${accessToken}; expires=${date.toUTCString()}; path=/`;
}

export const getAccessTokenFromCookies = () => {
    if (document.cookie.length === 0) return null;

    const urlParams = new URLSearchParams(`?${document.cookie.replace(/(; )/g, "&")}`);

    return urlParams.get("spotify_access_token");
}
