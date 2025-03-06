import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

const Question = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(questions[0].choices.length).fill(false)
  );
  const [answers, setAnswers] = useState(new Array(questions.length).fill([]));
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelection = (index) => {
    setSelectedAnswers((prevState) => {
      const newState =
        questions[currentIndex].type === "multiple-answer"
          ? [...prevState]
          : new Array(prevState.length).fill(false);
      newState[index] = !newState[index];
      return newState;
    });
  };

  const submitAnswer = () => {
    const chosenAnswers = selectedAnswers
      .map((isSelected, index) => (isSelected ? index : null))
      .filter((index) => index !== null);

    setAnswers((prevState) => {
      const newState = [...prevState];
      newState[currentIndex] = chosenAnswers;
      return newState;
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        setSelectedAnswers(
          new Array(questions[nextIndex].choices.length).fill(false)
        );
        return nextIndex;
      });
    } else {
      setQuizFinished(true);
    }
  };

  useEffect(() => {
    if (quizFinished) {
      navigation.navigate("Summary", { questions, answers });
    }
  }, [quizFinished, answers]);

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
        title={
          currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"
        }
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
    backgroundColor: "#f4f4f8",
    padding: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
  },
  checkBoxContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    width: "90%",
    paddingVertical: 10,
    marginBottom: 10,
    elevation: 3,
  },
  checkBoxText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#444",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default Question;
