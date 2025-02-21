import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function FetchRequestsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Fetch Requests Page</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "blue" }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
