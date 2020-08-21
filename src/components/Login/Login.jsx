import React from "react";
import "./Login.css";
import { loginUrl } from "../../utils/spotify";

const Login = () => {
  return (
    <div className="login">
      <img
        src="https://beinggarifuna.com/wp-content/uploads/2018/05/Spotify-symbol.jpg"
        alt="spotify-logo"
        className="login__spotifyLogo"
      />
      <a href={loginUrl} className="login__link">
        LOGIN WITH SPOTIFY
      </a>
    </div>
  );
};

export default Login;
