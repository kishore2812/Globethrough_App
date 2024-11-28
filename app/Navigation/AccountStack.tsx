import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../AccountScreen/AccountScreen";
import PersonalInfo from "../AccountScreen/PersonalInfo";
import { UserProvider } from "../AccountScreen/UserContext";
import customerService from "../AccountScreen/CustomerService";

const Stack = createStackNavigator();

export default function Index() {
    return (
        <UserProvider>

            <Stack.Navigator initialRouteName="Account">

                <Stack.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Personal"
                    component={PersonalInfo}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Customer"
                    component={customerService}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </UserProvider>


    );
}