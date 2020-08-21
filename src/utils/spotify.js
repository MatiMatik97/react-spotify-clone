export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUrl = "http://localhost:3000/";

const clientId = "6832d4a6b29642e8963d0c1565207cb2";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
];

export const getAccessTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));

    const accessTokenFromUrl = urlParams.get("access_token");
    const expiresIn = urlParams.get("expires_in");

    return { accessTokenFromUrl, expiresIn };
}

export const setAccessTokenCookies = (accessToken, expiresIn) => {
    const date = new Date();
    date.setTime(date.getTime() + expiresIn * 1000);

    document.cookie = `spotify_access_token=${accessToken}; expires=${date.toUTCString()}; path=/`;
}

export const getAccessTokenFromCookies = () => {
    if (document.cookie.length > 0) {
        const urlParams = new URLSearchParams(`?${document.cookie.replace("; ", "&")}`);
        
        return urlParams.get("spotify_access_token");
    }

    return null;
}

export const loginUrl = `${authEndpoint}?response_type=token&show_dialog=true&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${encodeURIComponent(scopes)}`;