import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./mul.css";

const PlayerInfo = ({ nickName, WPM, progress }) => {
  const progressBarClass = `progress-bar-custom ${
    progress > 0 ? "animated" : ""
  }`;
  return (
    <>
      <div className="player-info">
        <div className="player-name">{nickName}</div>
        <div className="progress-contain">
          <ProgressBar
            now={progress}
            label={`${progress}%`}
            className={progressBarClass}
          />
        </div>
        <div className="player-wpm">WPM: {WPM === -1 ? 0 : WPM}</div>
      </div>
    </>
  );
};

export default PlayerInfo;
