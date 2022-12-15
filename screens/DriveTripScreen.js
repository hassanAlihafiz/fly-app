import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import BackButton from "../components/common/BackButton";
import DirectionsMap from "../components/common/DirectionsMap";
import DriverMapCard from "../components/common/DriverMapCard";
import GreenButton from "../components/common/GreenButton";
import { getLocalStorage } from "../utils/LocalStorage";

const GOOGLE_API_KEY = "AIzaSyBIHr09mmQOV8a0LybJlTt39_8U4_1NokY";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DriveTripScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [arrived, setArrived] = React.useState(false);
  const [duration, setDuration] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [fitToBound, setFitToBound] = React.useState(false);

  const map = React.useRef(null);
  const { bookingData } = route.params;
  const coordinates = {
    latitude: Number(bookingData.userData.location.lat),
    longitude: Number(bookingData.userData.location.lng),
  };
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
    <View style={{ height: "100%" }}>
      <DirectionsMap
        loading={loading}
        coords={[driverLocation, coordinates]}
        setLoading={setLoading}
        setDistance={setDistance}
        setDuration={setDuration}
        setArrived={setArrived}
        fitToBound={fitToBound}
        setFitToBound={setFitToBound}
        radius={1}
      />

      <DriverMapCard
        loading={loading}
        text="Car Pickup"
        duration={duration}
        distance={distance}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          bottom: 75,
          height: 60,
          width: 60,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 50,
          zIndex: 3,
          shadowColor: "#000",
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowOpacity: 0.13,
          shadowRadius: 4,

          elevation: 20,
        }}
        onPress={() => setFitToBound(true)}
      >
        <MaterialCommunityIcons
          name="directions"
          size={30}
          color="black"
          style={{ position: "relative", zIndex: 4 }}
        />
      </TouchableOpacity>
      {arrived == true ? (
        <GreenButton
          text="Arrived"
          width="90%"
          loading={loading}
          disabled={!arrived || loading}
          onPress={() => navigation.navigate("PickCarScreen", { bookingData })}
        />
      ) : null}
    </View>
  );
};

export default DriveTripScreen;
