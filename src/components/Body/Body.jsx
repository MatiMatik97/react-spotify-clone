import React from "react";
import "./Body.css";
import Header from "../Header/Header";
import { useStateProviderValue } from "../../state/provider";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../SongRow/SongRow";

const Body = ({ spotify }) => {
  const [{ currentPlaylist }] = useStateProviderValue();

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img
          src={currentPlaylist?.images[0].url}
          alt=""
          className="body__infoImage"
        />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>{currentPlaylist?.name}</h2>
          <p>{currentPlaylist?.description}</p>
          {currentPlaylist && (
            <p>{`${currentPlaylist?.followers?.total} followers - ${currentPlaylist?.tracks?.total} tracks`}</p>
          )}
        </div>
      </div>

      <div className="body__songs" id="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon className="body__shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {currentPlaylist?.tracks.items.map((item) => (
          <SongRow
            key={item.track.id + Math.floor(Math.random() * 2000)}
            track={item.track}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
