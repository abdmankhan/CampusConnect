import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AddRequestScreen from "./AddRequestScreen";
import FetchRequestsScreen from "./FetchRequestsScreen";
import UserProfileScreen from "./UserProfileScreen";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddRequest" component={AddRequestScreen} />
      <Stack.Screen name="FetchRequests" component={FetchRequestsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}
