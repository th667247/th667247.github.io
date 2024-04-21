import React, { useState } from "react";
import { View, Button, AsyncStorage, StyleSheet, Text } from "react-native";
import { Input } from "react-native-elements";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const loginDataString = await AsyncStorage.getItem("loginData");
    const loginData = JSON.parse(loginDataString) || [];

    const user = loginData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      navigation.navigate("TodoApp");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Input
          testID="login-username"
          placeholder="Login"
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          testID="login-password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <Button testID="login-button" title="Login" onPress={handleLogin} />
        <Button
          testID="login-register"
          title="Register"
          onPress={() => navigation.navigate("Registration")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  box: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
