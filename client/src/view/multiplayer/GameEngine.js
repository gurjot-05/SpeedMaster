import React from "react";
import { Redirect } from "react-router-dom";
import "./mul.css";
import Counter from "./Counter";
import StartButton from "./StartButton";
import DisplayWords from "./DisplayWords.js";
import InputForm from "./Form";
import PlayerInfo from "./PlayerInfo";
import GameReview from "./GameReview";
import GameCode from "./GameCode";
import ProgressBar from "react-bootstrap/ProgressBar"; // Import ProgressBar

import socket from "../../../socketConfig";

const GameEngine = ({ gameState }) => {
  const { _id, players, words, isOpen, isOver, quoteLength } = gameState;
  const player = players.find((player) => player.socketID === socket.id);
  if (_id === "") {
    return <Redirect to="/" />;
  }
  const prompt = processWords(words);

  let currentPlayer = players.find((player) => player.socketID === socket.id);

  // Calculate progress percentage
  const progressPercentage = Math.floor(
    (100 * currentPlayer.correctChars) / quoteLength
  );

  return (
    <>
      {!isOver ? (
        <div className="game-container">
          <PlayerInfo
            nickName={currentPlayer.nickName}
            WPM={currentPlayer.WPM}
            progress={progressPercentage}
          />

          {players.map((player) =>
            player.socketID !== socket.id ? (
              <PlayerInfo
                nickName={player.nickName}
                WPM={player.WPM}
                progress={Math.floor((100 * player.correctChars) / quoteLength)}
              />
            ) : null
          )}

          <div className="prompt-container">
            <DisplayWords prompt={prompt} player={player} gameID={_id} />
          </div>

          <div className="user-input">
            <br />
            <InputForm isOpen={isOpen} isOver={isOver} gameID={_id} />
            <br />
            <StartButton player={player} gameID={_id} />
          </div>

          <Counter isOver={isOver} />

          {isOpen ? (
            <div className="user-input">
              <GameCode gameID={_id} />
            </div>
          ) : null}
        </div>
      ) : null}

      {isOver && !isOpen ? <GameReview gameState={gameState} /> : null}
    </>
  );
};

const processWords = (words) => {
  let tempPrompt = [];
  for (let i = 0; i < words.length; i++) {
    tempPrompt.push({
      word: words[i],
      styling: "word",
      characters: function () {
        var elem = [];
        for (let j = 0; j < this.word.length; j++) {
          elem.push({
            character: this.word.charAt(j),
            styling: "character",
          });
        }
        elem.push({
          character: " ",
          styling: "character",
        });
        return elem;
      },
    });
  }
  for (let i = 0; i < tempPrompt.length; i++) {
    var temp = tempPrompt[i].characters();
    tempPrompt[i].characters = temp;
  }
  tempPrompt[tempPrompt.length - 1].characters.pop();

  return tempPrompt;
};

export default GameEngine;
