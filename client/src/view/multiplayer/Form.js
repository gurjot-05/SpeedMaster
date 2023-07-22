import React, { useState, useRef, useEffect } from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";

import socket from "../../../socketConfig";

const InputForm = ({ isOpen, isOver, gameID }) => {
  const [userInput, setUserInput] = useState("");
  const [userFinished, setUserFinished] = useState(false);
  const textInput = useRef(null);

  useEffect(() => {
    socket.on("finished", () => {
      setUserFinished(true);
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      textInput.current.focus();
    }
  }, [isOpen]);

  const onChange = (e) => {
    let val = e.target.value;
    setUserInput(val);
  };

  useEffect(() => {
    socket.emit("user-input", { userInput, gameID });
  }, [userInput]);

  return (
    <InputGroup size="lg">
      <FormControl
        readOnly={isOpen || isOver || userFinished}
        autoFocus
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        placeholder="Start typing..."
        ref={textInput}
        type="text"
        onChange={onChange}
      />
    </InputGroup>
  );
};

export default InputForm;
