import "./App.css";
import React, { useState, useCallback } from "react";
import DurationExercise from "./components/DurationExercise";
import RepetitionExercise from "./components/RepetitionExercise";
import RunningExercise from "./components/RunningExercise";

const Menu_SCREEN = "menu";
const EXERCISE_SCREEN = "exercise";
const DURATION_EXERCISE = "Duration";
const REPETITION_EXERCISE = "Repetition";
const RUNNING_EXERCISE = "Running";

let exerciseList = [
  { type: DURATION_EXERCISE, name: "Running" },
  { type: DURATION_EXERCISE, name: "Rowing" },
  { type: DURATION_EXERCISE, name: "Swimming" },
  { type: REPETITION_EXERCISE, name: "Push Ups" },
  { type: RUNNING_EXERCISE, name: "Running Exercise" },
];

function App() {
  let [currentScreen, setCurrentScreen] = useState(Menu_SCREEN);
  let [currentExercise, setCurrentExercise] = useState({});
  let screenComponent = undefined;
  let buttonClick = useCallback(
    (exercise) => {
      setCurrentExercise(exercise);
      setCurrentScreen(EXERCISE_SCREEN);
    },
    [setCurrentExercise, setCurrentScreen]
  );

  if (currentScreen === Menu_SCREEN) {
    screenComponent = (
      <div>
        <p>Exercise Menu</p>
        <ul>
          {exerciseList.map((exercise) => (
            <li key={exercise.name}>
              <button onClick={() => buttonClick(exercise)}>
                {exercise.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (currentScreen === EXERCISE_SCREEN) {
    switch (currentExercise.type) {
      case DURATION_EXERCISE:
        screenComponent = (
          <DurationExercise
            exercise={currentExercise}
            setMenuScreen={() => setCurrentScreen(Menu_SCREEN)}
          />
        );
        break;

      case REPETITION_EXERCISE:
        screenComponent = (
          <RepetitionExercise
            exercise={currentExercise}
            setMenuScreen={() => setCurrentScreen(Menu_SCREEN)}
          />
        );
        break;

      case RUNNING_EXERCISE:
        screenComponent = (
          <RunningExercise
            exercise={currentExercise}
            setMenuScreen={() => setCurrentScreen(Menu_SCREEN)}
          />
        );
        break;

      default:
        screenComponent = undefined;
    }
  }

  return (
    <div className="App">
      <header className="App-header">{screenComponent}</header>
    </div>
  );
}

export default App;
