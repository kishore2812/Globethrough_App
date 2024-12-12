import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./HomeStack"; // Import HomeStack
import PackagesScreen from "../PackagesScreen/PackagesScreen";
import BookingScreen from "../BookingScreen/BookingScreen";
import OffersScreen from "../OffersScreen/OffersScreen";

import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const MainNavigator: React.FC = () => {
  // For font loading
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Bold": require("../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Medium": require("../../assets/fonts/Satoshi-Medium.otf"),
  });

  // Show loading spinner while fonts are loading
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              size = 35;
              break;
            case "Packages":
              iconName = "notebook-check";
              size = 30;
              break;
            case "Booking":
              iconName = "ticket";
              size = 28;
              return <Ionicons name={iconName} size={size} color={color} />;
            case "Offers":
              iconName = "sale";
              size = 28;
              break;
            case "Account":
              iconName = "account";
              size = 30;
              break;
            default:
              iconName = "circle";
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#01493E",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Disable header for all screens
        tabBarStyle: {
          height: height * 0.08,
          paddingTop: height * 0.01,
        },
        tabBarLabelStyle: {
          fontFamily: "Satoshi-Bold",
          fontSize: width * 0.03,
          fontWeight: "bold",
          paddingBottom: height * 0.01,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Packages" component={PackagesScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
