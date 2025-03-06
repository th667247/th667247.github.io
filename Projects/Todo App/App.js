import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TodoApp from "./TodoApp";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";

// Create a Stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ title: "Main Menu" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Todo"
          component={TodoApp}
          options={{ title: "Todo App" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Registration"
        onPress={() => navigation.navigate("Registration")}
      />
      <Button title="Todo App" onPress={() => navigation.navigate("Todo")} />
    </View>
  );
}

// Styles extracted for maintainability
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
});
