import React from "react";
import "./Player.css";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";

const Player = ({ spotify, logout }) => {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar spotify={spotify} logout={logout} />
        <Body spotify={spotify} />
      </div>
      <Footer />
    </div>
  );
};

export default Player;
