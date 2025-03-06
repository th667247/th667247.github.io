import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f1f1f1", // Slightly lighter background color for contrast
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  input: {
    width: "75%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#fff", // White background for the input box
  },
  addButton: {
    width: "20%",
    height: 45,
    backgroundColor: "#4CAF50", // Green color for the Add button
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskList: {
    width: "100%",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fff", // White background for tasks
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Adds a small shadow effect for better separation of tasks
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007BFF",
    borderRadius: 12,
    marginRight: 15,
  },
  completedCheckbox: {
    backgroundColor: "#007BFF", // Blue color for completed tasks
  },
  taskText: {
    fontSize: 18,
    color: "#333",
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: "line-through", // Strike-through text for completed tasks
    color: "#888", // Grey text color for completed tasks
  },
  removeButton: {
    color: "red", // Red color for the Remove button
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#f5f5f5", // Light grey background for the remove button
    marginLeft: 10,
  },
  removeButtonText: {
    fontSize: 12,
    color: "red",
  },
});
