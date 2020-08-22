import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Player from "./components/Player/Player";
import {
  getAccessTokenFromUrl,
  setAccessTokenCookies,
  getAccessTokenFromCookies,
} from "./utils/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateProviderValue } from "./state/provider";
import {
  setUser,
  setToken,
  setPlaylists,
  setCurrentPlaylist,
} from "./state/actions";

const spotify = new SpotifyWebApi();

const App = () => {
  const [{ token }, dispatch] = useStateProviderValue();

  useEffect(() => {
    (async () => {
      let accessToken = null;

      // login with "LOGIN WITH SPOTIFY" button
      const { accessTokenFromUrl, expiresIn } = getAccessTokenFromUrl();
      if (accessTokenFromUrl) {
        dispatch(setToken(accessTokenFromUrl));
        setAccessTokenCookies(accessTokenFromUrl, expiresIn);

        accessToken = accessTokenFromUrl;
      }

      // login with access token if not expired
      if (!accessToken) {
        const accessTokenFromCookies = getAccessTokenFromCookies();

        if (accessTokenFromCookies) {
          dispatch(setToken(accessTokenFromCookies));
          accessToken = accessTokenFromCookies;
        }
      }

      if (accessToken) {
        spotify.setAccessToken(accessToken);

        // get user
        const user = await spotify.getMe();
        dispatch(setUser(user));

        // get user's playlists
        const userPlaylists = await spotify.getUserPlaylists();
        dispatch(setPlaylists(userPlaylists));

        // get weekly discover from first playlist
        if (userPlaylists.items.length > 0) {
          const playlistId = userPlaylists?.items[0].id;
          const currentPlaylist = await spotify.getPlaylist(playlistId);
          dispatch(setCurrentPlaylist(currentPlaylist));
        }
      }
    })();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
};

export default App;
