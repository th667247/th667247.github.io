import React, { useState, useEffect } from "react";

function Stopwatch() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  return (
    <div>
      <p>Duration: {formatTime(timer)}</p>
      <button onClick={toggleTimer}>
        {isRunning ? "Stop Timer" : "Start Timer"}
      </button>
      <button onClick={resetTimer}>Reset Timer</button>
    </div>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
}

export default Stopwatch;
