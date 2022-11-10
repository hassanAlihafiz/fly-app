import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Settings } from "react-native";
import CustomDrawerContent from "../components/CustomDrawer";
import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";
import Login from "../screens/LoginScreen";
import StripeScreen from "../screens/StripeScreen";
import SettingScreen from "../screens/Settings";
import ServiceOfferedScreen from "../screens/ServiceOffered";
import { Entypo, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Map from "../screens/Map";
import Checkout from "../screens/Checkout";
import PaymentScreen from "../screens/PaymentScreen";
import React from "react";
import {
  useNavigationContainerRef,
  useNavigationState,
} from "@react-navigation/native";
import SelectDriverScreen from "../screens/SelectDriverScreen";
import PickDropMap from "../components/PickDropMap";
import SelectGasStationScreens from "../screens/SelectGasStationScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FirstHome" component={HomeScreen} />
      <Stack.Screen name="Main Service" component={ServiceOfferedScreen} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="PickDropMap" component={PickDropMap} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="SelectStations" component={SelectGasStationScreens} />
      <Stack.Screen name="SelectDriver" component={SelectDriverScreen} />
    </Stack.Navigator>
  );
};

const DrawerTab = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        swipeEnabled: true,
        drawerStyle: {
          width: "70%",
        },
        drawerType: "slide",
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "grey",
        drawerItemStyle: {
          height: 50,
          justifyContent: "center",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerTitle: "Fly",
          headerTitleAlign: "center",

          headerStyle: {
            height: 80,
          },
          drawerLabelStyle: {
            borderBottomWidth: 1,

            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name="ios-home"
              size={22}
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Service Offered"
        component={ServiceOffered}
        options={{
          headerTitle: "Service Offered",
          headerTitleAlign: "center",

          headerStyle: {
            height: 80,
          },
          drawerLabelStyle: {
            borderBottomWidth: 1,

            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused }) => (
            <Entypo
              name="tools"
              size={22}
              color="black"
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="  Stripe"
        component={StripeScreen}
        options={{
          headerTitle: "Stripe",
          headerTitleAlign: "center",

          headerStyle: {
            height: 80,
          },
          drawerLabelStyle: {
            borderBottomWidth: 1,

            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              name="stripe-s"
              size={22}
              color="black"
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Settings"
        component={SettingStack}
        options={{
          headerTitle: "Settings",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          drawerLabelStyle: {
            borderBottomWidth: 1,

            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="ios-settings"
              size={22}
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Map"
        component={Map}
        options={{
          headerTitle: "Map",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          drawerLabelStyle: {
            borderBottomWidth: 1,

            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused }) => (
            <Feather
              name="map-pin"
              size={22}
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerTab;

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};
