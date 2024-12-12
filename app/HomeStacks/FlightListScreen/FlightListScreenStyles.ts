import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    backgroundColor: "#01493E",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.1, // 10% of screen height
    paddingHorizontal: width * 0.05, // 5% of screen width for padding
  },
  headerCenter: {
    alignItems: "center",
    flex: 1,
  },
  cityText: {
    color: "#fff",
    fontSize: width * 0.04, // Responsive font size based on screen width
    fontWeight: "bold",
    marginBottom: 3, // Adds some space between city text and the details
  },
  arrow: {
    fontSize: 24, // Larger arrow size
    marginHorizontal: 10, // Space around the arrow
  },
  detailsContainer: {
    flexDirection: "row", // Align the details horizontally
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", // Allows wrapping if needed
  },
  detail: {
    opacity: 0.7,
    color: "#fff",
    fontSize: width * 0.03, // Responsive font size based on screen width
    marginLeft: width * 0.01, // Responsive spacing between the details
    marginRight: width * 0.01, // Responsive spacing between the details
  },

  dateScrollContainer: {
    backgroundColor: "#01493E",
    paddingTop: height * 0.01, // Responsive top padding
    paddingBottom: height * 0.01, // Responsive bottom padding
    marginBottom: 1,
    paddingHorizontal: width * 0.03, // Responsive horizontal padding
  },

  dateItem: {
    marginRight: width * 0.04, // Responsive margin based on screen width
    alignItems: "center",
    justifyContent: "center",
  },

  dateText: {
    fontSize: width * 0.03, // Responsive font size based on screen width
    fontWeight: "bold",
    color: "white",
  },

  filterContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: width * 0.05, // Responsive horizontal padding
    paddingVertical: height * 0.02, // Responsive vertical padding
    borderBottomWidth: 1,
    borderColor: "rgba(19, 19, 19, 0.3)", // Border with opacity
  },

  filterOption: {
    paddingHorizontal: width * 0.05, // Responsive horizontal padding
    paddingVertical: height * 0.01, // Responsive vertical padding
    borderRadius: 25,
    backgroundColor: "#fff",
  },

  selectedFilterOption: {
    backgroundColor: "#01493E", // Highlight selected option
  },
  filterText: {
    color: "#333",
  },
  selectedFilterText: {
    color: "#fff", // White text for selected option
  },

  flightListContainer: {
    marginTop: 2,
  },

  flightCard: {
    marginVertical: height * 0.01, // Responsive vertical margin
    marginHorizontal: width * 0.03, // Responsive horizontal margin
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingLeft: width * 0.01, // Responsive left padding
    paddingBottom: height * 0.02, // Responsive bottom padding
  },

  topSection: {
    flexDirection: "row", // Arrange elements in a row
    justifyContent: "space-between", // Space between left and right elements
    alignItems: "center", // Center align items vertically
  },
  imageTextContainer: {
    paddingLeft: width * 0.03, // Responsive left padding
    paddingVertical: height * 0.01, // Responsive vertical padding
    flexDirection: "column", // Stack image and text vertically
    alignItems: "center", // Align the text relative to the image
  },

  flightLogo: {
    width: width * 0.15, // Responsive width based on screen width
    height: height * 0.02, // Responsive height based on screen height
    resizeMode: "contain", // Maintain aspect ratio
  },

  flightNumber: {
    fontSize: width * 0.034, // Responsive font size based on screen width
    textAlign: "center", // Align text with image
    color: "#000", // Customize text color
  },

  Cheap_Fastlabel: {
    width: width * 0.3, // Responsive width based on screen width
    position: "absolute",
    margin: 0,
    right: 0,
    top: 0,
    backgroundColor: "#01493E",
    color: "#fff",
    paddingHorizontal: width * 0.04, // Responsive horizontal padding
    paddingVertical: height * 0.01, // Responsive vertical padding
    borderTopLeftRadius: 2, // Radius for the top-left corner
    borderTopRightRadius: 8, // Radius for the top-right corner
    borderBottomLeftRadius: 8, // Radius for the bottom-left corner
    borderBottomRightRadius: 2, // Radius for the bottom-right corner
    fontSize: width * 0.035, // Responsive font size based on screen width
    textAlign: "center",
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: height * 0.01, // Responsive top padding based on screen height
  },

  oneWay_column: {
    flex: 1,
    alignItems: "center",
  },
  middleColumn: {
    paddingHorizontal: width * 0.03, // Responsive horizontal padding based on screen width
  },

  bottom_timeText: {
    fontSize: width * 0.03, // Responsive font size based on screen width
    color: "#555",
  },

  top_timeText: {
    fontWeight: "bold",
    fontSize: width * 0.04, // Responsive font size based on screen width
    color: "#555",
  },

  durationText: {
    fontSize: width * 0.035, // Responsive font size based on screen width
    color: "#777",
  },

  stopsText: {
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
    fontSize: width * 0.035, // Responsive font size based on screen width
    color: "#777",
  },

  priceText: {
    fontSize: width * 0.045, // Responsive font size based on screen width
    fontWeight: "bold",
    color: "#01493E",
    textAlign: "center",
  },

  //BottoM Price View Break Up
  bottomModal: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: width * 0.04, // Responsive padding based on screen width
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
  },

  modalContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  leftColumn: {
    flex: 1,
  },
  ModalpriceText: {
    fontSize: width * 0.05, // Responsive font size based on screen width
    fontWeight: "bold",
  },

  viewBreakupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.01, // Responsive margin top based on screen height
  },

  viewBreakupText: {
    color: "#000",
    opacity: 0.7,
    marginRight: width * 0.01, // Responsive marginRight based on screen width
  },

  breakupDetails: {
    marginTop: height * 0.01, // Responsive margin top based on screen height
  },
  pricebreakupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: height * 0.005, // Responsive vertical spacing based on screen height
  },

  breakupRow: {
    marginVertical: height * 0.005, // Responsive vertical margin based on screen height
  },

  breakupLabel: {
    fontSize: width * 0.035, // Responsive font size based on screen width
  },
  breakupLabelTotal: {
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  breakupAmount: {
    fontSize: width * 0.035, // Responsive font size based on screen width
    color: "#000", // Customize the amount color
  },
  breakupAmountTotal: {
    fontWeight: "bold",
    fontSize: width * 0.045, // Responsive font size based on screen width
    color: "#000", // Customize the amount color
  },

  rightColumn: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    marginLeft: width * 0.05, // Responsive left margin based on screen width
  },

  continueButton: {
    backgroundColor: "#01493E",
    paddingVertical: height * 0.02, // Responsive vertical padding based on screen height
    paddingHorizontal: width * 0.12, // Responsive horizontal padding based on screen width
    borderRadius: 2,
    marginBottom: height * 0.01, // Responsive bottom margin based on screen height
  },

  continueText: {
    fontSize: width * 0.04, // Responsive font size based on screen width
    color: "#fff",
    fontWeight: "bold",
  },

  pricebreakupDetails: {
    marginTop: 0,
  },

  priceBreakupContainer: {
    marginTop: height * 0.02, // Responsive margin top based on screen height
    alignItems: "center", // Center the price details in the column
  },

  instructionText: {
    fontSize: width * 0.03, // Responsive font size based on screen width
    color: "#555",
    textAlign: "center",
  },

  //RoundTrip Styles
  flightColumnsRoundTrip: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  columnRoundTrip: {
    flex: 1,
    margin: 1,
  },
  columnHeaderRoundTrip: {
    paddingLeft: width * 0.03, // Responsive padding based on screen width
    fontSize: width * 0.045, // Responsive font size based on screen width
    fontWeight: "600",
    color: "black",
    marginBottom: height * 0.01, // Responsive margin based on screen height
    textAlign: "left",
  },

  flightCardRoundTrip: {
    margin: width * 0.02, // Responsive margin based on screen width
    paddingBottom: height * 0.02, // Responsive padding based on screen height
    backgroundColor: "#fff",
    borderRadius: 2,
    elevation: 2,
    borderColor: "transparent",
  },

  // Top Right Label
  cheapFastLabelRoundTrip: {
    position: "absolute",
    top: height * 0.0, // Responsive top position based on screen height
    right: width * 0.0, // Responsive right position based on screen width
    backgroundColor: "#01493E",
    color: "#fff",
    paddingHorizontal: width * 0.04, // Responsive horizontal padding based on screen width
    paddingVertical: height * 0.005, // Responsive vertical padding based on screen height
    borderTopLeftRadius: 1, // Radius for the top-left corner
    borderTopRightRadius: 1, // Radius for the top-right corner
    borderBottomLeftRadius: 5, // Radius for the bottom-left corner
    borderBottomRightRadius: 1, // Radius for the bottom-right corner
    fontSize: width * 0.03, // Responsive font size based on screen width
    fontWeight: "bold",
  },

  // Flight Logo and Price Section
  flightHeaderRoundTrip: {
    marginTop: height * 0.03, // Responsive top margin based on screen height
    paddingRight: width * 0.03, // Responsive right padding based on screen width
    paddingLeft: width * 0.025, // Responsive left padding based on screen width
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.015, // Responsive bottom margin based on screen height
  },

  logoContainerRoundTrip: {
    alignItems: "center",
  },
  flightLogoRoundTrip: {
    width: width * 0.12, // Responsive width based on screen width
    height: height * 0.015, // Responsive height based on screen height
    resizeMode: "contain",
  },

  flightNumberRoundTrip: {
    fontSize: width * 0.03, // Responsive font size based on screen width
    color: "#333",
  },

  priceContainerRoundTrip: {
    alignItems: "center",
  },
  priceTextRoundTrip: {
    fontSize: width * 0.04, // Responsive font size based on screen width
    fontWeight: "bold",
    color: "#333",
  },

  // Flight Details Section
  flightDetailsRoundTrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  flightDetailsColumnRoundTrip: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  time24TextRoundTrip: {
    fontSize: width * 0.035, // Responsive font size based on screen width
    fontWeight: "bold",
    color: "#333",
  },

  time12TextRoundTrip: {
    fontSize: width * 0.025, // Responsive font size based on screen width
    color: "#777",
  },

  durationTextRoundTrip: {
    fontSize: width * 0.02, // Responsive font size based on screen width
    color: "#777",
  },

  stopsTextRoundTrip: {
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
    fontSize: width * 0.02, // Responsive font size based on screen width
    color: "#777",
  },
});

export default styles;
