import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert, Pressable, TextInput, Modal, Platform, ActivityIndicator, Dimensions } from 'react-native'
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign, EvilIcons, Feather, Fontisto } from '@expo/vector-icons';
import Calendar from 'react-native-calendars/src/calendar';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { UserContext } from './UserContext';


const { width, height } = Dimensions.get('window');

interface FormErrors {
    userName?: string;
    password?: string;
    mobileNumber?: string;
    email?: string;
}

interface DateObject {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}


const PersonalInfo = ({ navigation }: { navigation: any }) => {
    const [inputUserName, setInputUserName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<FormErrors>({});
    const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const { setUserName, setMobileNumber, setEmailId } = useContext(UserContext);


    // Load data from AsyncStorage when the component mounts
    useEffect(() => {
        const loadData = async () => {
            const storedUserName = await AsyncStorage.getItem("userName");
            const storedMobile = await AsyncStorage.getItem("mobileNumber");
            const storedEmail = await AsyncStorage.getItem("email");
            const savedDOB = await AsyncStorage.getItem("dateOfBirth");

            if (storedUserName) setInputUserName(storedUserName);
            if (storedMobile) setMobile(storedMobile);
            if (storedEmail) setEmail(storedEmail);
            if (savedDOB) setDateOfBirth(savedDOB)
        };

        loadData();
    }, []);

    const [fontsLoaded] = useFonts({
        'Satoshi-Bold': require('../../assets/fonts/Satoshi-Bold.otf'),
        'Satoshi-Medium': require('../../assets/fonts/Satoshi-Medium.otf'),
        'Satoshi-Regular': require('../../assets/fonts/Satoshi-Regular.otf')
    });

    if (!fontsLoaded) {
        return <ActivityIndicator />;
    }

    const validateFields = (): boolean => {
        const errors: FormErrors = {}

        const emailError = validateEmail(email);
        if (emailError) {
            errors.email = emailError;
        }

        const mobileError = validateMobileNumber(mobile);
        if (mobileError) {
            errors.mobileNumber = mobileError;
        }

        const userNameError = validateUserName(inputUserName);
        if (userNameError) {
            errors.userName = userNameError;
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            return "Email is required";
        }
        else if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        return "";
    };

    const validateMobileNumber = (number: string) => {
        const mobileRegex = /^[0-9]{10}$/;

        if (!number) {
            return "Mobile number is required"
        }
        else if (!mobileRegex.test(number)) {
            return "Invalid mobile number. It must be of 10 digits"
        }
        return "";
    }

    const validateUserName = (uName: string) => {
        const uNameRegex = /^[a-zA-Z]*$/g;

        if (!uName) {
            return "Please enter your name"
        }
        else if (!uNameRegex.test(uName)) {
            return "Please enter valid User name"
        }
    }

    const handleSave = async () => {
        if (validateFields()) {
            try {
                // Save data to AsyncStorage
                await AsyncStorage.setItem("userName", inputUserName);
                await AsyncStorage.setItem("mobileNumber", mobile);
                await AsyncStorage.setItem("email", email);
                await AsyncStorage.setItem("dateOfBirth", dateOfBirth);

                // Update Context
                setUserName(inputUserName);
                setMobileNumber(mobile);
                setEmailId(email);
                navigation.goBack();
                Alert.alert("Success", "Information saved successfully!");
            } catch (error) {
                console.error("Failed to save data to AsyncStorage", error);
            }
        } else {
            Alert.alert("Error", "Please verify the fields.");
        }
    };

    const handleEdit = () => {
        setIsEditable(true);
    };


    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    };

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const { type } = event; // Type is part of DateTimePickerEvent
        if (type === "set") {
            const currentDate = selectedDate || date;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDatePicker();
                setDateOfBirth(formatDate(currentDate));
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        setDateOfBirth(date.toDateString());
        toggleDatePicker();
    }

    const formatDate = (rawDate: string | number | Date): string => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate()

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        return `${formattedDay}-${formattedMonth}-${year}`
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
                        <Text style={styles.personalInfoTitle}>Personal Information</Text>
                        <Text style={styles.subTitle}>Update and manage your personal details</Text>
                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.secondDiv}>
                <View style={styles.wrapeditems}>
                    <Text style={styles.label}>User Name</Text>
                    <TextInput underlineColorAndroid={'transparent'}
                        style={styles.input}
                        value={inputUserName}
                        onChangeText={setInputUserName}
                        placeholder='Enter your name'
                        editable={isEditable}
                    />
                    {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}
                </View>
                <View style={styles.wrapeditems}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput underlineColorAndroid={'transparent'}
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder='abc@example.com'
                        editable={isEditable}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>
                <View style={styles.wrapeditems}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <TextInput underlineColorAndroid={'transparent'}
                        style={styles.input}
                        value={mobile}
                        onChangeText={setMobile}
                        keyboardType='numeric'
                        maxLength={10}
                        placeholder="Enter mobile number"
                        editable={isEditable}
                    />
                    {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}
                </View>
                <View style={styles.wrapeditems}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <>
                        <Pressable onPress={toggleDatePicker}>
                            <TextInput
                                style={styles.input}
                                placeholder="DD/MM/YYYY"
                                value={dateOfBirth}
                                onChangeText={setDateOfBirth}
                                placeholderTextColor="grey"
                                editable={false}
                            />
                        </Pressable>

                        <Pressable
                            onPress={isEditable ? toggleDatePicker : undefined}
                            style={styles.iconContainer}
                        >
                            <AntDesign name="calendar" size={24} color="grey" />
                        </Pressable>
                    </>
                    {showPicker && isEditable && (
                        <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}
                            style={styles.datePicker}
                            maximumDate={new Date()} // Limits to the current date
                            // minimumDate={new Date(new Date().getFullYear(), 0, 1)} // Limits to January 1 of the current year
                        />
                    )}
                </View>
                <Pressable
                    style={styles.button}
                    onPress={isEditable ? handleSave : handleEdit}
                >
                    <Text style={styles.buttonText}>
                        {isEditable ? "Save" : "Edit"}
                    </Text>
                </Pressable>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1B5F54",
        flexDirection: 'row',
        display: "flex",
        alignItems: "flex-end",
        justifyContent: 'center',
    },

    textWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: height * 0.08, // Scaled padding for top
        paddingBottom: height * 0.03,
        paddingRight: width * 0.1,
    },

    backarrow: {
        paddingRight: width * 0.08,
    },

    personalInfoTitle: {
        color: "white",
        fontSize: width * 0.04,
        fontWeight: 500,
        fontFamily: "Satoshi-Bold"
    },

    subTitle: {
        color: "#d9d9d9",
        fontSize: width * 0.035,
        fontFamily: "Satoshi-Regular"
    },

    //User Information
    secondDiv: {
        marginHorizontal: width * 0.08,
        marginTop: height * 0.05,
    },


    label: {
        color: "#8d8d8d",
        fontWeight: '500',
        fontSize: width * 0.035,
        fontFamily: "Satoshi-Bold",
    },


    input: {
        marginBottom: height * 0.02,
        borderBottomColor: '#9a9a9a',
        borderBottomWidth: 1,
        fontSize: width * 0.04,
        color: "black",
        fontFamily: "Satoshi-Bold",
    },

    errorText: {
        color: 'red',
        fontSize: width * 0.03,
        marginBottom: 10,
    },

    wrapeditems: {
    },

    flexItems: {
        backgroundColor: "yellow"
    },

    buttonText: {
        color: 'black',
        fontSize: width * 0.04,
        textAlign: "center",
        fontWeight: "300",
        fontFamily: "Satoshi-Bold",
    },

    button: {
        width: width * 0.22,
        backgroundColor: '#F7F7F7',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.04,
        borderRadius: width * 0.02,
        borderWidth: 1,
    },

    calendar: {
        borderRadius: width * 0.025,
        elevation: 9,
        width: width * 0.7,
    },

    datePicker: {
        height: height * 0.15,
        marginTop: -10,
    },

    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        position: 'absolute',
        right: width * 0.03,
        top: '40%',
        transform: [{ translateY: -10 }],
    },
})
export default PersonalInfo