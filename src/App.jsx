import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import {
  getAccessTokenFromUrl,
  setAccessTokenCookies,
  getAccessTokenFromCookies,
} from "./utils/spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = SpotifyWebApi();

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      // login with "LOGIN WITH SPOTIFY" button
      const { accessTokenFromUrl, expiresIn } = getAccessTokenFromUrl();
      if (accessTokenFromUrl) {
        setToken(accessTokenFromUrl);
        setAccessTokenCookies(accessTokenFromUrl, expiresIn);
      }

      // login with access token if not expired
      const accessTokenFromCookies = await getAccessTokenFromCookies();
      if (accessTokenFromCookies) {
        setToken(accessTokenFromCookies);
      }
    })();
  }, []);

  return <div className="app">{token ? <h1>Logged In</h1> : <Login />}</div>;
};

export default App;
