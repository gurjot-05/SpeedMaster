import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import typingChallenges from "./typingChallenges.json";
import "./SoloMode.css";
import prompts from "./prompts";

import ClockDisplay from "./ClockDisplay";

const SoloMode = ({ onBackToMenu }) => {
  const [typingChallenge, setTypingChallenge] = useState("");
  const [typedText, setTypedText] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const text = typingChallenge;
  const textIndex = typedText.length;
  const [gameInProgress, setGameInProgress] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [progress, setProgress] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState("easy");

  const shufflePrompts = () => {
    const shuffledPrompts = [...prompts];
    for (let i = shuffledPrompts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPrompts[i], shuffledPrompts[j]] = [
        shuffledPrompts[j],
        shuffledPrompts[i],
      ];
    }
    return shuffledPrompts;
  };

  const getTypingChallenge = (level) => {
    const prompt = prompts.find((item) => item.difficulty === level);
    return prompt ? prompt.text : prompts[0].text;
  };

  const calculateMistakes = (originalText, typedText) => {
    if (typedText === undefined) {
      return 0;
    }

    const originalWords = originalText.trim().split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);

    let mistakesCount = 0;
    for (
      let i = 0;
      i < Math.min(originalWords.length, typedWords.length);
      i++
    ) {
      if (originalWords[i] !== typedWords[i]) {
        mistakesCount++;
      }
    }
    return mistakesCount;
  };

  const handleStartGame = () => {
    const shuffledPrompts = shufflePrompts();
    const chosenDifficultyLevel = difficultyLevel;
    const challenge = shuffledPrompts.find(
      (prompt) => prompt.difficulty === chosenDifficultyLevel
    ).text;
    setTypingChallenge(challenge);
    setTypingChallenge(challenge);
    setGameStarted(true);
    setGameInProgress(true);
    setStartTime(Date.now());
  };

  const handleInputChange = (event) => {
    if (gameStarted && !gameEnded) {
      const inputText = event.target.value;
      setTypedText(inputText);

      const mistakesCount = calculateMistakes(typingChallenge, inputText);
      setMistakes(mistakesCount);

      const words = inputText
        .trim()
        .split(/\s+/)
        .filter((word) => word !== "").length;
      setWordsTyped(words);

      const totalWords = typingChallenge
        .trim()
        .split(/\s+/)
        .filter((word) => word !== "").length;
      const progressPercentage = (words / totalWords) * 100;
      setProgressPercentage(progressPercentage);
    }
  };

  const handleFinishGame = () => {
    const endTime = Date.now();
    const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000);

    const numCharactersTyped = typedText.replace(/\s/g, "").length;
    const typingSpeed = Math.floor(
      (numCharactersTyped * 60) / timeTakenInSeconds
    );

    setGameEnded(true);
    setEndTime(endTime);

    fetch("/api/game-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeTaken: timeTakenInSeconds,
        totalMistakes: mistakes,
        typingSpeed: typingSpeed,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Game result saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving game result:", error);
      });
  };

  const handleTimeUp = () => {
    handleFinishGame();
  };

  const gameDurationInSeconds = 60;

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const timer = setTimeout(() => {
        setGameEnded(true);
        setEndTime(Date.now());
      }, gameDurationInSeconds * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [gameStarted, gameEnded, typedText, mistakes]);

  return (
    <div className="disable-select">
      {!gameStarted ? (
        <div>
          <h1>Solo Mode</h1>
          <p>Select Difficulty Level:</p>
          <div>
            <input
              type="radio"
              id="easy"
              name="difficulty"
              value="easy"
              checked={difficultyLevel === "easy"}
              onChange={() => setDifficultyLevel("easy")}
            />
            <label htmlFor="easy">Easy</label>
          </div>
          <div>
            <input
              type="radio"
              id="medium"
              name="difficulty"
              value="medium"
              checked={difficultyLevel === "medium"}
              onChange={() => setDifficultyLevel("medium")}
            />
            <label htmlFor="medium">Medium</label>
          </div>
          <div>
            <input
              type="radio"
              id="difficult"
              name="difficulty"
              value="difficult"
              checked={difficultyLevel === "difficult"}
              onChange={() => setDifficultyLevel("difficult")}
            />
            <label htmlFor="difficult">Difficult</label>
          </div>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : gameEnded ? (
        <div className="game-summary">
          <p>Game Over!</p>
          <p>
            Time Taken (seconds): {Math.floor((endTime - startTime) / 1000)}
          </p>
          <p>Total Mistakes: {mistakes}</p>
          <p>
            Typing Speed (wpm):{" "}
            {Math.floor(
              typedText.replace(/\s/g, "").length /
                5 /
                (gameDurationInSeconds / 60)
            )}
          </p>
        </div>
      ) : (
        <div>
          <ClockDisplay onTimeUp={handleTimeUp} />
          <p className="original-text">{typingChallenge}</p>
          <textarea
            value={typedText}
            onChange={handleInputChange}
            placeholder="Start typing..."
          />
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="progress-text">
                {Math.floor(progressPercentage)}%
              </div>
            </div>
          </div>
          <button style={{ marginLeft: "179px" }} onClick={handleFinishGame}>
            Finish
          </button>
        </div>
      )}
    </div>
  );
};

export default SoloMode;
