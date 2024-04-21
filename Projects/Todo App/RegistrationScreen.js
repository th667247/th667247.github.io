import React, { useState } from "react";
import { View, Button, AsyncStorage, Text } from "react-native";
import { Input, CheckBox } from "react-native-elements";

export default function RegistrationScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    email: "",
    zipCode: "",
  });

  const handleBlur = (fieldName, fieldValue) => {
    // Validation logic...
  };

  const handleRegister = async () => {
    // Registration logic...
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Input
        testID="firstname"
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        onBlur={() => handleBlur("firstName", firstName)}
      />
      {errors.firstName ? <Text>{errors.firstName}</Text> : null}

      <Input
        testID="lastname"
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
        onBlur={() => handleBlur("lastName", lastName)}
      />
      {errors.lastName ? <Text>{errors.lastName}</Text> : null}

      <Input
        testID="username"
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        onBlur={() => handleBlur("username", username)}
      />
      {errors.username ? <Text>{errors.username}</Text> : null}

      <Input
        testID="phonenumber"
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        onBlur={() => handleBlur("phoneNumber", phoneNumber)}
      />
      {errors.phoneNumber ? <Text>{errors.phoneNumber}</Text> : null}

      <Input
        testID="password"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        onBlur={() => handleBlur("password", password)}
      />
      {errors.password ? <Text>{errors.password}</Text> : null}

      <Input
        testID="confirmpassword"
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
        onBlur={() => handleBlur("confirmPassword", confirmPassword)}
      />
      {errors.confirmPassword ? <Text>{errors.confirmPassword}</Text> : null}

      <Input
        testID="email"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        onBlur={() => handleBlur("email", email)}
      />
      {errors.email ? <Text>{errors.email}</Text> : null}

      <Input
        testID="zip"
        placeholder="ZIP Code"
        onChangeText={(text) => setZipCode(text)}
        onBlur={() => handleBlur("zipCode", zipCode)}
      />
      {errors.zipCode ? <Text>{errors.zipCode}</Text> : null}

      <CheckBox
        title="Sign up for newsletter"
        checked={newsletter}
        onPress={() => setNewsletter(!newsletter)}
      />

      <Button
        title="Register"
        onPress={handleRegister}
        disabled={Object.values(errors).some((error) => !!error)}
      />
    </View>
  );
}
