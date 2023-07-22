import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Home = () => {
  const [showMultiplayerOptions, setShowMultiplayerOptions] = useState(false);
  const [soloMode, setSoloMode] = useState(false);

  const handleSoloButtonClick = () => {
    setSoloMode(true);
    setShowMultiplayerOptions(false);
  };

  const handleMultiplayerButtonClick = () => {
    setShowMultiplayerOptions(!showMultiplayerOptions);
    setSoloMode(false); // Reset soloMode when switching to multiplayer mode
  };

  return (
    <div className='home-div' style={{ display: "flex", flexDirection: "column" }}>
      {/* Solo Mode Button */}
      {!soloMode && (
        <Link to="/practice">
          <button onClick={handleSoloButtonClick}>Solo Mode</button>
        </Link>
      )}

      {/* Multiplayer Mode Button */}
      {!soloMode && (
        <button onClick={handleMultiplayerButtonClick}>Multiplayer Mode</button>
      )}

      {/* Multiplayer Mode Options */}
      {showMultiplayerOptions && (
        <div className='create'>
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
}

export default Home;
