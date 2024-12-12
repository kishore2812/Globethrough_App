import { transform } from "@babel/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from "react-native";

const { width, height } = Dimensions.get("window");

const FlightSearchLoadingScreen = () => {
  const [slideAnim] = useState(new Animated.Value(-width)); // Initial position off-screen to the left

  useEffect(() => {
    // Start animation to slide the GIF to the center
    Animated.timing(slideAnim, {
      toValue: 0, // End position in the center
      duration: 1500, // Duration of the animation
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <View style={styles.container}>
      {/* Animated GIF */}
      <Animated.View
        style={[
          styles.gifContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <Image
          source={require("../assets/images/Flight_Animation_Loading.gif")}
          style={styles.loadingImage}
          resizeMode="cover"
        />
      </Animated.View>
      {/* Heading and Paragraph above the GIF */}
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Searching for the Flights...</Text>
        <Text style={styles.paragraph}>
          Sit back and relax as we scan for the perfect flights just for you.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05, // 5% of screen width for padding
    transform: [{ translateY: height * -0.07 }], // Shift upwards by 7% of screen height
  },

  gifContainer: {
    width: width * 0.6, // 60% of screen width
    height: height * 0.5, // 30% of screen height
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  loadingImage: {
    width: "100%",
    height: "110%", // Slightly larger than the container for cropping
  },
  textContainer: {
    position: "absolute",
    bottom: height * 0.25, // 25% of screen height from the bottom
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05, // 5% of screen width for padding
  },
  heading: {
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    fontSize: width * 0.035, // 3.5% of screen width
    textAlign: "center",
    marginTop: height * 0.01, // 1% of screen height for margin
  },
});

export default FlightSearchLoadingScreen;
