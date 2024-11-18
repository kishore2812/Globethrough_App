import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/Feather";
import styles from "./HomeScreenStyles";
import { AntDesign } from "@expo/vector-icons";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import airportData from "./aiport.json";

type Airport = {
  ID: number;
  Name: string;
  City: string;
  Country: string;
  IATA: string;
  ICAO: string;
  Latitude: number;
  Longitude: number;
  Altitude: number;
  Timezone: number;
  Category: string;
  "Timezone Name": string;
  Type: string;
  Source: string;
};

const HomeScreen: React.FC = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateType, setSelectedDateType] = useState<
    "departure" | "return"
  >("departure");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [tripType, setTripType] = useState<"oneWay" | "roundTrip">("oneWay");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAirportModal, setShowAirportModal] = useState(false);
  const [selectedAirportType, setSelectedAirportType] = useState<"from" | "to">(
    "from"
  );
  const [fromAirport, setFromAirport] = useState<string>("Select Airport");
  const [toAirport, setToAirport] = useState<string>("Select Airport");
  const [defaultAirportsCount] = useState(10);
  const [showMoreAirports, setShowMoreAirports] = useState(false);
  const displayedAirports = showMoreAirports
    ? filteredAirports
    : filteredAirports.slice(0, defaultAirportsCount);

  const [isTravelerModalVisible, setTravelerModalVisible] = useState(false);
  const [isClassModalVisible, setClassModalVisible] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");

  //for responive
  const { width, height } = Dimensions.get("window");

  //for travelller popup
  const handleTravelerModalToggle = () => {
    setTravelerModalVisible(!isTravelerModalVisible);
  };
  //for class popup
  const handleClassModalToggle = () => {
    setClassModalVisible(!isClassModalVisible);
  };

  //for plus button inside traveller popup
  const handleIncrement = (type: "adults" | "children" | "infants") => {
    if (type === "adults") {
      setAdults(adults + 1);
      setIsAdultsValid(adults + 1 > 0); // Update validation after increment
    } else if (type === "children") {
      setChildren(children + 1);
    } else if (type === "infants") {
      setInfants(infants + 1);
    }
  };

  //for minus button inside traveller popup
  const handleDecrement = (type: "adults" | "children" | "infants") => {
    if (type === "adults" && adults > 0) setAdults(adults - 1);
    else if (type === "children" && children > 0) setChildren(children - 1);
    else if (type === "infants" && infants > 0) setInfants(infants - 1);
  };

  //for flight search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAirports([]); // Clear airports if search query is empty
      return;
    }

    // Filter airports from the imported JSON data
    const filtered = airportData.filter((airport: Airport) => {
      // Explicitly type airport as Airport
      const searchLower = searchQuery.toLowerCase();
      // Only include airports where IATA is not "\\N"
      if (airport.IATA === "\\N") {
        return false; // Skip this airport
      }
      return (
        airport.Name.toLowerCase().includes(searchLower) ||
        airport.City.toLowerCase().includes(searchLower) ||
        airport.Country.toLowerCase().includes(searchLower) ||
        airport.IATA.toLowerCase().includes(searchLower) ||
        airport.ICAO.toLowerCase().includes(searchLower)
      );
    });

    setFilteredAirports(filtered);
  }, [searchQuery]);

  // Handle airport selection, explicitly typing airportName as a string
  const handleAirportSelect = (airportName: string): void => {
    if (selectedAirportType === "from") {
      setFromAirport(airportName);
      setIsFromAirportValid(airportName !== "Select Airport");
    } else {
      setToAirport(airportName);
      setIsToAirportValid(airportName !== "Select Airport");
    }
    setShowAirportModal(false);
    setSearchQuery(""); // Clear search query after selection
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "set" && selectedDate) {
      if (selectedDateType === "departure") {
        // Add a delay before setting the departure date
        setTimeout(() => {
          setDepartureDate(selectedDate);
        }, 100); // 1000ms delay (1 second)
      } else {
        setTimeout(() => {
          setReturnDate(selectedDate);
        }, 100);
      }
    }

    // Immediately hide the date picker after selecting the date
    setShowDatePicker(false);
  };

  const openDatePicker = (type: "departure" | "return") => {
    if (type === "return" && tripType === "oneWay") {
      return; // Prevent opening the return date picker if trip type is one way
    }
    setSelectedDateType(type);
    setShowDatePicker(true);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short" as const,
      month: "short" as const,
      day: "numeric" as const,
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleClassSelection = (cls: string) => {
    setSelectedClass(cls); // Set the selected class
    setClassModalVisible(false); // Close the modal after selection
    setIsClassValid(cls !== "");
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Function to handle button press and set selected option
  const handleOptionSelect = (option: string) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };

  //validation for selection of user fields
  const [isFromAirportValid, setIsFromAirportValid] = useState(true);
  const [isToAirportValid, setIsToAirportValid] = useState(true);
  const [isAdultsValid, setIsAdultsValid] = useState(true);
  const [isClassValid, setIsClassValid] = useState(true);

  const handlePress = () => {
    // Check if from and to airports are selected
    const isFromAirportSelected = fromAirport !== "Select Airport";
    const isToAirportSelected = toAirport !== "Select Airport";

    // Check if adults count is valid (greater than 0)
    const isAdultsValid = adults > 0;

    // Check if class is selected
    const isClassSelected = selectedClass !== "";

    // Set validation states
    setIsFromAirportValid(isFromAirportSelected);
    setIsToAirportValid(isToAirportSelected);
    setIsAdultsValid(isAdultsValid);
    setIsClassValid(isClassSelected);

    // If any validation fails, prevent proceeding
    if (
      !isFromAirportSelected ||
      !isToAirportSelected ||
      !isAdultsValid ||
      !isClassSelected
    ) {
      return; // Prevent further actions if any validation fails
    }

    // Proceed with other logic (e.g., navigation, form submission, etc.)
    console.log("All fields are valid! Proceeding with the action...");
  };

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

      <Animated.View
        style={[styles.bodyCard, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.tripOptions}>
          <Pressable
            style={[
              styles.tripButton,
              tripType === "oneWay" && styles.selectedTripButton,
            ]}
            onPress={() => setTripType("oneWay")}
          >
            <Text style={styles.tripButtonText}>One Way</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tripButton,
              tripType === "roundTrip" && styles.selectedTripButton,
            ]}
            onPress={() => setTripType("roundTrip")}
          >
            <Text style={styles.tripButtonText}>Round Trip</Text>
          </Pressable>
        </View>

        <View style={styles.dateRow}>
          {/* Departure Date Container */}
          <View style={styles.dateContainer}>
            <Text style={styles.floatingLabel}>Departure Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => openDatePicker("departure")}
            >
              <View>
                <Icon
                  name="calendar"
                  size={15}
                  color="#888"
                  style={{ marginRight: 8 }}
                />
              </View>
              <Text style={styles.dateText}>{formatDate(departureDate)}</Text>
            </TouchableOpacity>
          </View>

          {/* Return Date Container */}
          <View style={styles.dateContainer}>
            <Text style={styles.floatingLabel}>Return Date</Text>
            <TouchableOpacity
              style={[
                styles.dateInput,
                tripType === "oneWay" && styles.disabledDateInput, // Apply disabled style when tripType is "oneWay"
              ]}
              onPress={() => {
                if (tripType !== "oneWay") {
                  openDatePicker("return");
                }
              }}
              disabled={tripType === "oneWay"} // Disable the button if it's a one-way trip
            >
              <View>
                <Icon
                  name="calendar"
                  size={15}
                  color={tripType === "oneWay" ? "#d3d3d3" : "#888"} // Change icon color based on trip type
                  style={{ marginRight: 8 }}
                />
              </View>
              <Text style={styles.dateText}>{formatDate(returnDate)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={
              selectedDateType === "departure" ? departureDate : returnDate
            }
            mode="date"
            display="spinner"
            onChange={onDateChange}
            minimumDate={
              selectedDateType === "departure" ? new Date() : departureDate
            }
          />
        )}

        <Modal
          transparent={true}
          visible={showAirportModal}
          animationType="slide"
        >
          {/* Dismiss keyboard on touch outside */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Airport</Text>

                {/* Search Input */}
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Airports"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />

                {/* Airport List */}
                <ScrollView
                  style={styles.airportList}
                  keyboardShouldPersistTaps="handled" // Ensure touches are registered even with the keyboard open
                >
                  {displayedAirports.length > 0 ? (
                    displayedAirports.map((airport, index) => (
                      <TouchableOpacity
                        key={`${airport.IATA}-${index}`}
                        style={styles.airportItem}
                        onPress={() => {
                          handleAirportSelect(airport.Name); // Handle selection
                          Keyboard.dismiss(); // Optionally dismiss keyboard
                        }}
                      >
                        <Text style={styles.airportText}>
                          {airport.Name} ({airport.City}, {airport.Country})
                        </Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.noResultsText}>No airports found</Text>
                  )}
                </ScrollView>

                {/* Cancel Button */}
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAirportModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.locationCards}>
          {/* From Card */}
          <TouchableOpacity
            style={[
              styles.fromCard,
              !isFromAirportValid && {
                borderColor: "#C5012D",
                borderWidth: 1,
              },
            ]}
            onPress={() => {
              setSelectedAirportType("from");
              setShowAirportModal(true);
            }}
          >
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>From</Text>
              {!isFromAirportValid && (
                <AntDesign
                  name="exclamationcircleo"
                  style={styles.warning_icon}
                />
              )}
            </View>
            <Text
              style={styles.cardAirport}
              numberOfLines={1} // Restrict to a single line
              ellipsizeMode="tail" // Add "..." at the end if text is truncated
            >
              {fromAirport}
            </Text>
          </TouchableOpacity>

          {/* Icon Between Cards */}
          <Image
            source={require("../../assets/images/Route_icon.png")}
            style={styles.overlapIcon}
          />

          {/* To Card */}
          <TouchableOpacity
            style={[
              styles.toCard,
              !isToAirportValid && { borderColor: "#C5012D", borderWidth: 1 },
            ]}
            onPress={() => {
              setSelectedAirportType("to");
              setShowAirportModal(true);
            }}
          >
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>To</Text>
              {!isToAirportValid && (
                <AntDesign
                  name="exclamationcircleo"
                  style={styles.warning_icon}
                />
              )}
            </View>
            <Text
              style={styles.cardAirport}
              numberOfLines={1} // Restrict to a single line
              ellipsizeMode="tail" // Add "..." at the end if text is truncated
            >
              {toAirport}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passengerClassContainer}>
          <View style={styles.passengerRow}>
            <TouchableOpacity
              style={[
                styles.passengerCard,
                !isAdultsValid && { borderColor: "#C5012D", borderWidth: 1 }, // Red border if invalid
              ]}
              onPress={handleTravelerModalToggle}
            >
              <Text style={styles.passengerLabel}>
                Travelers{" "}
                {!isAdultsValid && (
                  <AntDesign
                    name="exclamationcircleo"
                    size={10}
                    color="#C5012D"
                  />
                )}
              </Text>

              <Text style={styles.passengerCount}>
                {adults} Ad, {children} Ch, {infants} In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.classCard,
                !isClassValid && { borderColor: "#C5012D", borderWidth: 1 }, // Red border if invalid
              ]}
              onPress={handleClassModalToggle}
            >
              <Text style={styles.classLabel}>
                Class{" "}
                {!isClassValid && (
                  <AntDesign
                    name="exclamationcircleo"
                    size={10}
                    color="#C5012D"
                  />
                )}
              </Text>
              <Text style={styles.classSelection}>
                {selectedClass || "Select Class"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Traveler Modal */}
          <Modal
            visible={isTravelerModalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.travelerModalContainer}>
                {/* Close Arrow at the Top */}
                <TouchableOpacity
                  style={styles.closeArrowContainer}
                  onPress={handleTravelerModalToggle}
                >
                  <Icon
                    name="arrow-left"
                    size={30}
                    color="#000"
                    style={styles.closeArrowImage}
                  />
                </TouchableOpacity>
                <Text style={styles.travelerModalTitle}>Select Travelers</Text>

                {/* Adults Counter */}
                <View style={styles.travelerOptionContainer}>
                  <View>
                    <Text style={styles.travelerOptionText}>Adults</Text>
                    <Text style={styles.ageDescription}>12+ Years</Text>
                  </View>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleDecrement("adults")}
                    >
                      <Text style={styles.minusButton}>—</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{adults}</Text>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleIncrement("adults")}
                    >
                      <Text style={styles.minusButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Children Counter */}
                <View style={styles.travelerOptionContainer}>
                  <View>
                    <Text style={styles.travelerOptionText}>Children</Text>
                    <Text style={styles.ageDescription}>2-12 Years</Text>
                  </View>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleDecrement("children")}
                    >
                      <Text style={styles.minusButton}>—</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{children}</Text>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleIncrement("children")}
                    >
                      <Text style={styles.minusButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Infants Counter */}
                <View style={styles.travelerOptionContainer}>
                  <View>
                    <Text style={styles.travelerOptionText}>Infants</Text>
                    <Text style={styles.ageDescription}>Below 2 Years</Text>
                  </View>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleDecrement("infants")}
                    >
                      <Text style={styles.minusButton}>—</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{infants}</Text>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleIncrement("infants")}
                    >
                      <Text style={styles.minusButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleTravelerModalToggle}
                >
                  <Text style={styles.closeButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Class Modal */}
          <Modal
            visible={isClassModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClassModalToggle} // Close modal on Android back press
          >
            <View style={styles.modalOverlay1}>
              <View style={styles.modalContent1}>
                <Text style={styles.modalTitle1}>Select Class</Text>
                {["Economy", "Business", "First"].map((cls) => (
                  <TouchableOpacity
                    key={cls}
                    onPress={() => handleClassSelection(cls)} // Set class when an option is selected
                    style={styles.modalOption1}
                  >
                    {/* RadioButton for each class */}
                    <RadioButton
                      value={cls}
                      status={selectedClass === cls ? "checked" : "unchecked"} // Check if this option is selected
                      onPress={() => handleClassSelection(cls)}
                      color="#0B3E36" // Handle radio button press
                    />
                    <Text style={styles.classOption1}>{cls}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>

        <View>
          {/* Heading */}
          <Text style={styles.heading}>Special Fare Options</Text>

          {/* Fare Option Buttons / Cards */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "Option 1" && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect("Option 1")}
            >
              <Text style={styles.optionText}>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "Option 2" && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect("Option 2")}
            >
              <Text style={styles.optionText}>Senior Citizen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "Option 3" && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect("Option 3")}
            >
              <Text style={styles.optionText}>Armed Force</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Search Flights</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;
