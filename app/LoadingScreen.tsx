import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* GIF Container */}
      <View style={styles.gifContainer}>
        <Image
          source={require('../assets/images/Front_loading_animation-ezgif.com-resize.gif')}
          style={styles.loadingImage}
          resizeMode="contain" 
        />
      </View>

     
      <Image
        source={require('../assets/images/Logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  gifContainer: {
    width: '90%', // Responsive width
    height: height * 0.3, // 30% of screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: '100%', // Fill container width
    height: '100%', // Fill container height
    opacity: 0.25,
  },
  logo: {
    position: 'absolute',
    zIndex: 1,
    width: width * 0.5, // 50% of screen width
    height: height * 0.1, // 10% of screen height
  },
});

export default LoadingScreen;
