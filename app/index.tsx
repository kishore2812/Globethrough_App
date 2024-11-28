import React, { useState, useEffect } from "react";
import MainNavigator from "./Navigation/MainNavigator"; // Import the MainNavigator
import LoadingScreen from "./LoadingScreen"; // Your custom Loading Screen component

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading process
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2500); // Adjust the time
  }, []);

  return (
    // Conditional Rendering based on loading state
    isLoading ? (
      <LoadingScreen /> //  custom Loading screen
    ) : (
      <MainNavigator /> // Main Navigator with bottom navigation after loading is complete
    )
  );
};

export default App;