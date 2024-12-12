import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner_container: {
    padding: width * 0.035,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.05, // 5% of screen width for horizontal padding
    paddingTop: width * 0.02, // 2% of screen width for top padding
  },

  button: {
    paddingVertical: width * 0.03, // 5% of screen width for vertical padding
    marginBottom: width * 0.02, // 4% of screen width for bottom margin
  },

  oneWayCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: width * 0.03, // Responsive border radius (3% of screen width)
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: width * 0.05, // Responsive shadow radius (5% of screen width)
    elevation: 10,
    position: "relative", // Required for positioning the right bar
  },

  roundTripCard: {
    backgroundColor: "#f9f9f9", // A different background for round-trip
    borderRadius: width * 0.03, // Responsive border radius (3% of screen width)
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: width * 0.05, // Responsive shadow radius (5% of screen width)
    elevation: 9,
    position: "relative",
  },

  returnroundTripCard: {
    backgroundColor: "#f9f9f9", // A different background for round-trip
    borderRadius: width * 0.03, // Responsive border radius (3% of screen width)
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: width * 0.05, // Responsive shadow radius (5% of screen width)
    elevation: 10,
    position: "relative",
    marginTop: width * 0.05, // Responsive marginTop (5% of screen width)
  },

  rightBar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width * 0.05, // 5% of screen width for right bar width
    height: "100%",
    backgroundColor: "#01493E",
    borderTopRightRadius: width * 0.03, // Responsive border radius (3% of screen width)
    borderBottomRightRadius: width * 0.03, // Responsive border radius (3% of screen width)
  },

  row1: {
    paddingTop: width * 0.02, // 2% of screen width for top padding
    paddingLeft: width * 0.04, // 4% of screen width for left padding
    paddingRight: width * 0.08, // 8% of screen width for right padding
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: width * 0.03, // 3% of screen width for vertical margin
  },

  left: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  right: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  flightLogoLarge: {
    width: width * 0.15, // 15% of screen width for the logo width
  },

  flightNumber: {
    fontSize: width * 0.04, // 4% of screen width for font size
  },

  selectedClass: {
    fontSize: width * 0.045, // 4.5% of screen width for font size
    fontWeight: "bold",
    textAlign: "right",
  },

  // Row 2: Time Format (24-Hour and 12-Hour)
  row2: {
    paddingLeft: width * 0.04, // 4% of screen width for left padding
    paddingRight: width * 0.08, // 8% of screen width for right padding
    flexDirection: "row",
    marginVertical: width * 0.02, // 3% of screen width for vertical margin
  },

  StarttimeColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start", // Align time in columns
  },
  endtimeColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end", // Align time in columns
  },
  alignRight: {
    textAlign: "right",
  },
  Start_end_time24: {
    fontSize: width * 0.045, // 4.5% of screen width for font size
    fontWeight: "bold",
  },
  start_end_time12: {
    fontSize: width * 0.035, // 3.5% of screen width for font size
  },

  // Row 3: From Airport, Duration, Stops, and To Airport
  row3: {
    paddingLeft: width * 0.04, // 4% of screen width for left padding
    paddingRight: width * 0.08, // 8% of screen width for right padding
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: width * 0.03, // 3% of screen width for vertical margin
  },
  column: {
    flex: 1,
    alignItems: "flex-start",
  },
  center: {
    alignItems: "center",
  },
  boldText: {
    fontSize: width * 0.04, // 4% of screen width for font size
    fontWeight: "bold",
  },
  fromAirportName: {
    fontSize: width * 0.035, // 3.5% of screen width for font size
    color: "rgba(19, 19, 19, 0.7)", // 70% opacity for #131313 color
  },
  departure_duration: {
    fontSize: width * 0.035, // 3.5% of screen width for font size
  },
  departure_stops: {
    fontSize: width * 0.035, // 3.5% of screen width for font size
  },

  // Row 4: Departure Date and Time
  row4: {
    paddingLeft: width * 0.04, // 4% of screen width for left padding
    paddingRight: width * 0.08, // 8% of screen width for right padding
    marginVertical: width * 0.03, // 3% of screen width for vertical margin
  },
  departureDate: {
    fontSize: width * 0.04, // 4% of screen width for font size
    fontWeight: "bold",
  },
  departuredate_text: {
    fontSize: width * 0.035, // 3.5% of screen width for font size
    color: "rgba(19, 19, 19, 0.7)",
  },

  //Round Trip Styles
  rightBarRoundTrip: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width * 0.05, // 5% of screen width for right bar width
    height: "100%",
    backgroundColor: "#01493E",
    borderTopRightRadius: width * 0.03, // Responsive border radius (3% of screen width)
    borderBottomRightRadius: width * 0.03, // Responsive border radius (3% of screen width)
  },

  // Row 1: Flight Logo and Class for RoundTrip
  row1RoundTrip: {
    paddingTop: width * 0.02, // 2% of screen width for top padding
    paddingLeft: width * 0.04, // 4% of screen width for left padding
    paddingRight: width * 0.08, // 8% of screen width for right padding
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: width * 0.03, // 3% of screen width for vertical margin
  },
  leftRoundTrip: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  rightRoundTrip: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  flightLogoLargeRoundTrip: {
    marginBottom: 1,
    width: width * 0.15, // 15% of screen width for the logo width
  },
  flightNumberRoundTrip: {
    fontSize: width * 0.035, // 3.5% of screen width for font size
  },
  selectedClassRoundTrip: {
    fontSize: width * 0.045, // 4.5% of screen width for font size
    fontWeight: "bold",
    textAlign: "right",
  },

  // Row 2: Time Format (24-Hour and 12-Hour) for RoundTrip
  row2RoundTrip: {
    paddingLeft: width * 0.04, // 4% of screen width for left padding
    paddingRight: width * 0.09, // 9% of screen width for right padding
    flexDirection: "row",
  },
  StarttimeColumnRoundTrip: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start", // Align time in columns
  },
  endtimeColumnRoundTrip: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end", // Align time in columns
  },
  alignRightRoundTrip: {
    textAlign: "right",
  },
  Start_end_time24RoundTrip: {
    fontSize: width * 0.04, // 4% of screen width for font size
    fontWeight: "bold",
  },
  start_end_time12RoundTrip: {
    fontSize: width * 0.035, // 3.5% of screen width for font size
  },

  // Row 3: From Airport, Duration, Stops, and To Airport for RoundTrip
  row3RoundTrip: {
    paddingLeft: width * 0.04, // 4% of screen width for left padding
    paddingRight: width * 0.07, // 7% of screen width for right padding
    flexDirection: "row",
    justifyContent: "space-between",
  },

  columnRoundTrip: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerRoundTrip: {
    alignItems: "center",
  },
  boldTextRoundTrip: {
    fontSize: width * 0.04, // 4% of screen width for font size
    fontWeight: "bold",
  },
  fromAirportNameRoundTrip: {
    fontSize: width * 0.03, // 3.5% of screen width for font size
    color: "rgba(19, 19, 19, 0.7)", // 70% opacity for #131313 color
  },
  departure_durationRoundTrip: {
    fontSize: width * 0.035, // 3.5% of screen width for font size
  },
  departure_stopsRoundTrip: {
    fontSize: width * 0.035, // 3.5% of screen width for font size
  },
  iata_cityRowRoundTrip: {
    flexDirection: "row",
    alignItems: "center", // Keeps the text aligned in the same row
  },
  iataTextRoundTrip: {
    fontSize: width * 0.035, // 4% of screen width for font size
    fontWeight: "bold",
    marginRight: width * 0.01, // 2% of screen width for optional space between IATA and City
  },
  cityTextRoundTrip: {
    fontSize: width * 0.03, // 3.5% of screen width for font size
    fontWeight: "normal",
    color: "rgba(19, 19, 19, 0.9)", // Optional, if you want to make the city text a bit lighter
  },

  // Row 4: Departure Date and Time for RoundTrip
  row4RoundTrip: {
    paddingLeft: width * 0.04, // 4% of screen width for left padding
    paddingRight: width * 0.08, // 8% of screen width for right padding
    marginVertical: width * 0.03, // 3% of screen width for vertical margin
  },
  departureDateRoundTrip: {
    fontSize: width * 0.037, // 4% of screen width for font size
    fontWeight: "bold",
  },
  departuredate_textRoundTrip: {
    fontSize: width * 0.033, // 3.5% of screen width for font size
    color: "rgba(19, 19, 19, 0.7)", // 70% opacity for #131313 color
  },

  //Policies Styles
  policyCard: {
    marginTop: width * 0.06, // 6% of screen width for top margin
    borderWidth: 1,
    borderColor: "#000", // Black border
    borderRadius: width * 0.01, // 1% of screen width for border radius
    padding: width * 0.04, // 4% of screen width for padding
    marginBottom: width * 0.04, // 4% of screen width for bottom margin
  },
  policyTitle: {
    fontSize: width * 0.045, // 4.5% of screen width for font size
    fontWeight: "bold",
    marginBottom: width * 0.03, // 3% of screen width for bottom margin
  },
  baggageRow: {
    flexDirection: "row",
    alignItems: "center", // Align vertically
    marginBottom: width * 0.03, // 3% of screen width for space between rows
  },
  baggageLabel: {
    fontSize: width * 0.04, // 4% of screen width for font size
    color: "#333",
    width: width * 0.2, // 20% of screen width for label width
    textAlign: "left",
  },
  baggagecolon: {
    width: width * 0.08, // 8% of screen width for colon alignment
    textAlign: "center", // Align colon to the center
  },
  baggageIcon: {
    marginRight: width * 0.02, // 2% of screen width for space between icon and text
  },
  baggageText: {
    fontSize: width * 0.04, // 4% of screen width for font size
    color: "#333",
  },

  //cancellation Policy
  cancellationPolicyCard: {
    borderWidth: 1,
    borderColor: "#000", // Black border
    borderRadius: width * 0.01, // 1% of screen width for border radius
    padding: width * 0.04, // 4% of screen width for padding
    marginBottom: width * 0.04, // 4% of screen width for bottom margin
  },
  cancellationPolicyTitle: {
    fontSize: width * 0.045, // 4.5% of screen width for font size
    fontWeight: "bold",
    marginBottom: width * 0.02, // 2% of screen width for bottom margin
  },
  cancellationPolicyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: width * 0.02, // 2% of screen width for space between rows
  },
  cancellationPolicyColumnLeft: {
    paddingVertical: width * 0.03, // 3% of screen width for vertical padding
    flex: 1,
    fontSize: width * 0.035, // 3.5% of screen width for font size
    color: "#333",
  },
  cancellationPolicyColumnRight: {
    paddingVertical: width * 0.03, // 3% of screen width for vertical padding
    flex: 1,
    fontSize: width * 0.035, // 3.5% of screen width for font size
    color: "#333",
    textAlign: "center",
  },
  Spacer: {
    paddingVertical: width * 0.2, // 10% of screen width for vertical spacing
  },

  //bottom modal
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
    textAlign: "center",
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
});

export default styles;
