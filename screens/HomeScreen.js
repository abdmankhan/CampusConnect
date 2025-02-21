import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Drawer Menu Button */}
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 20 }}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={32} color="black" />
      </TouchableOpacity>

      {/* User Profile Icon */}
      <TouchableOpacity
        style={{ position: "absolute", top: 40, right: 20 }}
        onPress={() => navigation.navigate("UserProfile")}
      >
        <Ionicons name="person-circle" size={32} color="black" />
      </TouchableOpacity>

      {/* Add Request Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          padding: 20,
          marginBottom: 20,
          width: 200,
          alignItems: "center",
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("AddRequest")}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Add Request</Text>
      </TouchableOpacity>

      {/* Fetch All Requests Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#28a745",
          padding: 20,
          width: 200,
          alignItems: "center",
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("FetchRequests")}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Fetch All Requests</Text>
      </TouchableOpacity>
    </View>
  );
}
