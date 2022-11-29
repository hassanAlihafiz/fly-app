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
import Completed from "../screens/Completed";
import DriverProfile from "../screens/DriverProfile";
import DriveTripScreen from "../screens/DriveTripScreen";
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
    </Stack.Navigator>
  );
};

const DriverDrawerTab = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
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
        name="Dashboard"
        component={HomeStack}
        options={{
          headerTitle: "Dashboard",
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
      <Drawer.Screen
        name="Completed"
        component={Completed}
        options={{
          headerStyle: {
            height: 80,
          },
          drawerLabelStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="sticker-check"
              size={22}
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="  Profile"
        component={DriverProfile}
        options={{
          headerStyle: {
            height: 80,
          },
          drawerLabelStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DriverDrawerTab;
