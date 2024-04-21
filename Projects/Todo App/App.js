import React from "react";
import { View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TodoApp from "./TodoApp";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ title: "Menu" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: "Registration" }}
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Registration"
        onPress={() => navigation.navigate("Registration")}
      />
      <Button title="Todo App" onPress={() => navigation.navigate("Todo")} />
    </View>
  );
}
