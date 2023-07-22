import React, { useEffect, useState } from "react";
import "./mul.css";
import { Router, Route, Switch, Link } from "react-router-dom";
import First from "./first";
const Home = (props) => {
  const [showMultiplayerOptions, setShowMultiplayerOptions] = useState(false);
  const [soloMode, setSoloMode] = useState(false);

  const handleSoloButtonClick = () => {
    setSoloMode(true);
    setShowMultiplayerOptions(false);
  };

  const handleMultiplayerButtonClick = () => {
    setShowMultiplayerOptions(!showMultiplayerOptions);
    setSoloMode(false); 
  };
  return (
    <div className="home-div">
      <h1 style={{ color: "white", fontSize: "50px" }}>Speed Master</h1>
      {!soloMode && !showMultiplayerOptions && (
        <Link to="/practice">
          <button onClick={handleSoloButtonClick}>Solo Mode</button>
        </Link>
      )}
      
      {!showMultiplayerOptions && (
        <Link to="/first">
          {" "}
          {/* Use Link to navigate to /multi */}{" "}
          <button onClick={handleMultiplayerButtonClick}>
            Multiplayer Mode
          </button>{" "}
        </Link>
      )}

      {showMultiplayerOptions && (
        <div className="home-div">
          <Link to="/game/create">
            <button>Create Room</button>
          </Link>
          <Link to="/game/join">
            <button>Join Room</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
