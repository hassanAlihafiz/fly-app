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
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import DriverHome from "../screens/DriverHome";
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
     
    </Drawer.Navigator>
  );
};
export default DriverDrawerTab;