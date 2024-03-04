import React, { useState, useEffect } from "react";

function RunningExercise({ setMenuScreen }) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      const startTime = Date.now() - timer;
      intervalId = setInterval(() => {
        setTimer(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timer]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimer(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, timer]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <p>Running Exercise</p>
      <p>Duration: {formatTime(timer)}</p>
      <button onClick={isRunning ? stopTimer : startTimer}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={resetTimer}>Reset</button>
      <button onClick={recordLap} disabled={!isRunning}>
        Record Lap
      </button>
      <button onClick={() => setMenuScreen()}>Back to Menu</button>
      <div>
        {laps.length > 0 && (
          <div>
            <h2>Laps</h2>
            <ul>
              {laps.map((lapTime, index) => (
                <li key={index}>
                  Lap {index + 1}: {formatTime(lapTime)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RunningExercise;
