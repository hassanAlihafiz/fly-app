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
    </Stack.Navigator>
  );
};

const DrawerTab = () => {
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
            height: 30,
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
        name="Service Offered"
        component={ServiceOffered}
        options={{
          drawerLabelStyle: {
            borderBottomWidth: 1,
            height: 30,
            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused }) => (
            <Entypo
              name="tools"
              size={24}
              color="black"
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Stripe"
        component={StripeScreen}
        options={{
          headerTitle: "Stripe",
          headerTitleAlign: "center",
          headerStyle: {
            height: 80,
          },
          drawerLabelStyle: {
            borderBottomWidth: 1,
            height: 30,
            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              name="stripe-s"
              size={24}
              color="black"
              style={{ color: focused ? "black" : "grey" }}
            />
          ),
        }}
      />
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
            height: 30,
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
            height: 30,
            borderBottomColor: "grey",
          },
          drawerIcon: ({ focused }) => (
            <Feather name="map-pin" size={24} color="black" />
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

const ServiceOffered = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main Service" component={ServiceOfferedScreen} />
    </Stack.Navigator>
  );
};
