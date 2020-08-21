import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useStateProviderValue } from "../../state/provider";

const Sidebar = () => {
  const [{ playlists }] = useStateProviderValue();

  return (
    <div className="sidebar">
      <img
        src="https://beinggarifuna.com/wp-content/uploads/2018/05/Spotify-symbol-300x91.jpg"
        alt="sidebar-spotify-logo"
        className="sidebar__spotifyLogo"
      />

      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />

      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />

      {playlists?.items?.map((playlist) => (
        <SidebarOption key={playlist.id} title={playlist.name} />
      ))}
    </div>
  );
};

export default Sidebar;
