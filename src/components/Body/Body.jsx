import React, { useEffect, useState, useRef } from "react";
import "./Body.css";
import Header from "../Header/Header";
import { useStateProviderValue } from "../../state/provider";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../SongRow/SongRow";

const Body = ({ spotify }) => {
  const [playlistInfo, _setPlaylistInfo] = useState({
    id: 0,
    offset: 0,
    limit: 100,
    total: 0,
  });
  const playlistInfoRef = useRef(playlistInfo);
  const setPlaylistInfo = (data) => {
    playlistInfoRef.current = data;
    _setPlaylistInfo(data);
  };

  const [playlistTracks, _setPlaylistTracks] = useState([]);
  const playlistTracksRef = useRef(playlistTracks);
  const setPlaylistTracks = (data) => {
    playlistTracksRef.current = data;
    _setPlaylistTracks(data);
  };

  const [{ currentPlaylist }] = useStateProviderValue();

  const getTracks = async (scroll) => {
    const { id, offset, limit } = playlistInfoRef.current;

    if (scroll) {
      setPlaylistInfo({
        ...playlistInfoRef.current,
        offset: offset + limit,
      });
    }

    if (playlistInfoRef.current.offset >= playlistInfoRef.current.total) {
      return;
    }

    const playlistTracks = await spotify.getPlaylistTracks(id, {
      offset: playlistInfoRef.current.offset,
      limit,
    });

    let tracks = playlistTracks.items;

    if (scroll) {
      tracks = playlistTracksRef.current.concat(tracks);
    }

    setPlaylistTracks(tracks);
  };

  const scrollFunction = (e) => {
    const bodyElement = document.getElementById("body");

    if (
      bodyElement.scrollTop + window.innerHeight >=
      bodyElement.scrollHeight + 100
    ) {
      getTracks(true);
    }
  };

  useEffect(() => {
    const bodyElement = document.getElementById("body");

    bodyElement.addEventListener("scroll", scrollFunction);

    return () => bodyElement.removeEventListener("scroll", scrollFunction);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentPlaylist) {
      const { offset, limit, total } = currentPlaylist.tracks;
      setPlaylistInfo({ id: currentPlaylist.id, offset, limit, total });
      getTracks(false);
    }
    // eslint-disable-next-line
  }, [currentPlaylist]);

  return (
    <div className="body" id="body">
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

        {playlistTracksRef.current.length > 0 &&
          playlistTracksRef.current.map((item) => (
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
