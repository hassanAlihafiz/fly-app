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

const DriveTripScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [arrived, setArrived] = React.useState(false);
  const [duration, setDuration] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const map = React.useRef(null);
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

  // const getArrivalDistance = async () => {
  //   await axios
  //     .get(
  //       "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
  //         driverLocation.latitude +
  //         "," +
  //         driverLocation.longitude +
  //         "&destinations=" +
  //         coordinates.latitude +
  //         "," +
  //         coordinates.longitude +
  //         "&units=imperial&key=" +
  //         GOOGLE_API_KEY
  //     )
  //     .then((e) => {
  //       const dis = e?.data?.rows[0]?.elements[0].distance?.value;
  //       const disText = e?.data?.rows[0]?.elements[0].distance?.text;
  //       const dur = e?.data?.rows[0]?.elements[0].duration?.text;
  //       if (dis <= 500) {
  //         setArrived(true);
  //       }
  //       setDistance(disText);
  //       setDuration(dur);
  //       setLoading(false);
  //     })
  //     .catch((e) => console.log(e));
  // };

  return (
    <View style={{ height: "100%" }}>
      {!loading ? (
        <MapView
          // showsUserLocation
          // showsMyLocationButton
          // followsUserLocation
          ref={(e) => (map.current = e)}
          style={{ height: "100%", width: "100%" }}
          mapPadding={{ bottom: 100, top: 200 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
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
          <Marker
            identifier="mk2"
            coordinate={coordinates}
            title="Destination"
            description="Destination"
          >
            {/* <MaterialCommunityIcons
              name="map-marker-account"
              size={40}
              color="red"
            /> */}
            <MaterialCommunityIcons
              name="map-marker-check"
              size={40}
              color="green"
            />
            {/* <MaterialIcons name="location-history" size={40} color="red" /> */}
          </Marker>
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
            Car Pickup
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

export default DriveTripScreen;
