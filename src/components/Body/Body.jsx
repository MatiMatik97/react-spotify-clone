import React from "react";
import "./Body.css";
import Header from "../Header/Header";
import { useStateProviderValue } from "../../state/provider";

const Body = ({ spotify }) => {
  const [{ discover_weekly }] = useStateProviderValue();

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img
          src={discover_weekly?.images[0].url}
          alt=""
          className="body__infoImage"
        />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Body;
