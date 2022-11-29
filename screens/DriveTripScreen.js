import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { getLocalStorage } from "../utils/LocalStorage";

const GOOGLE_API_KEY = "AIzaSyBIHr09mmQOV8a0LybJlTt39_8U4_1NokY";

const DriveTripScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [arrived, setArrived] = React.useState(false);
  const { bookingData } = route.params;
  const [driverLocation, setDriverLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [coordinates, setCoordinates] = React.useState({
    latitude: Number(bookingData.userData.location.lat),
    longitude: Number(bookingData.userData.location.lng),
  });

  React.useEffect(() => {
    getdriverCoords();
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      getArrivalDistance();
      getdriverCoords();
    }, 5000);
  }, [driverLocation]);

  const getdriverCoords = async () => {
    const driverCoords = await getLocalStorage("driver_coords");
    console.log(driverCoords);
    setDriverLocation({
      latitude: driverCoords.coords.latitude,
      longitude: driverCoords.coords.longitude,
    });
    setLoading(false);
  };

  console.log("arrive", !arrived);
  const getArrivalDistance = async () => {
    await axios
      .get(
        "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
          driverLocation.latitude +
          "," +
          driverLocation.longitude +
          "&destinations=" +
          coordinates.latitude +
          "," +
          coordinates.longitude +
          "&units=imperial&key=" +
          GOOGLE_API_KEY
      )
      .then((e) => {
        const res = e?.data?.rows[0]?.elements[0].distance?.value;

        if (res <= 500) {
          console.log("Res", res);
          setArrived(true);
        } else {
          console.log("Not in range");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={{ height: "100%" }}>
      {!loading ? (
        <MapView
          style={{ height: "100%", width: "100%" }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
          }}
        >
          <MapViewDirections
            origin={driverLocation}
            destination={coordinates}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor="#111111"
          />
          <Marker coordinate={driverLocation} pinColor={"#000000"} />
          <Marker
            coordinate={coordinates}
            title="Destination"
            description="Destination"
          />
        </MapView>
      ) : null}
      <View
        style={{
          display: "flex",
          margin: 20,
          padding: 10,
          borderRadius: 10,
          position: "absolute",
          backgroundColor: "white",
          width: "90%",
          zIndex: 2,
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          height: 50,
          marginVertical: 20,
          marginHorizontal: 20,

          backgroundColor: arrived ? "#43ce51" : "gray",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",

          borderRadius: 10,
        }}
        disabled={!arrived}
        // onPress={handleSubmit}
      >
        <Text style={{ color: "white", alignSelf: "center" }}>Arrived</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DriveTripScreen;
