import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useStateProviderValue } from "../../state/provider";
import { setCurrentPlaylist } from "../../state/actions";
import SpotifyLogo from "./spotify-logo.png";

const Sidebar = ({ spotify, logout }) => {
  const [{ playlists }, dispatch] = useStateProviderValue();

  const onClickPlaylist = async (playlistId) => {
    if (playlists) {
      const playlist = await spotify.getPlaylist(playlistId);
      dispatch(setCurrentPlaylist(playlist));
      document.getElementById("header").scrollIntoView();
    }
  };

  return (
    <div className="sidebar">
      <img
        src={SpotifyLogo}
        alt="sidebar-spotify-logo"
        className="sidebar__spotifyLogo"
        onClick={logout}
      />

      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />

      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />

      {playlists?.items?.map((playlist) => (
        <SidebarOption
          key={playlist.id}
          id={playlist.id}
          title={playlist.name}
          onClickPlaylist={onClickPlaylist}
        />
      ))}
    </div>
  );
};

export default Sidebar;
