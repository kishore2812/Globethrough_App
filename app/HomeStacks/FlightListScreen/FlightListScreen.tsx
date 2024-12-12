import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import FlightLoadingScreen from "../../FlightLoadingScreen"; // Importing custom loading screen
import FeatherIcon from "react-native-vector-icons/Feather"; // For Feather Icons
import styles from "./FlightListScreenStyles";

const FlightListScreen = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    route.params.departureDate
  ); // State to track selected date
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<string>("Low-High");
  const [selectedDepartureFlightId, setSelectedDepartureFlightId] = useState<
    string | null
  >(null);

  const [selectedReturnFlightId, setSelectedReturnFlightId] = useState<
    string | null
  >(null);
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  const {
    from,
    to,
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

  // Initialize selectedDate with the departure date when the component is mounted
  useEffect(() => {
    if (departureDateObj) {
      const formattedDepartureDate = departureDateObj.toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
        }
      );
      // Set selected date to the formatted departure date
    }
  }, [departureDateObj]);

  if (isLoading) {
    return <FlightLoadingScreen />; // Render the custom loading screen
  }

  // Calculate total number of travelers
  const totalTravelers = adults + children + infants;

  // Function to format date as "Month Day" (e.g., "September 25")
  const formatDate = (date: Date | null): string => {
    if (!date) {
      date = new Date(); // If date is null, set it to today's date
    }
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Generate a list of dates starting from the departure date
  const generateDateList = (startDate: Date, numDays: number = 7) => {
    const dates = [];
    for (let i = 0; i < numDays; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      dates.push(formatDate(nextDate));
    }
    return dates;
  };

  // Get the next 7 days starting from the departure date
  const dateList = departureDateObj ? generateDateList(departureDateObj) : [];

  const handleDateSelect = (date: string) => {
    setSelectedDate(date); // Update the selected date when a user taps on a date
  };
  // Format the departure date for displaying in the header
  const formattedDepartureDate = departureDateObj
    ? departureDateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
    : "N/A";

  // Default empty string if startTime or endTime is undefined
  const format24HourTime = (time?: string) => {
    if (!time) return "00:00"; // Return a default value if undefined
    return new Date(time).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const format12HourTime = (time?: string) => {
    if (!time) return "12:00 AM"; // Return a default value if undefined
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  interface Flight {
    id: string;
    flightNumber: string;
    startTime: string;
    endTime: string;
    price: number;
    duration: number;
    stops: number;
    nonstop: boolean;
    type: string; // "departure" or "return"
    flightLogo: any; // This could be ImageSourcePropType or a string if URL
  }

  // Filtered flight data for one-way and round-trip
  const flightData = [
    {
      id: "1",
      flightLogo: require("../../../assets/images/indigo_logo.png"), // Example flight logo URL
      flightNumber: "AB123",
      price: 10000,
      duration: 2, // Duration in hours
      nonstop: false, // Whether the flight is non-stop
      startTime: "2024-12-10T08:00:00", // ISO 8601 start time
      endTime: "2024-12-10T10:00:00", // ISO 8601 end time
      type: "departure", // 'departure' or 'return'
      stops: 2, // Number of stops
    },
    {
      id: "2",
      flightLogo: require("../../../assets/images/Akasa_Air_Logo.png"),
      flightNumber: "CD456",
      price: 15000,
      duration: 1.5,
      nonstop: false,
      startTime: "2024-12-10T12:00:00",
      endTime: "2024-12-10T13:30:00",
      type: "departure",
      stops: 1,
    },
    {
      id: "3",
      flightLogo: require("../../../assets/images/indigo_logo.png"),
      flightNumber: "CD456",
      price: 15000,
      duration: 2,
      nonstop: false,
      startTime: "2024-12-10T12:00:00",
      endTime: "2024-12-10T13:30:00",
      type: "return",
      stops: 1,
    },
    {
      id: "4",
      flightLogo: require("../../../assets/images/Flight_logo.png"),
      flightNumber: "CD456",
      price: 25000,
      duration: 1.5,
      nonstop: true,
      startTime: "2024-12-10T12:00:00",
      endTime: "2024-12-10T13:30:00",
      type: "return",
      stops: 0,
    },
    {
      id: "5",
      flightLogo: require("../../../assets/images/Akasa_Air_Logo.png"),
      flightNumber: "CD456",
      price: 50000,
      duration: 5,
      nonstop: false,
      startTime: "2024-12-10T14:00:00",
      endTime: "2024-12-10T17:30:00",
      type: "departure",
      stops: 2,
    },
    {
      id: "6",
      flightLogo: require("../../../assets/images/Flight_logo.png"), // Example flight logo URL
      flightNumber: "AB123",
      price: 10000,
      duration: 2, // Duration in hours
      nonstop: true, // Whether the flight is non-stop
      startTime: "2024-12-10T08:00:00", // ISO 8601 start time
      endTime: "2024-12-10T10:00:00", // ISO 8601 end time
      type: "departure", // 'departure' or 'return'
      stops: 0, // Number of stops
    },
    {
      id: "7",
      flightLogo: require("../../../assets/images/Flight_logo.png"), // Example flight logo URL
      flightNumber: "AB123",
      price: 16000,
      duration: 2, // Duration in hours
      nonstop: false, // Whether the flight is non-stop
      startTime: "2024-12-10T08:00:00", // ISO 8601 start time
      endTime: "2024-12-10T10:00:00", // ISO 8601 end time
      type: "departure", // 'departure' or 'return'
      stops: 1, // Number of stops
    },
    {
      id: "8",
      flightLogo: require("../../../assets/images/Flight_logo.png"), // Example flight logo URL
      flightNumber: "AB123",
      price: 14000,
      duration: 3, // Duration in hours
      nonstop: false, // Whether the flight is non-stop
      startTime: "2024-12-10T08:00:00", // ISO 8601 start time
      endTime: "2024-12-10T10:00:00", // ISO 8601 end time
      type: "return", // 'departure' or 'return'
      stops: 3, // Number of stops
    },
    {
      id: "9",
      flightLogo: require("../../../assets/images/indigo_logo.png"), // Example flight logo URL
      flightNumber: "AB123",
      price: 12000,
      duration: 6, // Duration in hours
      nonstop: false, // Whether the flight is non-stop
      startTime: "2024-12-10T08:00:00", // ISO 8601 start time
      endTime: "2024-12-10T10:00:00", // ISO 8601 end time
      type: "return", // 'departure' or 'return'
      stops: 2, // Number of stops
    },
  ];

  // Function to sort the flights based on the selected filter option
  const getSortedFlights = (flights: Flight[]) => {
    const sorted = [...flights]; // Copy the array to avoid direct mutation

    // Sorting logic based on selected filter
    switch (selectedFilterOption) {
      case "Low-High":
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0)); // Sort by price (Low to High)
      case "Fastest":
        return sorted.sort((a, b) => (a.duration || 0) - (b.duration || 0)); // Sort by duration (Fastest)
      case "Non-Stop":
        return sorted.sort((a, b) => (a.stops || 0) - (b.stops || 0)); // Sort by non-stop flights
      default:
        return sorted;
    }
  };

  // Determine the cheapest and fastest flight ids
  const getCheapestAndFastestFlightIds = (flights: Flight[]) => {
    if (flights.length === 0)
      return { cheapestFlightId: null, fastestFlightId: null };

    const cheapest = flights.reduce((min, flight) =>
      flight.price < min.price ? flight : min
    );
    const fastest = flights.reduce((min, flight) =>
      flight.duration < min.duration ? flight : min
    );

    return {
      cheapestFlightId: cheapest.id,
      fastestFlightId: fastest.id,
    };
  };
  // Get sorted flights and filter only the departure ones
  const sortedDepartureFlights = getSortedFlights(
    flightData.filter((flight) => flight.type === "departure")
  );
  const sortedReturnFlights = getSortedFlights(
    flightData.filter((flight) => flight.type === "return")
  );

  const {
    cheapestFlightId: cheapestDepartureId,
    fastestFlightId: fastestDepartureId,
  } = getCheapestAndFastestFlightIds(sortedDepartureFlights);
  const {
    cheapestFlightId: cheapestReturnId,
    fastestFlightId: fastestReturnId,
  } = getCheapestAndFastestFlightIds(sortedReturnFlights);

  const handleOptionSelect = (option: string) => {
    setSelectedFilterOption(option);
  };

  // Define types for the function parameters
  const handleSelectFlight = (id: string, type: "departure" | "return") => {
    if (type === "departure") {
      setSelectedDepartureFlightId(id); // This should be of type string | null
    } else {
      setSelectedReturnFlightId(id); // This should also be of type string | null
    }
  };

  const selectedDepartureFlight = flightData.find(
    (flight) => flight.id === selectedDepartureFlightId
  );
  const selectedReturnFlight = flightData.find(
    (flight) => flight.id === selectedReturnFlightId
  );

  const baseFare =
    tripType === "roundTrip"
      ? (selectedDepartureFlight?.price || 0) +
        (selectedReturnFlight?.price || 0)
      : selectedDepartureFlight?.price || 0;

  // Calculate tax as 20% of the base fare
  const tax = baseFare * 0.2;

  // Calculate total price as base fare + tax
  const totalPriceWithTax = baseFare + tax;

  //for toggling chevron up and down in price view breakup
  const togglePriceBreakup = () => {
    setShowPriceBreakup(!showPriceBreakup);
  };
  const screenHeight = Dimensions.get("window").height;

  const bottomPadding = screenHeight * 0.25;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Title in center */}
        <View style={styles.headerCenter}>
          {from && from.IATA && from.City && to && to.IATA && to.City ? (
            <>
              <Text style={styles.cityText}>
                {from.IATA} {from.City}
                <Text style={styles.arrow}>→</Text> {to.IATA} {to.City}
              </Text>

              {/* Details section below city and IATA, aligned horizontally */}
              <View style={styles.detailsContainer}>
                <Text style={styles.detail}>{formattedDepartureDate} .</Text>
                <Text style={styles.detail}> {totalTravelers} Travelers .</Text>
                <Text style={styles.detail}> {selectedClass}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.cityText}>City Information Unavailable</Text>
          )}
        </View>

        {/* Edit button to toggle visibility */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Horizontal scroll of dates */}
      <View style={styles.dateScrollContainer}>
        <FlatList
          data={dateList}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false} // Hide the horizontal scroll bar
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDateSelect(item)}>
              <View
                style={[
                  styles.dateItem,
                  {
                    opacity: item === selectedDate ? 1 : 0.7, // Opacity for selected vs non-selected date
                  },
                ]}
              >
                <Text style={styles.dateText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Filter/Sort Options below the selected dates */}
      <View style={styles.filterContainer}>
        {["Low-High", "Fastest", "Non-Stop"].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setSelectedFilterOption(option)}
            style={[
              styles.filterOption,
              selectedFilterOption === option && styles.selectedFilterOption,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilterOption === option && styles.selectedFilterText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Flight List */}
      <View style={styles.flightListContainer}>
        {tripType === "oneWay" ? (
          // Display flights in a full-width card for one-way trip
          <FlatList
            data={sortedDepartureFlights} // sortedDepartureFlights should be sorted based on selected filter
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              // Determine labels for one-way trip
              const isCheapest = item.id === cheapestDepartureId;
              const isFastest = item.id === fastestDepartureId;
              const label =
                isCheapest && isFastest
                  ? "Cheap/Fast"
                  : isCheapest
                  ? "Cheapest"
                  : isFastest
                  ? "Fastest"
                  : null;

              // Check if the current item is selected
              const isSelected = item.id === selectedDepartureFlightId;

              return (
                <TouchableOpacity
                  onPress={() => handleSelectFlight(item.id, "departure")}
                  style={[
                    styles.flightCard,
                    isSelected && { borderColor: "#01493E", borderWidth: 2 }, // Highlight selected card
                  ]}
                >
                  {/* Top Section */}
                  <View style={styles.topSection}>
                    <View style={styles.imageTextContainer}>
                      <Image
                        source={item.flightLogo}
                        style={styles.flightLogo}
                      />
                      <Text style={styles.flightNumber}>
                        {item.flightNumber}
                      </Text>
                    </View>
                    {label && (
                      <Text style={styles.Cheap_Fastlabel}>{label}</Text>
                    )}
                  </View>

                  {/* Bottom Section */}
                  <View style={styles.bottomSection}>
                    <View style={styles.oneWay_column}>
                      <Text style={styles.top_timeText}>
                        {format24HourTime(item.startTime)}
                      </Text>
                      <Text style={styles.bottom_timeText}>
                        ({format12HourTime(item.startTime)})
                      </Text>
                    </View>

                    <View style={[styles.oneWay_column, styles.middleColumn]}>
                      <Text style={styles.durationText}>
                        {item.duration} hr
                      </Text>
                      <Text style={styles.stopsText}>
                        {item.stops === 0 ? "Non" : item.stops} Stop
                      </Text>
                    </View>

                    <View style={styles.oneWay_column}>
                      <Text style={styles.top_timeText}>
                        {format24HourTime(item.endTime)}
                      </Text>
                      <Text style={styles.bottom_timeText}>
                        ({format12HourTime(item.endTime)})
                      </Text>
                    </View>

                    <View style={styles.oneWay_column}>
                      <Text style={styles.priceText}>₹{item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: bottomPadding, // This ensures 40-50% screen space is blank after the last card
            }}
            ListFooterComponent={<View style={{ height: bottomPadding }} />}
          />
        ) : (
          // Display flights in two columns for round trip
          <View style={styles.flightColumnsRoundTrip}>
            {/* Departure Flights Column */}
            <View style={styles.columnRoundTrip}>
              <Text style={styles.columnHeaderRoundTrip}>
                {from.IATA} <Text style={styles.arrow}>→</Text> {to.IATA}
              </Text>
              <FlatList
                data={sortedDepartureFlights} // sortedDepartureFlights should be sorted based on selected filter
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  // Labels for Departure Flights
                  const isCheapest = item.id === cheapestDepartureId;
                  const isFastest = item.id === fastestDepartureId;
                  const label =
                    isCheapest && isFastest
                      ? "Cheap/Fast"
                      : isCheapest
                      ? "Cheapest"
                      : isFastest
                      ? "Fastest"
                      : null;

                  return (
                    <TouchableOpacity
                      onPress={() => handleSelectFlight(item.id, "departure")}
                      style={[
                        styles.flightCardRoundTrip,
                        item.id === selectedDepartureFlightId && {
                          borderColor: "#01493E",
                          borderWidth: 2,
                        }, // Highlight selected card
                      ]}
                    >
                      {/* Top Right Label */}
                      {label && (
                        <Text style={styles.cheapFastLabelRoundTrip}>
                          {label}
                        </Text>
                      )}

                      {/* Flight Logo and Price Section */}
                      <View style={styles.flightHeaderRoundTrip}>
                        <View style={styles.logoContainerRoundTrip}>
                          <Image
                            source={item.flightLogo}
                            style={styles.flightLogoRoundTrip}
                          />
                          <Text style={styles.flightNumberRoundTrip}>
                            {item.flightNumber}
                          </Text>
                        </View>
                        <View style={styles.priceContainerRoundTrip}>
                          <Text style={styles.priceTextRoundTrip}>
                            ₹{item.price}
                          </Text>
                        </View>
                      </View>

                      {/* Flight Details Section */}
                      <View style={styles.flightDetailsRoundTrip}>
                        {/* Start Time */}
                        <View style={styles.flightDetailsColumnRoundTrip}>
                          <Text style={styles.time24TextRoundTrip}>
                            {format24HourTime(item.startTime)}
                          </Text>
                          <Text style={styles.time12TextRoundTrip}>
                            ({format12HourTime(item.startTime)})
                          </Text>
                        </View>

                        {/* Duration and Stops */}
                        <View style={styles.flightDetailsColumnRoundTrip}>
                          <Text style={styles.durationTextRoundTrip}>
                            {item.duration} hr
                          </Text>
                          <Text style={styles.stopsTextRoundTrip}>
                            {item.stops === 0 ? "Non" : item.stops} Stop
                          </Text>
                        </View>

                        {/* End Time */}
                        <View style={styles.flightDetailsColumnRoundTrip}>
                          <Text style={styles.time24TextRoundTrip}>
                            {format24HourTime(item.endTime)}
                          </Text>
                          <Text style={styles.time12TextRoundTrip}>
                            ({format12HourTime(item.endTime)})
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: bottomPadding,
                }}
                ListFooterComponent={<View style={{ height: bottomPadding }} />}
              />
            </View>

            {/* Return Flights Column */}
            <View style={styles.columnRoundTrip}>
              <Text style={styles.columnHeaderRoundTrip}>
                {to.IATA} <Text style={styles.arrow}>→</Text> {from.IATA}
              </Text>
              <FlatList
                data={sortedReturnFlights} // sortedReturnFlights should be sorted based on selected filter
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  // Labels for Return Flights
                  const isCheapest = item.id === cheapestReturnId;
                  const isFastest = item.id === fastestReturnId;
                  const label =
                    isCheapest && isFastest
                      ? "Cheap/Fast"
                      : isCheapest
                      ? "Cheapest"
                      : isFastest
                      ? "Fastest"
                      : null;

                  return (
                    <TouchableOpacity
                      onPress={() => handleSelectFlight(item.id, "return")}
                      style={[
                        styles.flightCardRoundTrip, // Same style for return flight card
                        item.id === selectedReturnFlightId && {
                          borderColor: "#01493E",
                          borderWidth: 2,
                        }, // Highlight selected card
                      ]}
                    >
                      {/* Top Right Label for Return Flights */}
                      {label && (
                        <Text style={styles.cheapFastLabelRoundTrip}>
                          {label}
                        </Text>
                      )}

                      {/* Flight Logo and Price Section for Return Flights */}
                      <View style={styles.flightHeaderRoundTrip}>
                        <View style={styles.logoContainerRoundTrip}>
                          <Image
                            source={item.flightLogo}
                            style={styles.flightLogoRoundTrip}
                          />
                          <Text style={styles.flightNumberRoundTrip}>
                            {item.flightNumber}
                          </Text>
                        </View>
                        <View style={styles.priceContainerRoundTrip}>
                          <Text style={styles.priceTextRoundTrip}>
                            ₹{item.price}
                          </Text>
                        </View>
                      </View>

                      {/* Flight Details Section for Return Flights */}
                      <View style={styles.flightDetailsRoundTrip}>
                        {/* Start Time */}
                        <View style={styles.flightDetailsColumnRoundTrip}>
                          <Text style={styles.time24TextRoundTrip}>
                            {format24HourTime(item.startTime)}
                          </Text>
                          <Text style={styles.time12TextRoundTrip}>
                            ({format12HourTime(item.startTime)})
                          </Text>
                        </View>

                        {/* Duration and Stops */}
                        <View style={styles.flightDetailsColumnRoundTrip}>
                          <Text style={styles.durationTextRoundTrip}>
                            {item.duration} hr
                          </Text>
                          <Text style={styles.stopsTextRoundTrip}>
                            {item.stops === 0 ? "Non" : item.stops} Stop
                          </Text>
                        </View>

                        {/* End Time */}
                        <View style={styles.flightDetailsColumnRoundTrip}>
                          <Text style={styles.time24TextRoundTrip}>
                            {format24HourTime(item.endTime)}
                          </Text>
                          <Text style={styles.time12TextRoundTrip}>
                            ({format12HourTime(item.endTime)})
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: bottomPadding,
                }}
                ListFooterComponent={<View style={{ height: bottomPadding }} />}
              />
            </View>
          </View>
        )}
      </View>

      {/* After Selecting Flights */}
      {(tripType === "oneWay" && selectedDepartureFlightId) ||
      (tripType === "roundTrip" &&
        selectedDepartureFlightId &&
        selectedReturnFlightId) ? (
        <View style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <View style={styles.leftColumn}>
              {/* Display the price only if both flights are selected in roundtrip or just the departure in one-way */}
              <Text style={styles.ModalpriceText}>₹{baseFare.toFixed(2)}</Text>

              {/* Toggle Price Breakup */}
              <TouchableOpacity onPress={togglePriceBreakup}>
                <View style={styles.viewBreakupContainer}>
                  <Text style={styles.viewBreakupText}>View Breakup</Text>
                  <FeatherIcon
                    name={showPriceBreakup ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="#000"
                  />
                </View>
              </TouchableOpacity>

              {/* Show price breakup if selected */}
              {showPriceBreakup && (
                <View style={styles.breakupDetails}>
                  <View style={styles.breakupRow}>
                    <Text style={styles.breakupLabel}>Base Fare :</Text>
                  </View>
                  <View style={styles.breakupRow}>
                    <Text style={styles.breakupLabel}>Tax :</Text>
                  </View>
                  <View style={styles.breakupRow}>
                    <Text style={styles.breakupLabelTotal}>Total Amount :</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Right Column with Continue Button */}
            <View style={styles.rightColumn}>
              {/* Only show instruction if the round-trip is incomplete */}

              {/* Show continue button only when both flights are selected for round-trip */}
              {((tripType === "roundTrip" &&
                selectedDepartureFlightId &&
                selectedReturnFlightId) ||
                (tripType === "oneWay" && selectedDepartureFlightId)) && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("TicketDetailScreen", {
                      departureFlight: selectedDepartureFlight,
                      returnFlight: selectedReturnFlight,
                      tripType: tripType, // Passing the selected trip type
                      fromAirport: from,
                      toAirport: to,
                      adults: adults,
                      children: children,
                      infants: infants,
                      selectedClass: selectedClass,
                      departureDate: departureDate,
                      returnDate: returnDate,
                      selectedOption: selectedOption,
                    });
                  }}
                  style={styles.continueButton}
                >
                  <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
              )}

              {/* Price Breakup Below Continue Button */}
              {showPriceBreakup && (
                <View style={styles.pricebreakupDetails}>
                  {/* Base Fare */}
                  <View style={styles.pricebreakupRow}>
                    <Text style={styles.breakupAmount}>
                      ₹{baseFare.toFixed(2)}
                    </Text>
                  </View>

                  {/* Tax */}
                  <View style={styles.pricebreakupRow}>
                    <Text style={styles.breakupAmount}>₹{tax.toFixed(2)}</Text>
                  </View>

                  {/* Total */}
                  <View style={styles.pricebreakupRow}>
                    <Text style={styles.breakupAmountTotal}>
                      ₹{totalPriceWithTax.toFixed(2)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      ) : (
        tripType === "roundTrip" && (
          <View style={styles.bottomModal}>
            <View style={styles.modalContent}>
              <Text style={styles.instructionText}>
                Please select both a departure and return flight
              </Text>
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default FlightListScreen;
