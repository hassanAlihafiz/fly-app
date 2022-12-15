import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import DirectionsMap from "../components/common/DirectionsMap";
import DriverMapCard from "../components/common/DriverMapCard";
import GreenButton from "../components/common/GreenButton";
import { getLocalStorage } from "../utils/LocalStorage";

export default DriverTripStation = ({ route }) => {
  const navigation = useNavigation();
  const { bookingData } = route.params;
  const coords = bookingData?.washStation?.geometry?.location;
  const coordinates = {
    latitude: Number(coords?.lat),
    longitude: Number(coords?.lng),
  };
  const [loading, setLoading] = React.useState(true);
  const [arrived, setArrived] = React.useState(false);
  const [duration, setDuration] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [driverLocation, setDriverLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  React.useEffect(() => {
    getdriverCoords();
  }, []);

  React.useEffect(() => {
    getdriverCoords();
  }, [driverLocation]);

  const getdriverCoords = async () => {
    const driverCoords = await getLocalStorage("driver_coords");
    setDriverLocation({
      latitude: driverCoords.coords.latitude,
      longitude: driverCoords.coords.longitude,
    });
  };

  return (
    <View>
      <DirectionsMap
        loading={loading}
        coords={[driverLocation, coordinates]}
        setLoading={setLoading}
        setDistance={setDistance}
        setDuration={setDuration}
        setArrived={setArrived}
        radius={0.8}
      />

      <DriverMapCard
        loading={loading}
        text={`Go to ${bookingData.packageData.type} Station`}
        distance={distance}
        duration={duration}
      />

      {arrived == true ? (
        <GreenButton
          text="Arrived"
          width="90%"
          loading={loading}
          disabled={!arrived || loading}
          onPress={() =>
            navigation.navigate("AtStationScreen", { bookingData })
          }
        />
      ) : null}
    </View>
  );
};
