// Question & Quiz

import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

const Question = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions[currentIndex].choices.length).fill(false)
  );
  const [answers, setAnswers] = useState(Array(questions.length).fill([]));

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswers(
        Array(questions[currentIndex + 1].choices.length).fill(false)
      );
    } else {
      navigation.navigate("Summary", { questions, answers });
    }
  };

  const handleAnswerSelection = (index) => {
    if (
      questions[currentIndex].type === "true-false" ||
      questions[currentIndex].type === "multiple-choice"
    ) {
      setSelectedAnswers(
        Array(questions[currentIndex].choices.length).fill(false)
      );
      setSelectedAnswers((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    } else {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[index] = !newSelectedAnswers[index];
      setSelectedAnswers(newSelectedAnswers);
    }
  };

  const submitAnswer = () => {
    if (
      questions[currentIndex].type === "true-false" ||
      questions[currentIndex].type === "multiple-choice"
    ) {
      const chosenAnswer = selectedAnswers.findIndex(
        (isSelected) => isSelected
      );
      setAnswers((prevState) => {
        const newState = [...prevState];
        newState[currentIndex] = [chosenAnswer];
        return newState;
      });
    } else {
      const chosenAnswers = selectedAnswers.reduce((acc, isSelected, index) => {
        if (isSelected) {
          acc.push(index);
        }
        return acc;
      }, []);
      setAnswers((prevState) => {
        const newState = [...prevState];
        newState[currentIndex] = chosenAnswers;
        return newState;
      });
    }
    nextQuestion();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentIndex].prompt}</Text>
      {questions[currentIndex].choices.map((choice, index) => (
        <CheckBox
          key={index}
          title={choice}
          checked={selectedAnswers[index]}
          onPress={() => handleAnswerSelection(index)}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
      ))}
      <Button
        title="Next Question"
        onPress={submitAnswer}
        disabled={!selectedAnswers.includes(true)}
        testID="next-question"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
  },
  checkBoxText: {
    fontSize: 18,
  },
});

export default Question;
