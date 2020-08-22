import React from "react";
import "./SongRow.css";
import { useStateProviderValue } from "../../state/provider";
import { setCurrentSong } from "../../state/actions";

const SongRow = ({ track }) => {
  const [, dispatch] = useStateProviderValue();

  const onClickSong = (track) => {
    const song = {
      img: track.album.images[0].url,
      name: track.name,
      artist: track.artists[0].name,
    };

    dispatch(setCurrentSong(song));
  };

  return (
    <div className="songRow" onClick={() => onClickSong(track)}>
      <img src={track.album.images[0].url} alt="" className="songRow__album" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {`${track.artists.map((artist) => artist.name).join(", ")}, ${
            track.album.name
          }`}
        </p>
      </div>
    </div>
  );
};

export default SongRow;
