import React from "react";
import "./SidebarOption.css";

const SidebarOption = ({ id, title, Icon, onClickPlaylist }) => {
  return (
    <div className={`sidebarOption ${!Icon && "onlyTitleOption"}`}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h4>{title}</h4>
      ) : (
        <p onClick={() => id && onClickPlaylist(id)}>{title}</p>
      )}
    </div>
  );
};

export default SidebarOption;
