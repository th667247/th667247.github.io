import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const Summary = () => {
  const route = useRoute();
  const { questions, answers } = route.params;

  // Function to evaluate if an answer is correct
  const evaluateAnswer = (question, chosenAnswers) => {
    if (question.type === "multiple-choice" || question.type === "true-false") {
      return chosenAnswers[0] === question.correct;
    }
    if (question.type === "multiple-answer") {
      return (
        JSON.stringify([...chosenAnswers].sort()) ===
        JSON.stringify([...question.correct].sort())
      );
    }
    return false;
  };

  // Calculate total score
  const totalScore = questions.reduce(
    (score, question, index) =>
      evaluateAnswer(question, answers[index]) ? score + 1 : score,
    0
  );

  return (
    <View style={styles.container}>
      <Text testID="total" style={styles.totalScore}>
        Total Score: {totalScore} / {questions.length}
      </Text>
      {questions.map((question, index) => {
        const chosenAnswers = answers[index];
        const isAnswerCorrect = evaluateAnswer(question, chosenAnswers);

        return (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{question.prompt}</Text>
            <Text
              testID={`answer-${index}`}
              style={
                isAnswerCorrect ? styles.correctText : styles.incorrectText
              }
            >
              Chosen Answer:{" "}
              {chosenAnswers
                .map((answerIndex) => question.choices[answerIndex])
                .join(", ")}
              {" - "}
              {isAnswerCorrect ? "Correct" : "Incorrect"}
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
    padding: 20,
  },
  totalScore: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  correctText: {
    color: "green",
    fontWeight: "bold",
  },
  incorrectText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Summary;
