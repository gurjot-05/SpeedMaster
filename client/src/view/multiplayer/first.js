import React from "react";
import { Link } from "react-router-dom";
import "./mul.css";
const First = () => {
  return (
    <div className="home-div">
      <Link to="/game/create">
        <button>Create Room</button>
      </Link>
      <Link to="/game/join">
        <button>Join Room</button>
      </Link>
    </div>
  );
};

export default First;
