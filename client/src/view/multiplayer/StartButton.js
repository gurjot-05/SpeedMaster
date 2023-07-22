import React, { useState } from "react";
import { Button } from "react-bootstrap";

import socket from "../../../socketConfig";

const StartButton = ({ player, gameID }) => {
  const [showBtn, setShowBtn] = useState(true);
  const { isPartyLeader } = player;

  const handleStart = (e) => {
    socket.emit("timer", { playerID: player._id, gameID });
    setShowBtn(false);
  };

  return isPartyLeader && showBtn ? (
    <Button
      className=""
      size="lg"
      block
      variant="primary"
      onClick={handleStart}
    >
      Start
    </Button>
  ) : null;
};

export default StartButton;
