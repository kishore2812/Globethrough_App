import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PassengerDetailScreen = ({ route }: any) => {
  const {
    departureFlight,
    returnFlight,
    tripType,
    fromAirport,
    toAirport,
    departureDate,
    returnDate,
    selectedClass,
    selectedOption,
    adults,
    children,
    infants,
    totalPrice,
  } = route.params; // Destructuring to get the passed params

  return (
    <View style={styles.container}>
      {/* Trip Type */}
      <Text style={styles.title}>Trip Type: {tripType}</Text>

      {/* Traveler Info */}
      <View style={styles.travelersSection}>
        <Text style={styles.subHeading}>Travelers:</Text>
        <Text style={styles.details}>Adults: {adults}</Text>
        <Text style={styles.details}>Children: {children}</Text>
        <Text style={styles.details}>Infants: {infants}</Text>
      </View>

      {/* Departure Flight Info */}
      <View style={styles.flightSection}>
        <Text style={styles.subHeading}>Departure Flight:</Text>
        <Text style={styles.details}>Flight ID: {departureFlight.id}</Text>
        <Text style={styles.details}>
          Departure Time: {departureFlight.startTime}
        </Text>
        <Text style={styles.details}>
          Arrival Time: {departureFlight.endTime}
        </Text>
        <Text style={styles.details}>
          Departure Airport: {fromAirport.Name}
        </Text>
        <Text style={styles.details}>Arrival Airport: {toAirport.Name}</Text>
        <Text style={styles.details}>
          Flight Duration: {departureFlight.duration} hours
        </Text>
        {/* Add more flight details as needed */}
      </View>

      {/* Return Flight Info (if applicable) */}
      {tripType === "Round Trip" && (
        <View style={styles.flightSection}>
          <Text style={styles.subHeading}>Return Flight:</Text>
          <Text style={styles.details}>Flight ID: {returnFlight.id}</Text>
          <Text style={styles.details}>
            Departure Time: {returnFlight.departureTime}
          </Text>
          <Text style={styles.details}>
            Arrival Time: {returnFlight.arrivalTime}
          </Text>
          <Text style={styles.details}>
            Departure Airport: {returnFlight.departureAirport}
          </Text>
          <Text style={styles.details}>
            Arrival Airport: {returnFlight.arrivalAirport}
          </Text>
          <Text style={styles.details}>
            Flight Duration: {returnFlight.duration} hours
          </Text>
          {/* Add more flight details as needed */}
        </View>
      )}

      {/* Total Price */}
      <Text style={styles.totalPrice}>
        Total Price: ₹{totalPrice.toFixed(2)}
      </Text>
    </View>
  );
};

// StyleSheet for better layout
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
  travelersSection: {
    marginTop: 20,
  },
  flightSection: {
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#2E8B57",
  },
});

export default PassengerDetailScreen;
