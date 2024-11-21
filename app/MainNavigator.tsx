import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Importing icon set
import Ionicons from "react-native-vector-icons/Ionicons";
// Import the actual screen components
import HomeScreen from "./HomeScreen/HomeScreen";
import PackagesScreen from "./PackagesScreen/PackagesScreen";
import BookingScreen from "./BookingScreen/BookingScreen";
import OffersScreen from "./OffersScreen/OffersScreen";
import AccountScreen from "./AccountScreen/AccountScreen";
import { Dimensions } from "react-native";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");
const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home"; // MaterialCommunityIcons 'home' icon
              size = 35;
              break;
            case "Packages":
              iconName = "notebook-check-outline"; // MaterialCommunityIcons 'package' icon
              size = 30;
              break;
            case "Booking":
              iconName = "ticket-outline"; // Ionicons 'ticket' icon for Booking
              size = 30; // Make the icon size responsive
              return <Ionicons name={iconName} size={size} color={color} />;

            case "Offers":
              iconName = "sale"; // MaterialCommunityIcons 'sale' icon
              size = 30;
              break;
            case "Account":
              iconName = "account"; // MaterialCommunityIcons 'account' icon
              size = 30;
              break;
            default:
              iconName = "circle"; // Default icon
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#01493E",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Disable header for all screens
        tabBarStyle: {
          height: height * 0.08, // Responsive height based on screen height
          paddingTop: height * 0.01, // Responsive padding top
        },
        tabBarLabelStyle: {
          fontSize: width * 0.03, // Font size responsive to screen width
          fontWeight: "bold", // Make label text bold (optional)
          paddingBottom: height * 0.01, // Adjust padding based on screen height
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Packages" component={PackagesScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
