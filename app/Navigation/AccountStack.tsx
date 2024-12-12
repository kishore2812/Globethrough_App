import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../AccountStacks/AccountScreen";
import PersonalInfo from "../AccountStacks/PersonalInfo";
import { UserProvider } from "../AccountStacks/UserContext";
import customerService from "../AccountStacks/CustomerService";

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