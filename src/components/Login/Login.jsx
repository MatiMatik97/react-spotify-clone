import React from "react";
import "./Login.css";
import { loginUrl } from "../../utils/spotify";
import SpotifyLogo from "./spotify-logo.png";

const Login = () => {
  return (
    <div className="login">
      <img
        src={SpotifyLogo}
        alt="login-spotify-logo"
        className="login__spotifyLogo"
      />
      <a href={loginUrl} className="login__link">
        LOGIN WITH SPOTIFY
      </a>
    </div>
  );
};

export default Login;
