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

const CustomCalendar: React.FC<CustomCalendarProps> = React.memo(
  ({ flightPrices, onDayPress, visible, onClose }) => {
    const today = new Date();
    const formattedMinDate = today.toISOString().split("T")[0];

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
              horizontal={false}
              onDayPress={(day: DateData) => {
                if (day && day.dateString) {
                  onDayPress({
                    dateString: day.dateString,
                    day: day.day,
                    month: day.month,
                    year: day.year,
                    timestamp: day.timestamp,
                  });
                  onClose();
                }
              }}
              pastScrollRange={0}
              futureScrollRange={60}
              scrollEnabled={true}
              showScrollIndicator={true}
              current={formattedMinDate}
              dayComponent={({ date }) => {
                const dateKey = date?.dateString || "";
                const price = flightPrices[dateKey];
                const disabled = dateKey < formattedMinDate;
                const textColor = disabled ? "#d3d3d3" : "#000";
                const priceText = price ? `$${price}` : null;

                return (
                  <TouchableOpacity
                    style={styles.dayContainer}
                    onPress={() => {
                      if (disabled) return;
                      onDayPress({
                        dateString: date?.dateString || "",
                        day: date?.day || 0,
                        month: date?.month || 0,
                        year: date?.year || 0,
                        timestamp: date?.timestamp || 0,
                      });
                      onClose();
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
  }
);

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
