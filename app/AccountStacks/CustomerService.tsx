import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign, EvilIcons, Feather, Fontisto } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");

const CustomerService = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const phoneNumber = "8105816538";

  const handlePhonePress = () => {
    // This will open the phone dialer with the provided phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const [fontsLoaded] = useFonts({
    "Satoshi-bold": require("../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-med": require("../../assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-reg": require("../../assets/fonts/Satoshi-Regular.otf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.textWrapper}>
          <View style={styles.backarrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.personalInfoTitle}>Customer Service</Text>
            <Text style={styles.subTitle}>Get help and support anytime</Text>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <View style={styles.secondDivWrapper}>
          <View style={styles.chatCusImage}>
            <Feather name="message-square" size={24} color="#000" />
          </View>
          <View>
            <Text style={styles.customTitle}>Chat with us</Text>
            <Text style={styles.customSubTitle}>
              Chat with our team and get solution
            </Text>
          </View>
        </View>
        <View style={styles.thirdDivWrapper}>
          <TouchableOpacity
            style={styles.chatCusImage}
            onPress={handlePhonePress}
          >
            <Feather name="phone" size={24} color="#000" />
            {/* source={require("../assets/images/phoneIcon.png")} */}
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePhonePress}>
            <Text style={styles.customTitle}>{phoneNumber}</Text>
            <Text style={styles.customSubTitle}>Call us and get solution</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B5F54",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: width * 0.05, // Dynamic padding
  },

  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: height * 0.08, // Scaled padding for top
    paddingBottom: height * 0.03,
    paddingRight: width * 0.25, // Scaled padding for right
  },

  secondDivWrapper: {
    marginTop: height * 0.04, // Scaled margin
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.05, // Scaled gap
  },

  thirdDivWrapper: {
    marginTop: height * 0.04, // Scaled margin
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.05, // Scaled gap
  },

  chatCusImage: {
    marginLeft: width * 0.08, // Scaled margin
  },

  backarrow: {
    paddingRight: width * 0.08, // Scaled padding
  },

  personalInfoTitle: {
    color: "white",
    fontSize: width * 0.04, // Scaled font size
    fontWeight: "500",
    fontFamily: "Satoshi-Bold",
  },

  subTitle: {
    color: "#d9d9d9",
    fontSize: width * 0.035, // Scaled font size
    fontFamily: "Satoshi-Regular",
  },

  customTitle: {
    fontSize: width * 0.04, // Scaled font size
    fontWeight: "600",
    fontFamily: "Satoshi-Bold",
  },

  customSubTitle: {
    fontSize: width * 0.03, // Scaled font size
    paddingTop: height * 0.01, // Scaled padding
    fontFamily: "Satoshi-Bold",
  },
});

export default CustomerService;
