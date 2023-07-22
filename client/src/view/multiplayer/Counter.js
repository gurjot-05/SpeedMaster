import React, { useState, useEffect } from "react";
import "./mul.css";
import socket from "../../../socketConfig";

const Counter = ({ isOver }) => {
  const [timer, setTimer] = useState({ countDown: "", msg: "" });

  useEffect(() => {
    const handleTimerUpdate = (data) => {
      setTimer(data);
    };

    socket.on("timer", handleTimerUpdate);

    return () => {
      // Clean up the socket event listener when the component unmounts
      socket.removeListener("timer", handleTimerUpdate);
    };
  }, []);

  const { countDown } = timer;

  // If the counter hasn't started yet (countDown is an empty string), don't render the circle
  if (!countDown) {
    return null;
  }

  return (
    <>
      {!isOver ? (
        <div className="countdown-container">
          <span className="countdown">{countDown}</span>
        </div>
      ) : null}
    </>
  );
};

export default Counter;
