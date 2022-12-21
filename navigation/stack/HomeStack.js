import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/HomeScreen";
import ServiceOfferedScreen from "../../screens/ServiceOffered";
import Checkout from "../../screens/Checkout";
import PaymentScreen from "../../screens/PaymentScreen";
import SelectDriverScreen from "../../screens/SelectDriverScreen";
import PickDropMap from "../../components/PickDropMap";
import SelectGasStationScreens from "../../screens/SelectGasStationScreen";
import NearbyWashStation from "../../screens/NearbyWashStation";

const Stack = createNativeStackNavigator();

export default HomeStack = () => {
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
      <Stack.Screen name="SelectStations" component={SelectGasStationScreens} />
      <Stack.Screen name="SelectWashStations" component={NearbyWashStation} />
      <Stack.Screen name="SelectDriver" component={SelectDriverScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
};
