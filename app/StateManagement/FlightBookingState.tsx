// FlightBookingState.ts (or .js depending on your project structure)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AirportDetails {
  IATA: string; // The IATA code of the airport
  City: string; // The city where the airport is located
  Name: string; // The name of the airport
}

interface FlightBookingState {
  fromAirport: string;
  toAirport: string;
  fromAirportData: AirportDetails | null; // Store IATA and City
  toAirportData: AirportDetails | null; // Store IATA and City
  tripType: "oneWay" | "roundTrip";
  departureDate: Date | null; // Store Date object directly
  returnDate: Date | null; // Store Date object directly
  selectedClass: string;
  adults: number;
  children: number;
  infants: number;
  selectedOption: string | null;
  isTravelerModalVisible: boolean;
  isClassModalVisible: boolean;
}

const initialState: FlightBookingState = {
  fromAirport: "Select Airport",
  toAirport: "Select Airport",
  fromAirportData: null,
  toAirportData: null,
  tripType: "oneWay",
  departureDate: null,
  returnDate: null,
  selectedClass: "",
  adults: 0,
  children: 0,
  infants: 0,
  selectedOption: null,
  isTravelerModalVisible: false,
  isClassModalVisible: false,
};

const flightBookingSlice = createSlice({
  name: "flightBooking",
  initialState,
  reducers: {
    setFlightBookingDetails(
      state,
      action: PayloadAction<Partial<FlightBookingState>>
    ) {
      Object.assign(state, action.payload);
    },
    setFromAirport(state, action: PayloadAction<string>) {
      state.fromAirport = action.payload;
    },
    setToAirport(state, action: PayloadAction<string>) {
      state.toAirport = action.payload;
    },
    setFromAirportData(state, action: PayloadAction<AirportDetails>) {
      state.fromAirportData = action.payload;
    },
    setToAirportData(state, action: PayloadAction<AirportDetails>) {
      state.toAirportData = action.payload;
    },
    setTripType(state, action: PayloadAction<"oneWay" | "roundTrip">) {
      state.tripType = action.payload;
    },
    setDepartureDate(state, action: PayloadAction<Date | null>) {
      state.departureDate = action.payload; // Store date as ISO string
    },
    setReturnDate(state, action: PayloadAction<Date | null>) {
      state.returnDate = action.payload; // Store date as ISO string
    },

    setSelectedClass(state, action: PayloadAction<string>) {
      state.selectedClass = action.payload;
    },
    setAdults(state, action: PayloadAction<number>) {
      state.adults = action.payload;
    },
    setChildren(state, action: PayloadAction<number>) {
      state.children = action.payload;
    },
    setInfants(state, action: PayloadAction<number>) {
      state.infants = action.payload;
    },
    setSelectedOption(state, action: PayloadAction<string | null>) {
      state.selectedOption = action.payload;
    },
    setTravelerModalVisible(state, action: PayloadAction<boolean>) {
      state.isTravelerModalVisible = action.payload;
    },
    setClassModalVisible(state, action: PayloadAction<boolean>) {
      state.isClassModalVisible = action.payload;
    },
  },
});

export const {
  setFlightBookingDetails,
  setFromAirport,
  setToAirport,
  setFromAirportData,
  setToAirportData,
  setTripType,
  setDepartureDate,
  setReturnDate,
  setSelectedClass,
  setAdults,
  setChildren,
  setInfants,
  setSelectedOption,
  setTravelerModalVisible,
  setClassModalVisible,
} = flightBookingSlice.actions;

export default flightBookingSlice.reducer;
