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

    window.location.hash = "";

    return { accessTokenFromUrl, expiresIn };
}

export const setAccessTokenCookies = (accessToken, expiresIn) => {
    const date = new Date();
    date.setTime(date.getTime() + expiresIn * 1000);

    document.cookie = `spotify_access_token=${accessToken}; expires=${date.toUTCString()}; path=/`;
}

export const getAccessTokenFromCookies = async () => {
    if (document.cookie.length === 0) return null;

    const urlParams = new URLSearchParams(`?${document.cookie.replace(/(; )/g, "&")}`);

    const accessTokenFromCookies = urlParams.get("spotify_access_token");

    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessTokenFromCookies}`
            },
            referrerPolicy: 'no-referrer',
        });

        if (response.ok) {
            // console.log("ok");
            return accessTokenFromCookies;
        } else {
            throw new Error("Wrong access token...");
        }
    } catch (error) {
        // console.log("not ok");
        return null;
    }
}

export const loginUrl = `${authEndpoint}?response_type=token&show_dialog=true&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${encodeURIComponent(scopes)}`;