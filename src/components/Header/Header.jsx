import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useStateProviderValue } from "../../state/provider";

const Header = () => {
  const [{ user }] = useStateProviderValue();

  return (
    <div className="header" id="header">
      <div className="header__left">
        <SearchIcon />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="header__right">
        <Avatar src={user?.images[0].url} alt="header-avatar" />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
