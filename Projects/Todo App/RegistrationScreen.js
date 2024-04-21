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
    switch (fieldName) {
      case "firstName":
      case "lastName":
        const nameRegex = /^[^\d=?\\/@#%^&*()]+$/;
        if (!nameRegex.test(fieldValue)) {
          setErrors({
            ...errors,
            [fieldName]:
              "Error: Must only include letters and symbols, no numbers",
          });
        } else {
          setErrors({ ...errors, [fieldName]: "" });
        }
        break;
      case "username":
        setErrors({ ...errors, [fieldName]: "" });
        break;
      case "phoneNumber":
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(fieldValue)) {
          setErrors({
            ...errors,
            [fieldName]: "Error: Must be in the format (xxx) xxx-xxxx",
          });
        } else {
          setErrors({ ...errors, [fieldName]: "" });
        }
        break;
      case "email":
        const emailRegex =
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (!emailRegex.test(fieldValue)) {
          setErrors({
            ...errors,
            [fieldName]: "Error: Must be a valid email address",
          });
        } else {
          setErrors({ ...errors, [fieldName]: "" });
        }
        break;
      case "password":
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(fieldValue)) {
          setErrors({
            ...errors,
            [fieldName]:
              "Error: Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long",
          });
        } else {
          setErrors({ ...errors, [fieldName]: "" });
        }
        break;
      case "confirmPassword":
        if (fieldValue !== password) {
          setErrors({
            ...errors,
            [fieldName]: "Error: Passwords do not match",
          });
        } else {
          setErrors({ ...errors, [fieldName]: "" });
        }
        break;
      case "zipCode":
        const zipRegex = /^\d{5}$/;
        if (!zipRegex.test(fieldValue)) {
          setErrors({
            ...errors,
            [fieldName]: "Error: Must be a 5-digit ZIP Code",
          });
        } else {
          setErrors({ ...errors, [fieldName]: "" });
        }
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    for (const error of Object.values(errors)) {
      if (error) {
        return;
      }
    }

    try {
      const registrationData = {
        firstName,
        lastName,
        username,
        phoneNumber,
        password,
        email,
        zipCode,
        newsletter,
      };

      let storedData = await AsyncStorage.getItem("registrationData");
      storedData = storedData ? JSON.parse(storedData) : [];
      storedData.push(registrationData);
      await AsyncStorage.setItem(
        "registrationData",
        JSON.stringify(storedData)
      );

      navigation.navigate("Login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
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
