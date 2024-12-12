// store.ts
import { configureStore } from '@reduxjs/toolkit';
import flightBookingReducer from '../StateManagement/FlightBookingState'; // Import your reducer

const store = configureStore({
  reducer: {
    flightBooking: flightBookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions that are setting dates
        ignoredActions: ['flightBooking/setDepartureDate', 'flightBooking/setReturnDate'],
        ignoredPaths: ['flightBooking.departureDate', 'flightBooking.returnDate'], // Ignore specific paths in state
      },
    }),
});

export default store;
