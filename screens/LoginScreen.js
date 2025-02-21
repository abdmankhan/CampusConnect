import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Replace YOUR_BACKEND_URL with your backend endpoint
      const response = await axios.post(
        "http://192.168.137.1:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data.user);

      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
        login(response.data.token);
        navigation.navigate("Home");
      } else {
        Alert.alert("Login failed", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging in");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert("Google Login", "Not implemented yet")}
        >
          <Text style={styles.link}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    marginLeft: 15,
    color: "#333",
    fontWeight: "600",
  },
  form: { padding: 20 },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  link: { color: "#007bff", textAlign: "center", marginTop: 10, fontSize: 16 },
});
