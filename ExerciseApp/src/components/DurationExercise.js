import React from "react";
import StopWatch from "./StopWatch";

function DurationExercise({ exercise, setMenuScreen }) {
  let { name } = exercise;
  return (
    <div>
      <p>{name}</p>
      <StopWatch />
      <button onClick={setMenuScreen}>Back to Menu</button>
    </div>
  );
}

export default DurationExercise;
