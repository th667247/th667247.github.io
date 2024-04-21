// Summary & Results

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Summary = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, answers } = route.params;

  // Calculate total score
  let totalScore = 0;
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const chosenAnswers = answers[i];
    let isCorrect = false;

    if (question.type === "multiple-choice") {
      // For multiple-choice questions
      isCorrect = chosenAnswers[0] === question.correct;
    } else if (question.type === "multiple-answer") {
      // For multiple-answer questions
      isCorrect =
        chosenAnswers.sort().toString() === question.correct.sort().toString();
    } else if (question.type === "true-false") {
      // For true/false questions
      isCorrect = chosenAnswers[0] === question.correct;
    }

    if (isCorrect) {
      totalScore++;
    }
  }

  return (
    <View style={styles.container}>
      <Text testID="total" style={styles.totalScore}>
        Total Score: {totalScore}/{questions.length}
      </Text>
      {questions.map((question, index) => {
        const chosenAnswers = answers[index];
        let isCorrect = false;

        if (question.type === "multiple-choice") {
          // For multiple-choice questions
          isCorrect = chosenAnswers[0] === question.correct;
        } else if (question.type === "multiple-answer") {
          // For multiple-answer questions
          isCorrect =
            chosenAnswers.sort().toString() ===
            question.correct.sort().toString();
        } else if (question.type === "true-false") {
          // For true/false questions
          isCorrect = chosenAnswers[0] === question.correct;
        }

        return (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{question.prompt}</Text>
            <Text style={isCorrect ? styles.correctText : styles.incorrectText}>
              Chosen Answer: {question.choices[chosenAnswers[0]]} -{" "}
              {isCorrect ? "Correct" : "Incorrect"}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalScore: {
    fontSize: 24,
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  correctText: {
    color: "green",
  },
  incorrectText: {
    color: "red",
  },
});

export default Summary;
