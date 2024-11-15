import React, { useState, useEffect } from 'react';
import MainNavigator from './MainNavigator';  // Import the MainNavigator
import LoadingScreen from './LoadingScreen';  // Your custom Loading Screen component

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading process (e.g., fetching data, etc.)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);  // Set loading to false after 2 seconds
    }, 2000);  // Adjust the time according to your app's requirements
  }, []);

  return (
    // Conditional Rendering based on loading state
    isLoading ? (
      <LoadingScreen />  // Show your custom Loading screen
    ) : (
      <MainNavigator />  // Show Main Navigator with bottom navigation after loading is complete kishore
    )
  );
};

export default App;
