import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./mul.css";
import socket from "../../../socketConfig";

const CreateGame = (props) => {
  const [nickName, setNickName] = useState("");
  const [valid, setValid] = useState(false);
  const onChange = (e) => {
    setNickName(e.target.value);
    if (e.target.value.length !== 0) {
      setNickName(e.target.value);
      setValid(true);
    } else {
      setValid(false);
    }
    console.log(nickName);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(nickName);
    socket.emit("create-game", nickName);
  };

  return (
    <>
      <div className="container">
        <h3>Create Game</h3>
        <div className="card-container">
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                placeholder="Enter your nickname"
                onChange={onChange}
                maxLength={10}
              />
            </Form.Group>
            <Button
              disabled={!valid}
              variant="primary"
              type="submit"
              onClick={onSubmit}
            >
              Create Room
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateGame;
