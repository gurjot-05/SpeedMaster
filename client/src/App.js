import React, { useEffect, useState } from 'react';
import history from './history';
import { Router, Route, Switch, Link } from 'react-router-dom';
import './App.css'; // CSS stylesheet

import First from './/view/pages/multiplayer/first';
import Home from "./view/pages/multiplayer/home";
import Practice from "./view/pages/practice";
import socket from './socketConfig';
import CreateGame from './view/pages/multiplayer/createGame';
import JoinGame from './view/pages/multiplayer/joinGame';
import GameEngine from './view/pages/multiplayer/GameEngine';

function App() {
  const [gameState, setGameState] = useState({ _id: "", isOpen: false, players: [], words: [] });
  const [showMultiplayerOptions, setShowMultiplayerOptions] = useState(false);
  const [soloMode, setSoloMode] = useState(false);

  const handleSoloButtonClick = () => {
    setSoloMode(true);
    setShowMultiplayerOptions(false);
  };

  useEffect(() => {
    socket.on('update-game', (game) => {
      setGameState(game);
    });
    return () => {
      socket.removeAllListeners();
    }
  }, []);

  useEffect(() => {
    if (gameState._id !== "") {
      history.push(`/game/${gameState._id}`);
    }
  }, [gameState._id]);

  const handleMultiplayerButtonClick = () => {
    setShowMultiplayerOptions(!showMultiplayerOptions);
    setSoloMode(false);
  };

  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/first" component={First} />
          <Route exact path="/" component={Home} />
          <Route path="/game/create" component={CreateGame} />
          <Route path="/game/join" component={JoinGame} />
          <Route path="/game/:gameID" render={props => <GameEngine {...props} gameState={gameState} />} />
          <Route path="/practice" component={Practice} />
        </Switch>
        <div className='home-button-container'>
          <Link to="/"><button className='home-button'>HOME</button></Link>
        </div>
      </Router>
    </>
  );
}

export default App;
