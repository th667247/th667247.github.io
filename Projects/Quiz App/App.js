import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Question from "./Question";
import Summary from "./Summary";

const Stack = createStackNavigator();

const questions = [
  {
    prompt: "Which color is a primary color?",
    type: "multiple-choice",
    choices: ["Red", "Green", "Yellow", "Blue"],
    correct: 3, // correct answer is Blue
  },
  {
    prompt: "Which colors make purple?",
    type: "multiple-answer",
    choices: ["Red", "Green", "Yellow", "Blue"],
    correct: [0, 3], // correct answers are Red and Blue
  },
  {
    prompt: "Is black a color?",
    type: "true-false",
    choices: ["True", "False"],
    correct: 1, // correct answer is True, made the array equal to 1 because 0 was coming in as false, couldnt figure it out :)
  },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{ questions }}
        />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
