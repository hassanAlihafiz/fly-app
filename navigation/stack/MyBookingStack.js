import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import BookingArrivedPickupScreen from "../../screens/BookingArrivedPickupScreen";
import BookingAtStationScreen from "../../screens/BookingAtStationScreen";
import BookingDeliveryScreen from "../../screens/BookingDeliveryScreen";
import BookingTripDeliveryScreen from "../../screens/BookingTripDeliveryScreen";
import BookingTripGasStation from "../../screens/BookingTripGasStation";
import BookingTripScreen from "../../screens/BookingTripScreen";
import BookingTripStation from "../../screens/BookingTripStation";
import MyBookings from "../../screens/MyBookings";
import ViewBookingDetails from "../../screens/ViewBookingDetails";

export default function MyBookingStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyBookingsScreen" component={MyBookings} />
      <Stack.Screen name="MyBookingDetails" component={ViewBookingDetails} />
      <Stack.Screen name="MyBookingTripScreen" component={BookingTripScreen} />
      <Stack.Screen
        name="MyBookingArrivedForPickupScreen"
        component={BookingArrivedPickupScreen}
      />
      <Stack.Screen
        name="MyBookingTripStationScreen"
        component={BookingTripStation}
      />
      <Stack.Screen
        name="MyBookingTripGasStationScreen"
        component={BookingTripGasStation}
      />
      <Stack.Screen
        name="MyBookingAtStationScreen"
        component={BookingAtStationScreen}
      />
      <Stack.Screen
        name="MyBookingTripDeliveryScreen"
        component={BookingTripDeliveryScreen}
      />
      <Stack.Screen
        name="MyBookingDeliveryScreen"
        component={BookingDeliveryScreen}
      />
    </Stack.Navigator>
  );
}
