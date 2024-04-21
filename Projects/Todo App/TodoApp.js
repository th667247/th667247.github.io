import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  CheckBox,
  TextInput,
  Button,
} from "react-native";
import { styles } from "./styles";

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: "1", description: "Task 1", completed: false },
    { id: "2", description: "Task 2", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: (tasks.length + 1).toString(),
          description: newTask,
          completed: false,
        },
      ]);
      setNewTask("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Enter new task"
        />
        <Button onPress={addTask} title="Add" />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <CheckBox
              value={item.completed}
              onValueChange={() => toggleTaskCompletion(item.id)}
            />
            <Text
              style={[
                styles.taskText,
                item.completed && styles.completedTaskText,
              ]}
            >
              {item.description}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
