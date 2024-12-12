import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  circleButton: {
    width: 20, // Set the size of the button
    height: 20,
    borderRadius: 10, // This makes it circular
    justifyContent: "center", // Centers the text horizontally
    alignItems: "center", // Centers the text vertically
    backgroundColor: "#fff", // Button background color
    borderWidth: 2, // Optional: border width
    borderColor: "#888", // Optional: border color
  },
  // Style for the text inside the button
  minusButton: {
    fontWeight: "bold",
    fontSize: RFValue(14), // Use RFValue for responsive font size
    color: "#888",
    lineHeight: RFValue(15),
  },

  shapeContainer: {
    flexDirection: "row",
    width: width * 0.33, // Responsive width (35% of screen width)
    height: RFValue(15), // Responsive height
    position: "absolute",
    top: RFValue(0), // Add some responsive top padding
    left: RFValue(0), // Add some responsive left padding
  },

  rectangle: {
    width: "90%", // Adjusts based on shapeContainer width
    height: "100%", // Matches shapeContainer height
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: RFValue(2), // Adds a slight rounding to the corners for a softer look
  },

  diamond: {
    marginLeft: RFValue(-7),
    marginTop: RFValue(2), // Adjust the diamond’s position responsively
    width: RFValue(12),
    height: RFValue(12),
    backgroundColor: "#0B3E36",
    transform: [{ rotate: "45deg" }], // Keeps the diamond rotated
    position: "relative",
  },

  bookmarkText: {
    fontFamily: "Satoshi-Bold",
    fontSize: RFValue(10), // Responsive font size
    // fontWeight: "bold",
    color: "#0B3E36",
  },

  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backgroundView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#01493E",
    zIndex: -10,
  },
  card: {
    width: "90%",
    height: 80,
    backgroundColor: "#0B3E36",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: "4%",
    marginTop: 15,
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 60,
    paddingBottom: 10,
  },
  cardImage: {
    width: 130,
    height: 24,
    position: "absolute",
    top: 0,
    left: 0,
  },
  cardContent: {
    fontFamily: "Satoshi-Bold",
    color: "white",
    fontSize: 12,
    marginTop: 30,
  },
  bodyCard: {
    width: width * 0.9, // 90% of the screen width
    maxHeight: height * 0.75, // Maximum height as 78% of the screen height
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: RFValue(20), // Responsive padding
    elevation: 10,
  },

  tripOptions: {
    width: width * 0.6, // 80% of the screen width
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RFValue(18), // Responsive marginBottom
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    padding: RFValue(5), // Responsive padding
    alignSelf: "center",
  },
  tripButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  selectedTripButton: {
    backgroundColor: "#F2F2F2",
    borderRadius: RFValue(5), // Responsive border radius
  },
  tripButtonText: {
    fontFamily: "Satoshi-Bold",
    fontWeight: "500",
    fontSize: RFValue(14), // Responsive font size
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  dateContainer: {
    flex: 1,
    position: "relative",
  },
  floatingLabel: {
    fontFamily: "Satoshi-Regular",
    position: "absolute",
    top: RFValue(-8), // Responsive top position
    left: RFValue(10), // Responsive left position
    backgroundColor: "#ffffff",
    paddingHorizontal: RFValue(5), // Responsive padding
    fontSize: RFValue(12), // Responsive font size
    color: "#888",
    zIndex: 1,
  },
  dateInput: {
    height: RFValue(50), // Responsive height
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: RFValue(5), // Responsive border radius
    paddingHorizontal: RFValue(10), // Responsive padding
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  dateText: {
    fontFamily: "Satoshi-Bold",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: RFValue(2), // Responsive padding
    fontSize: RFValue(11),
    fontWeight: "600", // Responsive font size
  },
  disabledDateInput: {
    opacity: 0.5, // Reduce opacity to show it's disabled
  },

  icon: {
    width: RFValue(14), // Responsive width
    height: RFValue(16), // Responsive height
    marginRight: RFValue(6), // Responsive margin
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  airportList: {
    maxHeight: "60%", // Limit height of the airport list
  },
  modalTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  airportItem: {
    paddingVertical: 10,
  },
  airportText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  cancelButtonText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
    color: "#000",
  },

  locationCards: {
    width: "100%", // Full width
    flexDirection: "column", // Stack the items vertically
    justifyContent: "space-between", // Distribute space evenly between the cards
    position: "relative", // For absolute positioning of the icon relative to this container
    marginBottom: 3,
    marginTop: 15,
  },
  fromCard: {
    width: "100%", // Take up 100% of the available width (responsive)
    backgroundColor: "#E9EBEB",
    borderRadius: 5,
    padding: RFValue(10), // Responsive padding
    marginBottom: RFValue(8), // Responsive margin bottom for spacing between cards
    justifyContent: "flex-start", // Align text to the left
    alignItems: "flex-start", // Align text to the left
  },
  toCard: {
    marginBottom: RFValue(18), // Responsive margin for spacing between cards
    width: "100%", // Takes up 100% of the available width
    backgroundColor: "#E9EBEB", // Light gray background color
    borderRadius: 5, // Rounded corners
    padding: RFValue(10), // Responsive padding
    justifyContent: "flex-start", // Align text/content to the top
    alignItems: "flex-start", // Align text/content to the left
  },
  cardTitle: {
    fontSize: RFValue(12), // Responsive font size
    fontWeight: "bold", // Bold text
    marginBottom: RFValue(5), // Responsive margin at the bottom
    color: "#666", // Lighter gray color for text
  },
  cardAirport: {
    fontSize: RFValue(14), // Responsive font size
    lineHeight: RFValue(16),
    fontWeight: "bold", // Bold text
  },
  overlapIcon: {
    position: "absolute", // Absolute position, but relative to container
    top: "50%", // Vertically center the icon between the cards
    left: "50%", // Horizontally center the icon
    marginLeft: -25, // Offset the icon by half its width
    marginTop: -25, // Offset the icon by half its height
    width: 30, // Icon width
    height: 30, // Icon height
    zIndex: 1, // Ensure icon stays on top of the cards
  },
  cardRow: {
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Align items vertically in the center
    justifyContent: "space-between", // Add space between elements
  },
  warning_icon: {
    color: "#C5012D",
    marginLeft: 4, // Space between text and icon
    fontSize: RFValue(10), // Responsive font size
    fontWeight: "bold", // Bold text
    marginBottom: RFValue(5), // Responsive margin at the bottom
  },
  searchInput: {
    fontFamily: "Satoshi-Bold",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  noResultsText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },

  passengerClassContainer: {
    marginTop: RFValue(3), // Responsive margin top
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-between", // Space out items evenly
  },
  passengerRow: {
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-between", // Space items evenly
    width: "100%", // Take full width of the parent container
    marginBottom: RFValue(1), // Optional margin for spacing between rows
  },

  passengerCard: {
    paddingVertical: RFValue(15),
    flex: 1, // Take up equal space in the row
    marginRight: RFValue(10), // Responsive margin on the right
    borderWidth: 1,
    borderColor: "#888", // Border color
    backgroundColor: "#fff", // White background
    borderRadius: 5, // Rounded corners
    paddingHorizontal: RFValue(10), // Responsive padding inside the card
    justifyContent: "flex-start", // Align content to the top
    alignItems: "flex-start", // Align content to the left
  },
  passengerCount: {
    fontFamily: "Satoshi-Bold",
    fontSize: RFValue(11), // Responsive font size for passenger count
    color: "#444", // Darker gray color for text
    fontWeight: "bold", // Bold text for emphasis
  },

  passengerLabel: {
    fontFamily: "Satoshi-Regular",
    position: "absolute", // Position relative to the parent container
    top: RFValue(-10), // Responsive positioning, negative value for overlap
    left: RFValue(10), // Responsive left margin for label
    backgroundColor: "#ffffff", // White background for label
    paddingHorizontal: RFValue(4), // Responsive padding for label
    fontSize: RFValue(12), // Responsive font size for label text
    color: "#888", // Light gray color for the label text
    zIndex: 1, // Ensure label appears above other content
  },
  classCard: {
    paddingVertical: RFValue(15),
    borderWidth: 1,
    borderColor: "#888", // Border color for the card
    flex: 1, // Ensure it takes equal space in a row
    backgroundColor: "#fff", // White background for the card
    borderRadius: 5, // Rounded corners
    padding: RFValue(10), // Responsive padding inside the card
    justifyContent: "flex-start", // Align content to the top
    alignItems: "flex-start", // Align content to the left
  },

  classSelection: {
    fontFamily: "Satoshi-Bold",
    fontSize: RFValue(11), // Responsive font size for class selection
    color: "#444", // Dark gray color for the text
    fontWeight: "bold", // Bold text to emphasize the selection
  },

  classLabel: {
    fontFamily: "Satoshi-Regular",
    position: "absolute", // Position relative to the parent container
    top: RFValue(-10), // Responsive overlap positioning
    left: RFValue(10), // Responsive left margin for label
    backgroundColor: "#ffffff", // White background to make label readable
    paddingHorizontal: RFValue(4), // Responsive horizontal padding
    fontSize: RFValue(12), // Responsive font size for label
    color: "#888", // Light gray color for the label text
    zIndex: 1, // Ensure label appears above other elements
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center", // Position the modal at the bottom
  },
  travelerModalContainer: {
    top: 80,
    width: "90%", // Full width with some margin
    height: height * 0.8, // 80% height of the screen
    backgroundColor: "#fff",
    padding: RFValue(20), // Responsive padding
    borderRadius: RFValue(15), // Responsive border radius
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: RFValue(4), // Responsive shadow radius
    elevation: RFValue(3), // Responsive elevation
    position: "absolute", // Make the modal position absolute
  },

  travelerModalTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: RFValue(18), // Responsive font size for the title
    fontWeight: "bold",
    marginBottom: RFValue(15), // Responsive margin
    textAlign: "left",
    color: "#333",
  },

  ageDescription: {
    fontFamily: "Satoshi-Regular",
    fontSize: RFValue(12), // Responsive font size
    color: "#888",
    marginBottom: RFValue(5), // Responsive margin bottom
  },

  travelerOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RFValue(2), // Responsive margin
    paddingVertical: RFValue(10), // Responsive vertical padding
  },

  travelerOptionText: {
    fontFamily: "Satoshi-Bold",
    fontSize: RFValue(14), // Responsive font size for option text
    color: "#333",
    fontWeight: "bold",
  },

  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  counterButtonImage: {
    width: RFValue(18), // Responsive width for the icon
    height: RFValue(18), // Responsive height for the icon
    resizeMode: "contain", // Keep the aspect ratio of the image
  },

  counterValue: {
    fontFamily: "Satoshi-Bold",
    fontWeight: "bold",
    fontSize: RFValue(18), // Responsive font size for the counter value
    marginHorizontal: RFValue(20), // Responsive horizontal margin
  },

  closeArrowContainer: {
    zIndex: 1,
    marginBottom: RFValue(20), // Responsive margin bottom
  },

  closeArrowImage: {
    width: RFValue(30), // Responsive width for the arrow image
    // Responsive height for the arrow image
  },

  closeButtonText: {
    fontFamily: "Satoshi-Bold",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    fontSize: RFValue(14), // Responsive font size
    borderRadius: RFValue(5), // Responsive border radius
  },

  closeButton: {
    padding: RFValue(15), // Responsive padding
    backgroundColor: "#01493E",
    borderRadius: RFValue(5), // Responsive border radius
    marginTop: RFValue(180), // Responsive margin top
    // Responsive margin bottom
  },

  modalOverlay1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark background
  },
  modalContent1: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "flex-start", // Align radio buttons and text to the left
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle1: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalOption1: {
    flexDirection: "row", // Align radio button and text horizontally
    alignItems: "center", // Align items in the center vertically
    width: "100%",
    marginBottom: 15, // Add space between options
  },
  classOption1: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    color: "#333",
    marginLeft: 10, // Space between the radio button and the text
  },

  heading: {
    fontFamily: "Satoshi-Bold",
    fontSize: RFValue(12), // Responsive font size for the heading
    fontWeight: "bold", // Bold font for the heading
    marginTop: RFValue(18), // Responsive margin top
    marginBottom: RFValue(12), // Responsive margin bottom
    textAlign: "left", // Align text to the left
  },

  optionsContainer: {
    flexDirection: "row", // Arrange options horizontally
    justifyContent: "space-between", // Space out the options equally
    flexWrap: "wrap", // Allow the options to wrap to the next line on smaller screens
  },

  optionCard: {
    flex: 1, // Each card takes equal width
    borderWidth: 1,
    borderColor: "#fff", // Border color for the cards
    alignItems: "center", // Align items to the center
    justifyContent: "center", // Center the content vertically and horizontally
    borderRadius: RFValue(4), // Responsive border radius
    marginHorizontal: RFValue(2), // Horizontal margin between cards
    paddingVertical: RFValue(12), // Vertical padding for spacing inside cards
    backgroundColor: "#f2f2f2",
  },

  optionText: {
    fontFamily: "Satoshi-Medium",
    fontWeight: "500",
    fontSize: RFValue(11), // Responsive font size for option text
  },

  selectedOption: {
    borderColor: "#01493E",
    backgroundColor: "#f2f2f2", // Light grey background for the selected option
  },
  button: {
    marginTop: RFValue(20), // Responsive margin top
    backgroundColor: "#01493E", // Green color for the button background
    paddingVertical: RFValue(14), // Responsive padding for the button
    borderRadius: RFValue(8), // Responsive border radius
    alignItems: "center", // Aligns text to the center of the button
  },

  buttonText: {
    fontFamily: "Satoshi-Bold",
    color: "#fff", // White text color
    fontSize: RFValue(14), // Responsive font size for button text
    fontWeight: "bold", // Bold font for emphasis
  },
});
export default styles;
