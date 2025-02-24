import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

export default function UserProfileScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.replace("Login"); // Replace instead of navigate
        return;
      }

      const response = await axios.get(
        "https://campus-connect-five-vert.vercel.app/api/auth/getProfile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);
      setProfile(response.data);
    } catch (error) {
      console.error(
        "Profile Fetch Error:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profile && (
        <>
          <Text style={styles.header}>User Profile</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.info}>Name: {profile.name}</Text>
            <Text style={styles.info}>Email: {profile.email}</Text>
            <Text style={styles.info}>Phone: {profile.phone || "N/A"}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("UpdateProfile", { profile })}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={async () => {
                await AsyncStorage.removeItem("userToken");
                logout();
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: { fontSize: 28, marginBottom: 20 },
  profileContainer: { marginBottom: 30 },
  info: { fontSize: 20, marginVertical: 5 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: { color: "#fff", fontSize: 18 },
});
