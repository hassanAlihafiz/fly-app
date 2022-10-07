import { createDrawerNavigator } from "@react-navigation/drawer";
import LandingScreen from "../screens/LandingScreen";
import Login from "../screens/LoginScreen";

const Drawer = createDrawerNavigator();

const DrawerTab = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={LandingScreen} />
      <Drawer.Screen name="Stripe" component={Login} />
    </Drawer.Navigator>
  );
};
export default DrawerTab;
