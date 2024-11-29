import React, { useState, useEffect, useRef } from "react";
import styles from "./HomeScreenStyles";

import {
  Text,
  View,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import FlightBookingComponent from "../Components/FlightBookingComponent";


const HomeScreen = ({ navigation }: any) => {


  //for responive
  const { width, height } = Dimensions.get("window");

  //for font
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Bold": require("../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Medium": require("../../assets/fonts/Satoshi-Medium.otf"),
  });

  // Show loading spinner while fonts are loading
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
 


  //Animation functions
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen at the bottom
  const heightAnim = useRef(new Animated.Value(0.1)).current; // Start with minimum height
  const borderRadiusAnim = useRef(new Animated.Value(0)).current; // Start with 0 radius

  // Trigger the animations only when isLoading becomes false
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0, // Slide up to on-screen position
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease, // Ease the animation for smoothness
      }),
      Animated.timing(heightAnim, {
        toValue: 1, // Animate to final height (55%)
        duration: 500,
        useNativeDriver: false,
        easing: Easing.ease, // Ease the animation for smoothness
      }),
      Animated.timing(borderRadiusAnim, {
        toValue: 20, // Animate border radius to 20
        duration: 500,
        useNativeDriver: false,
        easing: Easing.ease, // Ease the animation for smoothness
      }),
    ]).start();
  }, []); // Run this effect only when isLoading changes

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.backgroundView,
          {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["75%", "55%"], // Transition from 75% to 55%
            }),
            borderBottomLeftRadius: borderRadiusAnim,
            borderBottomRightRadius: borderRadiusAnim,
          },
        ]}
      />

      <StatusBar barStyle="default" backgroundColor="#01493E"></StatusBar>

      <View style={styles.card}>
        <View style={styles.shapeContainer}>
          <View style={styles.rectangle}>
            <Text style={styles.bookmarkText}>Easy EMI Plans</Text>
          </View>
          <View style={styles.diamond}></View>
        </View>
        <Text style={styles.cardContent}>
          Get your dream flight with flexible EMI options that suit your budget.
        </Text>
      </View>

      <FlightBookingComponent navigation={navigation} />
    </View>
  );
};

export default HomeScreen;