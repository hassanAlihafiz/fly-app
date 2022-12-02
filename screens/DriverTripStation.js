import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { Dimensions, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import BackButton from "../components/common/BackButton";
import GreenButton from "../components/common/GreenButton";
import { getLocalStorage } from "../utils/LocalStorage";

const GOOGLE_API_KEY = "AIzaSyBIHr09mmQOV8a0LybJlTt39_8U4_1NokY";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const mapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

export default DriverTripStation = ({ route }) => {
  const navigation = useNavigation();
  const { bookingData } = route.params;
  const [loading, setLoading] = React.useState(true);
  const [arrived, setArrived] = React.useState(false);
  const [duration, setDuration] = React.useState("");
  const [distance, setDistance] = React.useState("");

  const coords = bookingData?.washStation?.geometry?.location;
  const map = React.useRef(null);

  const [driverLocation, setDriverLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [coordinates, setCoordinates] = React.useState({
    latitude: Number(coords.lat),
    longitude: Number(coords.lng),
  });

  React.useEffect(() => {
    getdriverCoords();
  }, []);

  React.useEffect(() => {
    // setInterval(() => {
    // getArrivalDistance();
    getdriverCoords();
    // }, 5000);
  }, [driverLocation]);

  const getdriverCoords = async () => {
    const driverCoords = await getLocalStorage("driver_coords");

    setDriverLocation({
      latitude: driverCoords.coords.latitude,
      longitude: driverCoords.coords.longitude,
    });
    setLoading(false);
  };

  return (
    <View>
      {!loading ? (
        <MapView
          ref={(e) => (map.current = e)}
          provider={PROVIDER_GOOGLE}
          style={{ height: "100%", width: "100%" }}
          mapPadding={{ bottom: 100, top: 200 }}
          initialRegion={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          customMapStyle={mapStyle}
        >
          <MapViewDirections
            origin={driverLocation}
            destination={coordinates}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="#111111"
            onReady={(result) => {
              setDistance(result.distance);
              setDuration(Math.round(result.duration));

              if (result.distance <= 300) {
                setArrived(true);
              } else {
                setArrived(false);
              }

              map.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
          />
          <Marker
            identifier="mk1"
            coordinate={driverLocation}
            pinColor={"blue"}
          />
          <Marker identifier="mk2" coordinate={coordinates} pinColor={"blue"} />
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
        <BackButton />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{ marginVertical: 10, fontSize: 20, fontWeight: "bold" }}
          >
            Go to {bookingData.packageData.type} Station
          </Text>
          <MaterialCommunityIcons
            name="navigation-variant"
            size={24}
            color="black"
          />
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginRight: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {duration} min
                </Text>
                <AntDesign name="clockcircle" size={20} color="black" />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginRight: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {distance} km
                </Text>
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={20}
                  color="black"
                />
              </View>
            </View>
          </>
        )}
      </View>
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
