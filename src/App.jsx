import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Player from "./components/Player/Player";
import {
  getAccessTokenFromUrl,
  setAccessTokenLocalStorage,
  getAccessTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
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

  const logout = () => {
    removeAccessTokenFromLocalStorage("");
    dispatch(setToken(null));
  };

  useEffect(() => {
    (async () => {
      let accessToken = null;

      // login with "LOGIN WITH SPOTIFY" button
      const accessTokenFromUrl = getAccessTokenFromUrl();
      if (accessTokenFromUrl) {
        dispatch(setToken(accessTokenFromUrl));
        setAccessTokenLocalStorage(accessTokenFromUrl);

        accessToken = accessTokenFromUrl;
      }

      // login with access token from local storage
      if (!accessToken) {
        const accessTokenFromLocalStorage = getAccessTokenFromLocalStorage();

        if (accessTokenFromLocalStorage) {
          dispatch(setToken(accessTokenFromLocalStorage));
          accessToken = accessTokenFromLocalStorage;
        }
      }

      if (accessToken) {
        try {
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
        } catch (error) {
          // console.error(error);

          // log out
          logout();
        }
      }
    })();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="app">
      {token ? <Player spotify={spotify} logout={logout} /> : <Login />}
    </div>
  );
};

export default App;
