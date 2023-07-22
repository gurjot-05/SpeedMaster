import React from "react";
import { Table } from "react-bootstrap";
import "./mul.css";

const getScoreboard = (players) => {
  const scoreBoard = players.filter((players) => players.WPM !== -2);
  return scoreBoard.sort((a, b) => (a.WPM > b.WPM ? -1 : 1));
};

const GameReview = ({ gameState }) => {
  const scoreBoard = getScoreboard(gameState.players);
  return (
    <div className="review-status">
      <h2 style={{ color: "white" }}>Game Over</h2>
      <h5>Scoreboard</h5>

      <div className="game-review">
        <Table className="review-table" striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>WPM</th>
            </tr>
          </thead>
          <tbody>
            {scoreBoard.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.nickName}</td>
                <td>{player.WPM}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GameReview;
