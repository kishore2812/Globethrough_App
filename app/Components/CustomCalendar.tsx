import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { CalendarList, DateData } from "react-native-calendars";

type DayObject = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

interface CustomCalendarProps {
  flightPrices: Record<string, number>; // Mapping of date strings to flight prices
  onDayPress: (day: DayObject) => void; // Callback for day press events
  visible: boolean; // Controls visibility of the calendar
  onClose: () => void; // Callback to close the calendar
  minDate?: string; // Minimum date prop
  departureDate?: Date | null; // Departure date
  returnDate?: Date | null; // Return date
  isOneWay?: boolean; // Whether the trip is one-way
  minReturnDate?: string;
}

const screenWidth = Dimensions.get("window").width;

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  flightPrices,
  onDayPress,
  visible,
  onClose,
  minDate,
  departureDate,
}) => {
  // Function to disable past dates (grey out the text color)
  const isPastDate = (dateString: string) => {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    return dateString < today; // Check if the date is in the past
  };

  // Function to disable return date selection before departure date
  const isReturnDateDisabled = (dateString: string) => {
    if (departureDate) {
      const selectedDate = new Date(dateString);
      return selectedDate < departureDate; // Return date should be later than departure date
    }
    return false; // If no departure date, return date is not restricted
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.calendarContainer}>
          <CalendarList
            markingType="custom"
            horizontal={false} // Vertical scrolling
            onDayPress={(day: DateData) => {
              if (day && day.dateString) {
                onDayPress({
                  dateString: day.dateString,
                  day: day.day,
                  month: day.month,
                  year: day.year,
                  timestamp: day.timestamp,
                });
                onClose(); // Close the calendar after selecting a day
              }
            }}
            minDate={minDate} // Always allow today's date or future dates for departure
            dayComponent={({ date }) => {
              const dateKey = date?.dateString || "";
              const price = flightPrices[dateKey]; // Get price from the flightPrices
              const disabled =
                isPastDate(date?.dateString || "") ||
                isReturnDateDisabled(date?.dateString || "");
              const textColor = disabled ? "#d3d3d3" : "#000"; // Grayed out text for past dates or invalid return dates
              const priceText = price ? `$${price}` : null;

              return (
                <TouchableOpacity
                  style={styles.dayContainer}
                  onPress={() => {
                    if (disabled) return; // Prevent selection if the date is in the past or invalid for return
                    onDayPress({
                      dateString: date?.dateString || "",
                      day: date?.day || 0,
                      month: date?.month || 0,
                      year: date?.year || 0,
                      timestamp: date?.timestamp || 0,
                    });
                    onClose(); // Close the calendar after selecting a day
                  }}
                >
                  <Text style={[styles.dayText, { color: textColor }]}>
                    {date?.day}
                  </Text>
                  {priceText && (
                    <Text style={styles.priceText}>{priceText}</Text>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  dayContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 12,
    color: "green",
  },
});

export default CustomCalendar;
