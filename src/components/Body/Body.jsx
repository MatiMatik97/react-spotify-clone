import React from "react";
import "./Body.css";
import Header from "../Header/Header";

const Body = ({ spotify }) => {
  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img src="" alt="" />
        <div className="body__infoText">
          
        </div>
      </div>
    </div>
  );
};

export default Body;
