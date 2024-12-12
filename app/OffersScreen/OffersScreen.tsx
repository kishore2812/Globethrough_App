// screens/OffersScreen/OffersScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OffersScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Offers Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OffersScreen;
