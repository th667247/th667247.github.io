import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Question from "./Question";
import Summary from "./Summary";

const Stack = createStackNavigator();

// Web Design Quiz Questions
const questions = [
  {
    prompt: "What does HTML stand for?",
    type: "multiple-choice",
    choices: [
      "HyperText Markup Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Language",
    ],
    correct: 0, // Correct answer is "HyperText Markup Language"
  },
  {
    prompt: "Which of these are valid CSS properties?",
    type: "multiple-answer",
    choices: ["color", "font-size", "potato", "margin"],
    correct: [0, 1, 3], // "color", "font-size", and "margin" are valid
  },
  {
    prompt: "Is CSS used for styling a website?",
    type: "true-false",
    choices: ["True", "False"],
    correct: 0, // True
  },
  {
    prompt: "Which HTML tag is used to create a hyperlink?",
    type: "multiple-choice",
    choices: ["<a>", "<link>", "<href>", "<hyper>"],
    correct: 0, // "<a>"
  },
  {
    prompt: "Which of the following are common web design best practices?",
    type: "multiple-answer",
    choices: [
      "Using clear navigation",
      "Adding flashy animations everywhere",
      "Making the site mobile-friendly",
      "Using readable fonts",
    ],
    correct: [0, 2, 3], // Clear navigation, mobile-friendly, and readable fonts are best practices
  },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Question"
        screenOptions={{ headerShown: false }} // Hide default headers for cleaner UI
      >
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
