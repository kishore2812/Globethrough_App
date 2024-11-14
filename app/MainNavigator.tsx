import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing icon set

// Import the actual screen components
import HomeScreen from './HomeScreen/HomeScreen';
import PackagesScreen from './PackagesScreen/PackagesScreen';
import BookingScreen from './BookingScreen/BookingScreen';
import OffersScreen from './OffersScreen/OffersScreen';
import AccountScreen from './AccountScreen/AccountScreen';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home'; // MaterialCommunityIcons 'home' icon
              break;
            case 'Packages':
              iconName = 'notebook-check-outline'; // MaterialCommunityIcons 'package' icon
              break;
            case 'Booking':
              iconName = 'ticket-percent-outline'; // MaterialCommunityIcons 'clipboard-list' icon
              break;
            case 'Offers':
              iconName = 'sale'; // MaterialCommunityIcons 'sale' icon
              break;
            case 'Account':
              iconName = 'account'; // MaterialCommunityIcons 'account' icon
              break;
            default:
              iconName = 'circle'; // Default icon
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#01493E',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Disable header for all screens
        
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
