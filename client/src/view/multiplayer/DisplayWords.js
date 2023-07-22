import React, { useEffect, useState } from "react";
import "./mul.css";
import socket from "../../../socketConfig";

const updateDisplay = (prompt, userInput, gameID) => {
  var corCharCnt = 0;
  var incCharCnt = 0;
  let temp = userInput;

  var testChar = "";
  var corChar = "";
  var index = 0;
  var tempPrompt = prompt.slice();

  for (let i = 0; i < tempPrompt.length; i++) {
    tempPrompt[i].styling = "word";
    var characters = tempPrompt[i].characters;
    for (let j = 0; j < characters.length; j++) {
      corChar = characters[j].character;
      testChar = temp.charAt(index);

      if (testChar === "") {
        tempPrompt[i].characters[j].styling = "character";
      } else if (testChar === corChar) {
        tempPrompt[i].characters[j].styling = "character correct";
        corCharCnt++;
      } else if (testChar !== corChar) {
        tempPrompt[i].characters[j].styling = "character incorrect";
        incCharCnt++;
      }

      if (index === temp.length) {
        tempPrompt[i].characters[j].styling = "character current";
        tempPrompt[i].styling = "word current";
      }
      index++;
    }
  }

  socket.emit("char-count", { corCharCnt, gameID });
  return tempPrompt;
};

const DisplayWords = ({ prompt, player, gameID }) => {
  const [promptState, setPromptState] = useState(prompt);
  useEffect(() => {
    setPromptState(updateDisplay(promptState, player.input, gameID));
  }, [player.input]);
  return (
    <div className="disable-select">
      <div
        className="prompt-text"
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "100%",
          width: "100%",
        }}
      >
        {promptState.map((word, index) => (
          <span className={word.styling}>
            {word.characters.map((character, index2) => (
              <span className={character.styling}>{character.character}</span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};
export default DisplayWords;
