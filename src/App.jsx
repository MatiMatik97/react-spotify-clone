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
import { setUser, setToken, setPlaylists } from "./state/actions";

const spotify = new SpotifyWebApi();

const App = () => {
  const [{ token }, dispatch] = useStateProviderValue();

  useEffect(() => {
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
      spotify
        .getMe()
        .then((user) => {
          dispatch(setUser(user));
        })
        .catch((error) => {
          dispatch(setToken(null));
          dispatch(setUser(null));
          console.error(error);
        });
    }

    // get user's playlists
    spotify
      .getUserPlaylists()
      .then((playlists) => {
        dispatch(setPlaylists(playlists));
      })
      .catch((error) => {
        console.error(error);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
};

export default App;
