import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import { getLocalStorage } from "../utils/LocalStorage";
import DrawerTab from "./DrawerNavigation";
import DriverDrawerTab from "./DriverDrawer";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={DrawerTab} />
      <Stack.Screen name="DriverScreen" component={DriverDrawerTab} />
      
    </Stack.Navigator>
  );
};
export default StackNavigation;
