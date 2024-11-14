// BookingScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const BookingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <Text>Book Your Flight!</Text>
      <Button
        title="Go to Booking Details"
        onPress={() => navigation.navigate('BookingDetails')}
      />
    </View>
  );
};

export default BookingScreen;
