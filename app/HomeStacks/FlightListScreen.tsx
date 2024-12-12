// FlightListScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import FlightLoadingScreen from "../FlightLoadingScreen"; // Importing custom loading screen
import FlightBookingComponent from "../Components/FlightBookingComponent";

const FlightListScreen = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    fromAirport,
    toAirport,
    adults,
    selectedClass,
    tripType,
    children,
    infants,
    departureDate,
    returnDate,
    selectedOption,
  } = route.params;

  // Convert back to Date objects
  const departureDateObj = departureDate ? new Date(departureDate) : null;
  const returnDateObj = returnDate ? new Date(returnDate) : null;

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500); // Adjust duration as needed
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (isLoading) {
    return <FlightLoadingScreen />; // Render the custom loading screen
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flight Details</Text>
      <Text style={styles.detail}>Trip: {tripType}</Text>
      <Text style={styles.detail}>
        Departure Date:{" "}
        {departureDateObj ? departureDateObj.toDateString() : "N/A"}
      </Text>
      <Text style={styles.detail}>
        Return Date: {returnDateObj ? returnDateObj.toDateString() : "N/A"}
      </Text>
      {/* Ensure fromAirport and toAirport exist before accessing properties */}
      {fromAirport && fromAirport.IATA && fromAirport.City ? (
        <>
          <Text>From Airport IATA: {fromAirport.IATA}</Text>
          <Text>From Airport City: {fromAirport.City}</Text>
        </>
      ) : (
        <Text>From Airport data is unavailable</Text>
      )}
      {toAirport && toAirport.IATA && toAirport.City ? (
        <>
          <Text>To Airport IATA: {toAirport.IATA}</Text>
          <Text>To Airport City: {toAirport.City}</Text>
        </>
      ) : (
        <Text>To Airport data is unavailable</Text>
      )}
      <Text style={styles.detail}>Adults: {adults}</Text>
      <Text style={styles.detail}>Children: {children}</Text>
      <Text style={styles.detail}>Infants: {infants}</Text>
      <Text style={styles.detail}>Class: {selectedClass}</Text>
      <Text style={styles.detail}>Option: {selectedOption}</Text>
      
      {/* Pass tripType to the FlightBookingComponent */}
      <FlightBookingComponent navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default FlightListScreen;
