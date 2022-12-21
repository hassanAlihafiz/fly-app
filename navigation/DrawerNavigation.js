import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Settings } from "react-native";
import CustomDrawerContent from "../components/CustomDrawer";
import LandingScreen from "../screens/LandingScreen";
import Login from "../screens/LoginScreen";
import StripeScreen from "../screens/StripeScreen";
import {
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Map from "../screens/Map";
import React from "react";
import {
  useNavigationContainerRef,
  useNavigationState,
} from "@react-navigation/native";
import HomeStack from "./stack/HomeStack";
import ServiceOffered from "../screens/ServiceOffered";
import SettingStack from "./stack/SettingStack";
import MyBookings from "../screens/MyBookings";
import MyBookingStack from "./stack/MyBookingStack";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default DrawerTab = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={DrawerNavigatorOptions}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerTitle: "Fly",
          DrawerScreenOptions,

          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name="ios-home"
              size={22}
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Bookings"
        component={MyBookingStack}
        options={{
          headerTitle: "My Bookings",
          DrawerScreenOptions,

          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="clipboard-check-multiple"
              size={24}
              color="black"
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
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
          DrawerScreenOptions,
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="ios-settings"
              size={24}
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
          DrawerScreenOptions,
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              name="map-marked-alt"
              size={24}
              color="black"
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const DrawerNavigatorOptions = {
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
};

const DrawerScreenOptions = {
  headerTitleAlign: "center",

  headerStyle: {
    height: 80,
  },
  drawerLabelStyle: {
    borderBottomWidth: 1,

    borderBottomColor: "grey",
  },
};
