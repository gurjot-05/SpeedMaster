import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./mul.css";
import socket from "../../../socketConfig";

const JoinGame = (props) => {
  const [userInput, setUserInput] = useState({ gameID: "", nickName: "" });
  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(nickName);
    console.log(userInput);
    socket.emit("join-game", userInput);
  };

  return (
    <>
      <div className="container">
        <h3>Join Game</h3>
        <div className="card-container">
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
                type="text"
                name="nickName"
                placeholder="Enter your nickname"
                onChange={onChange}
                maxLength={10}
              />
              <br></br>
              <Form.Label>Game ID:</Form.Label>
              <Form.Control
                type="text"
                name="gameID"
                placeholder="Enter game ID"
                onChange={onChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onSubmit}>
              Join Room
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default JoinGame;
