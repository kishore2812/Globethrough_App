import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../HomeScreen/HomeScreen";
import FlightListScreen from "../HomeStacks/FlightListScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }} // Hide header for Home
      />
      <Stack.Screen
        name="FlightListScreen"
        component={FlightListScreen}
        options={{ headerShown: false }} // Hide header for FlightListScreen
      />
    </Stack.Navigator>
  );
};

export default HomeStack;