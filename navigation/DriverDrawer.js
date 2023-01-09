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
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DriverHome from "../screens/DriverHome";
import DriverCompleted from "../screens/DriverCompleted";
import DriverProfile from "../screens/DriverProfile";
import DriveTripScreen from "../screens/DriveTripScreen";
import CarPickedScreen from "../screens/CarPickedScreen";
import DriverTripStation from "../screens/DriverTripStation";
import AtStationScreen from "../screens/AtStationScreen";
import DriverTripDelivery from "../screens/DriverTripDelivery";
import DriverCustomerConfirm from "../screens/DriverCustomerConfirm";
import { View } from "react-native";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FirstHome" component={DriverHome} />
      <Stack.Screen name="TripScreen" component={DriveTripScreen} />
      <Stack.Screen name="PickCarScreen" component={CarPickedScreen} />
      <Stack.Screen name="TripStationScreen" component={DriverTripStation} />
      <Stack.Screen name="AtStationScreen" component={AtStationScreen} />
      <Stack.Screen name="TripDeliveryScreen" component={DriverTripDelivery} />
      <Stack.Screen
        name="DriverCustomerConfirm"
        component={DriverCustomerConfirm}
      />
    </Stack.Navigator>
  );
};

const DriverDrawerTab = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={DrawerNavigatorOptions}
    >
      <Drawer.Screen
        name="Dashboard"
        component={HomeStack}
        options={{
          headerTitle: "Dashboard",
          DrawerScreenOptions,
          drawerIcon: ({ focused, color }) => (
            <View style={iconStyle}>
              <Ionicons
                name="ios-home"
                size={22}
                style={{ color: focused ? "black" : "grey" }}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Completed Bookings"
        component={DriverCompleted}
        options={{
          headerTitle: "Completed Bookings",
          DrawerScreenOptions,
          drawerIcon: ({ focused }) => (
            <View style={iconStyle}>
              <MaterialCommunityIcons
                name="clipboard-check-multiple"
                size={24}
                color="black"
                style={{
                  color: focused ? "black" : "grey",
                }}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={DriverProfile}
        options={{
          headerTitle: "Profile",
          DrawerScreenOptions,
          drawerIcon: ({ focused }) => (
            <View style={iconStyle}>
              <FontAwesome
                name="user"
                size={24}
                style={{ color: focused ? "black" : "grey" }}
              />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DriverDrawerTab;

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

const iconStyle = {
  alignItems: "center",
  width: 25,
};
