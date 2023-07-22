import React, { useState, useEffect } from "react";
import "./ClockDisplay.css";

const ClockDisplay = ({ onTimeUp }) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(timer);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onTimeUp]);

  // Format the seconds as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const rotation = (360 * seconds) / 60;

  return (
    <div className="clock-display">
      <div className="clock-timer">{formatTime(seconds)}</div>
    </div>
  );
};

export default ClockDisplay;
