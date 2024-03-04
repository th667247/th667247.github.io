import React, { useState } from "react";

function RepetitionExercise({ exercise, setMenuScreen }) {
  let [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div>
      <p>{exercise.name}</p>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
      <button onClick={resetCount}>Reset</button>
      <button onClick={setMenuScreen}>Back to Menu</button>
    </div>
  );
}

export default RepetitionExercise;
