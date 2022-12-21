import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "../../screens/Settings";


const Stack = createNativeStackNavigator();

export default SettingStack = () => {
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
