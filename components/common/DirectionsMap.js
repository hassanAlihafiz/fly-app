import React from "react";
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as geolib from "geolib";

const GOOGLE_API_KEY = "AIzaSyBIHr09mmQOV8a0LybJlTt39_8U4_1NokY";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = Platform.OS == "android" ? 0.0122 : 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default DirectionsMap = ({
  loading,
  coords,
  setLoading,
  setDistance,
  setDuration,
  setArrived,
  radius,
  fitToBound,
  setFitToBound,
}) => {
  const map = React.useRef(null);
  const [count, setCount] = React.useState(0);
  const [center, setCenter] = React.useState({
    latitude: null,
    longitude: null,
  });

  React.useEffect(() => {
    if (fitToBound == true) {
      map.current.fitToCoordinates(coords, {
        edgePadding: {
          right: width / 20,
          bottom: height / 20,
          left: width / 20,
          top: height / 20,
        },
        animated: true,
      });

      if (Platform.OS == "android") {
        const center = geolib.getCenter(coords);
        setCenter(center);
      }

      // map.current.fitToSuppliedMarkers(["mk1", "mk2"], {
      //   edgePadding: {
      //     right: width / 20,
      //     bottom: height / 20,
      //     left: width / 20,
      //     top: height / 20,
      //   },
      //   animated: true,
      // });
      // map.current.animateToRegion(
      //   {
      //     latitude: coords[0].latitude,
      //     longitude: coords[0].longitude,
      //     latitudeDelta: LATITUDE_DELTA,
      //     longitudeDelta: LONGITUDE_DELTA,
      //   },
      //   3 * 1000
      // );

      setFitToBound(false);
    }
  }, [fitToBound]);

  return (
    <MapView
      loadingEnabled={loading}
      loadingBackgroundColor="black"
      ref={(e) => (map.current = e)}
      style={mapCSS}
      rotateEnabled={false}
      mapPadding={{ bottom: 70, top: 170, left: 20, right: 20 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: coords[0].latitude,
        longitude: coords[0].longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      region={
        Platform.OS == "android"
          ? {
              latitude: center.latitude,
              longitude: center.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          : undefined
      }
      customMapStyle={loading ? null : mapStyle}
      toolbarEnabled
      onLayout={() => {
        map.current.fitToCoordinates(coords, {
          edgePadding: {
            right: width / 20,
            bottom: height / 20,
            left: width / 20,
            top: height / 20,
          },
        });
      }}
      // onMapReady={() => {
      //   map.current.fitToSuppliedMarkers(["mk1", "mk2"], {
      //     edgePadding: {
      //       right: width / 20,
      //       bottom: height / 20,
      //       left: width / 20,
      //       top: height / 20,
      //     },
      //     animated: true,
      //   });
      // }}
    >
      <MapViewDirections
        origin={coords[0]}
        destination={coords[1]}
        apikey={GOOGLE_API_KEY}
        strokeWidth={3}
        strokeColor="#111111"
        optimizeWaypoints
        onReady={(result) => {
          if (count == 0) {
            const center = geolib.getCenter(coords);

            setCenter(center);
            setLoading(false);
            setCount(1);
          }
          setDistance(result.distance);
          setDuration(Math.round(result.duration));
          if (result.distance <= radius) {
            setArrived(true);
          } else {
            setArrived(false);
          }
        }}
      />

      <Marker identifier="mk1" coordinate={coords[0]} pinColor={"blue"} />
      <Marker
        identifier="mk2"
        coordinate={coords[1]}
        title="Destination"
        description="Destination"
        pinColor={"green"}
      ></Marker>
    </MapView>
  );
};

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

const mapCSS = {
  height: "100%",
  width: "100%",
};
