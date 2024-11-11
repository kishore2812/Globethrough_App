// app/App.tsx (or app/index.tsx)

import React from 'react';
import { View } from 'react-native';
import HomeScreen from './HomeScreen/HomeScreen';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen />
    </View>
  );
};

export default App;