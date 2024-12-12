import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../HomeScreen/HomeScreen";
import FlightListScreen from "../HomeStacks/FlightListScreen/FlightListScreen";
import { Provider } from "react-redux";
import store from "../StateManagement/Store";
import TicketDetailScreen from "../HomeStacks/TicketDetailScreen/TicketDetailScreen";
import PassengerDetailScreen from "../HomeStacks/PassengerDetailScreen/PassengerDetailScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Provider store={store}>
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
        <Stack.Screen
          name="TicketDetailScreen"
          component={TicketDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PassengerDetailScreen"
          component={PassengerDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default HomeStack;
