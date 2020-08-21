import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import {
  getAccessTokenFromUrl,
  setAccessTokenCookies,
  getAccessTokenFromCookies,
} from "./utils/spotify";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const { accessTokenFromUrl, expiresIn } = getAccessTokenFromUrl();
    window.location.hash = "";

    // login with "LOGIN WITH SPOTIFY" button
    if (accessTokenFromUrl) {
      setToken(accessTokenFromUrl);
      setAccessTokenCookies(accessTokenFromUrl, expiresIn);
    }

    const accessTokenFromCookies = getAccessTokenFromCookies();
    if (accessTokenFromCookies) {
      setToken(accessTokenFromCookies);
    }

    // login with access token if not expired
  }, []);

  return <div className="app">{token ? <h1>Logged In</h1> : <Login />}</div>;
};

export default App;
