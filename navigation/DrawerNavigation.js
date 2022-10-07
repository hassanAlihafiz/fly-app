import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomDrawerContent from "../components/CustomDrawer";
import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";
import Login from "../screens/LoginScreen";

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
        }}
      />
      <Drawer.Screen name="Service Offered" component={Login} />
      <Drawer.Screen name="Stripe" component={Login} />
      <Drawer.Screen name="Settings" component={SettingStack} />
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
      <Stack.Screen name="Main Setting" component={Login} />
    </Stack.Navigator>
  );
};
