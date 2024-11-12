import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/Feather";
import styles from "./HomeScreenStyles";
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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import LoadingScreen from "../LoadingScreen";


interface Location {
  city?: string;
  region?: string;
  country?: string;
}


interface Airport {
  countryCode?: string;
  iata?: string;
  icao?: string;
  location?: Location;
  municipalityName?: string;
  name?: string;
  shortName?: string;
  timeZone?: string;
}

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
  const [isLoading, setIsLoading] = useState(true);

  //for responive
  const { width, height } = Dimensions.get("window");
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
  }, []);

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
    if (type === "adults") setAdults(adults + 1);
    else if (type === "children") setChildren(children + 1);
    else if (type === "infants") setInfants(infants + 1);
  };

 //for minus button inside traveller popup
  const handleDecrement = (type: "adults" | "children" | "infants") => {
    if (type === "adults" && adults > 0) setAdults(adults - 1);
    else if (type === "children" && children > 0) setChildren(children - 1);
    else if (type === "infants" && infants > 0) setInfants(infants - 1);
  };

  

  //for flight search
  const fetchAirports = async () => {
    if (searchQuery.trim() === "") {
        setAirports([]); // Clear airports if search query is empty
        return;
    }

    try {
        
        const response = await axios.get(
            `https://api.magicapi.dev/api/v1/aedbx/aerodatabox/airports/search/term`, 
            {
                headers: {
                    'x-magicapi-key': 'cm3dzxkal0008jt03tsedmu2a' // Replace with your actual API key
                },
                params: {
                    q: searchQuery,           // The search query
                    limit: 10,                // Limit of results
                    withFlightInfoOnly: false, // Optionally show airports with active flights only
                    withSearchByCode: true     // Allow search by IATA/ICAO code
                }
            }
        );

        // Handle the fetched data based on its structure
        const airportData = response.data?.items || []; // The airport data is in `items`
        setAirports(airportData); // Update state with fetched airport data

        // Filter airports immediately after fetching
        const filtered = airportData.filter((airport: Airport) => 
            airport.icao?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            airport.iata?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            airport.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            airport.municipalityName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            airport.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            airport.location?.region?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            airport.location?.country?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAirports(filtered);
    } catch (error) {
    
    }
};

// Call fetchAirports when searchQuery changes
useEffect(() => {
    fetchAirports();
}, [searchQuery]);

// for handling from and to airports buttons
const handleAirportSelect = (airportName: string) => {
    if (selectedAirportType === "from") {
        setFromAirport(airportName);
    } else {
        setToAirport(airportName);
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
    setSelectedDateType(type);
    setShowDatePicker(true);
  };

  

  const formatDate = (date: Date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleClassSelection = (cls: string) => {
    setSelectedClass(cls); // Set the selected class
    setClassModalVisible(false); // Close the modal after selection
  };




  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Function to handle button press and set selected option
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handlePress = () => {}; 

  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen at the bottom

  useEffect(() => {
    // Trigger the animation to slide the bodyCard up
    Animated.timing(slideAnim, {
      toValue: height * 0.0,
      duration: 500, // Duration of the slide (500ms)
      useNativeDriver: true, // Use native driver for performance
    }).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen /> 
      ) : (
    <View style={styles.container}>
      
      <View style={styles.backgroundView} />
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

      <Animated.View style={[styles.bodyCard, { transform: [{ translateY: slideAnim }] }]}>
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

          <View style={styles.dateContainer}>
            <Text style={styles.floatingLabel}>Return Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => openDatePicker("return")}
            >
              <View>
                <Icon
                  name="calendar"
                  size={15}
                  color="#888"
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
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Airport</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search Airports"
                value={searchQuery}
                onChangeText={setSearchQuery} // Update search query
              />

              <ScrollView style={styles.airportList}>
              {displayedAirports.length > 0 ? (
  displayedAirports.map((airport, index) => (
    <TouchableOpacity
      key={`${airport.iata}-${airport.location?.city || airport.municipalityName}-${airport.location?.country || airport.countryCode}-${index}`}
      style={styles.airportItem}
      onPress={() => handleAirportSelect(airport.name || "Unknown Airport")} // Provide fallback for name
    >
      <Text style={styles.airportText}>
        {airport.name || "Unknown Airport"} ({airport.location?.city || airport.municipalityName || "Unknown City"}, {airport.location?.country || airport.countryCode || "Unknown Country"})
      </Text>
    </TouchableOpacity>
  ))
) : (
  <Text style={styles.noResultsText}>No airports found</Text>
)}
              </ScrollView>

              {!showMoreAirports &&
                filteredAirports.length > defaultAirportsCount && (
                  <TouchableOpacity
                    onPress={() => setShowMoreAirports(true)}
                    style={styles.showMoreButton}
                  >
                    
                  </TouchableOpacity>
                )}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAirportModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View style={styles.locationCards}>
          <TouchableOpacity
            style={styles.fromCard}
            onPress={() => {
              setSelectedAirportType("from");
              setShowAirportModal(true);
            }}
          >
            <Text style={styles.cardTitle}>From</Text>
            <Text style={styles.cardAirport}>{fromAirport}</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/Route_icon.png")}
            style={styles.overlapIcon}
          />

          <TouchableOpacity
            style={styles.toCard}
            onPress={() => {
              setSelectedAirportType("to");
              setShowAirportModal(true);
            }}
          >
            <Text style={styles.cardTitle}>To</Text>
            <Text style={styles.cardAirport}>{toAirport}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passengerClassContainer}>
          <View style={styles.passengerRow}>
            <TouchableOpacity
              style={styles.passengerCard}
              onPress={handleTravelerModalToggle}
            >
              <Text style={styles.passengerLabel}>Travelers</Text>
              <Text style={styles.passengerCount}>
                {adults} Ad, {children} Ch, {infants} In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.classCard}
              onPress={handleClassModalToggle}
            >
              <Text style={styles.classLabel}>Class</Text>
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
  )}
  </View>
);
};
export default HomeScreen;