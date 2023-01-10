import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import DirectionsMap from "../components/common/DirectionsMap";
import DriverMapCard from "../components/common/DriverMapCard";
import GreenButton from "../components/common/GreenButton";
import { getLocalStorage } from "../utils/LocalStorage";
import { LoadingOverlay } from "../components/Overlays";
import { getPostCall } from "../utils/API";
import MapView, {
  Marker,
  MarkerAnimated,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from "react-native-maps";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "../components/common/BackButton";
import { Dimensions } from "react-native";
import { Platform } from "react-native";

const GOOGLE_API_KEY = "AIzaSyBIHr09mmQOV8a0LybJlTt39_8U4_1NokY";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = Platform.OS == "android" ? 0.0122 : 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function DriverTripGasStation({ route }) {
  const navigation = useNavigation();
  const { bookingData } = route.params;
  const [loader, setLoader] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [driverLocation, setDriverLocation] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  React.useEffect(() => {
    getdriverCoords().then(() => {
      setLoading(false);
    });
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
  const handleClick = async () => {
    setLoader(true);
    const user = await getLocalStorage("user");

    await getPostCall(
      "trip/AtStation",
      "POST",
      JSON.stringify({
        id: bookingData?.id,
        noti_token: bookingData?.userData?.noti_token,
      }),
      user?.token
    )
      .then((e) => {
        setLoader(false);
        navigation.navigate("AtStationScreen", { bookingData });
      })
      .catch((e) => {
        setLoader(false);
        console.log("catch", e);
      });
  };
  return (
    <View>
      {loader ? (
        <LoadingOverlay loading />
      ) : (
        <>
          <MapView
            mapPadding={{ bottom: 70 }}
            rotateEnabled={false}
            provider={PROVIDER_GOOGLE}
            style={{ height: "100%", width: "100%" }}
            userInterfaceStyle={"dark"}
            showsPointsOfInterest={false}
            showsIndoors={false}
            showsBuildings={false}
            region={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
              latitudeDelta: driverLocation.latitudeDelta,
              longitudeDelta: driverLocation.longitudeDelta,
            }}
          >
            <Marker
              identifier="mk1"
              coordinate={driverLocation}
              pinColor={"blue"}
            />
            {/* <View pointerEvents="none">
            <FontAwesome5 name="map-marker-alt" size={30} color="red" />
          </View> */}
          </MapView>
          <View style={styles.main}>
            <BackButton />
            <View style={styles.justifyBetween}>
              <Text style={styles.textMain}>Go to the nearest Gas Station</Text>
              <MaterialCommunityIcons
                name="navigation-variant"
                size={24}
                color="black"
              />
            </View>
          </View>
          <GreenButton
            text="Arrived"
            width="90%"
            loading={loading}
            disabled={loading}
            onPress={handleClick}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    margin: 20,
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "white",
    width: "90%",
    zIndex: 2,
  },
  justifyBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  textMain: { marginVertical: 10, fontSize: 20, fontWeight: "bold" },
  textSub: { marginRight: 10, fontSize: 20, fontWeight: "bold" },
});
