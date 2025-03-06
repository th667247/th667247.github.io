import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styles } from "./styles";

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: "1", description: "Task 1", completed: false },
    { id: "2", description: "Task 2", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      const newId = (tasks.length + 1).toString(); // Use an incremental ID for simplicity
      setTasks([
        ...tasks,
        {
          id: newId,
          description: newTask,
          completed: false,
        },
      ]);
      setNewTask(""); // Clear input field after adding
    }
  };

  // Remove task logic
  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
        <View
          style={[styles.checkbox, item.completed && styles.completedCheckbox]}
        />
      </TouchableOpacity>
      <Text
        style={[styles.taskText, item.completed && styles.completedTaskText]}
      >
        {item.description}
      </Text>
      <TouchableOpacity onPress={() => removeTask(item.id)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Enter new task"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
