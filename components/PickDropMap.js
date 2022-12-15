import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StackRouter, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MapView, {
  MarkerAnimated,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from "react-native-maps";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { FontAwesome5 } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getLocalStorage } from "../utils/LocalStorage";
import { LoadingOverlay } from "./Overlays";

const PickDropMap = ({ route }) => {
  const { packageData, serviceFee, total, gasStation, carType, numOfGal } =
    route.params;

  const navigation = useNavigation();
  const [loader, setLoader] = React.useState(true);
  const [locationSearch, setLocationSearch] = React.useState(false);
  const [locationState, setLocationState] = React.useState({
    latitude: locationState?.latitude,
    longitude: locationState?.longitude,
  });

  React.useEffect(() => {
    if (loader == true) {
      getUserCoords();
    }
  }, []);

  const getUserCoords = async () => {
    const _location = await getLocalStorage("UserCoords");
    console.log("Loc", _location);
    if (_location != null) {
      setLocationState({
        ...locationState,
        latitude: _location.latitude,
        longitude: _location.longitude,
      });
      console.log("Yes", parseFloat(_location?.latitude));
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    } else {
      setLoader(false);
    }
  };
  const handleSubmit = () => {
    if (packageData.type == "Gas") {
      navigation.navigate("SelectDriver", {
        packageData: packageData,
        gasStation: gasStation,
        serviceFee: serviceFee,
        carType: carType,
        total: total,
        numOfGal: numOfGal,
        lat: locationState.latitude,
        lng: locationState.longitude,
      });
    } else {
      navigation.navigate("SelectWashStations", {
        packageData: packageData,
        serviceFee: serviceFee,
        total: total,
        carType: carType,
        lat: locationState.latitude,
        lng: locationState.longitude,
      });
    }
  };

  return (
    <View>
      {loader ? (
        <LoadingOverlay loading />
      ) : (
        <MapView
          // ref={(e) => console.log("onchange", e)}
        
          showsUserLocation
          followsUserLocation
          mapPadding={{ bottom: 70 }}
          rotateEnabled={false}
          showsMyLocationButton
          provider={PROVIDER_GOOGLE}
          style={{ height: "100%", width: "100%" }}
          userInterfaceStyle={"dark"}
          userLocationPriority={"high"}
          showsPointsOfInterest={false}
          showsIndoors={false}
          showsBuildings={false}
          // initialRegion={{
          //   latitude: 0,
          //   longitude: 0,
          // }}

          initialRegion={{
            latitude: locationState.latitude,
            longitude: locationState.longitude,
            latitudeDelta: locationState.latitudeDelta,
            longitudeDelta: locationState.longitudeDelta,
          }}
          onRegionChange={(e) => {
            setLocationState({
              latitude: e.latitude,
              longitude: e.longitude,
              latitudeDelta: e.latitudeDelta,
              longitudeDelta: e.longitudeDelta,
            });
          }}
        >
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: 0,
              bottom: 100,
              left: 0,
              right: -1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <FontAwesome5 name="map-marker-alt" size={30} color="red" />
          </View>
        </MapView>
      )}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Pickup Location
          </Text>
          <FontAwesome name="location-arrow" size={24} color="black" />
        </View>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          enableHighAccuracyLocation
          fetchDetails={true}
          placeholder="Search"
          onPress={(data, details = null) => {
            setLoader(true);
            console.log(details.geometry.location);
            setLocationState({
              latitude: details?.geometry?.location.lat,
              longitude: details?.geometry?.location.lng,
            });
            setLoader(false);
          }}
          query={{
            key: "AIzaSyBIHr09mmQOV8a0LybJlTt39_8U4_1NokY",
            language: "en",
            // types: packageData.type === "Gas" ? "gas_station" : "car_wash",
            radius: "15000",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          GooglePlacesSearchQuery={{
            rankby: "distance",
            // type: packageDta.type === "Gas" ? "gas_station" : "car_wash",
            radius: "15000",
            openNow: true,
          }}
          textInputProps={{
            InputComp: TextInput,
            style: {
              width: "100%",
              height: 40,
              borderWidth: 1,
              borderColor: "#d7d7d7",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderRadius: 5,
            },
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          height: 50,
          marginVertical: 20,
          marginHorizontal: 20,

          backgroundColor: "#43ce51",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",

          borderRadius: 10,
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "white", alignSelf: "center" }}>
          Confirm pickup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickDropMap;

// customMapStyle={[
//   {
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#242f3e",
//       },
//     ],
//   },
//   {
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#746855",
//       },
//     ],
//   },
//   {
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#242f3e",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.locality",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#d59563",
//       },
//     ],
//   },
//   {
//     featureType: "poi",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "poi",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#d59563",
//       },
//     ],
//   },
//   {
//     featureType: "poi.business",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "poi.business.gas_station",

//     stylers: [
//       {
//         visibility: "on",
//       },
//     ],
//   },
//   {
//     featureType: "poi.park",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#263c3f",
//       },
//     ],
//   },
//   {
//     featureType: "poi.park",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#6b9a76",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#38414e",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         color: "#212a37",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#9ca5b3",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#746855",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         color: "#1f2835",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#f3d19c",
//       },
//     ],
//   },
//   {
//     featureType: "transit",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#2f3948",
//       },
//     ],
//   },
//   {
//     featureType: "transit.station",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#d59563",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#17263c",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#515c6d",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#17263c",
//       },
//     ],
//   },

// {
//   elementType: "geometry",
//   stylers: [
//     {
//       color: "#212121",
//     },
//   ],
// },
// {
//   elementType: "labels.icon",
//   stylers: [
//     {
//       color: "#ff0000",
//     },
//   ],
// },
// {
//   elementType: "labels.text.fill",
//   stylers: [
//     {
//       color: "#757575",
//     },
//   ],
// },
// {
//   elementType: "labels.text.stroke",
//   stylers: [
//     {
//       color: "#212121",
//     },
//   ],
// },
// {
//   featureType: "administrative",
//   elementType: "geometry",
//   stylers: [
//     {
//       color: "#757575",
//     },
//   ],
// },
// {
//   featureType: "administrative.country",
//   elementType: "labels.text.fill",
//   stylers: [
//     {
//       color: "#9e9e9e",
//     },
//   ],
// },
// {
//   featureType: "administrative.land_parcel",
//   stylers: [
//     {
//       visibility: "off",
//     },
//   ],
// },
// {
//   featureType: "administrative.locality",
//   elementType: "labels.text.fill",
//   stylers: [
//     {
//       color: "#bdbdbd",
//     },
//   ],
// },
// {
//   featureType: "poi",
//   elementType: "labels.text.fill",
//   stylers: [
//     {
//       color: "#757575",
//     },
//   ],
// },
// {
//   featureType: "poi.business.shopping",
//   elementType: "labels.icon",
//   stylers: [
//     {
//       color: "red",
//     },
//   ],
// },
// {
//   featureType: "poi.attraction",
//   stylers: [
//     {
//       visibility: "off",
//     },
//   ],
// },
// {
//   featureType: "poi.park",
//   stylers: [
//     {
//       visibility: "off",
//     },
//   ],
// },
// {
//   featureType: "poi.government",
//   stylers: [
//     {
//       visibility: "off",
//     },
//   ],
// },
// {
//   featureType: "poi.medical",
//   stylers: [
//     {
//       visibility: "off",
//     },
//   ],
// },
// {
//   featureType: "poi.place_of_worship",
//   stylers: [
//     {
//       visibility: "off",
//     },
//   ],
// },
// {
//   featureType: "poi.school",
//   stylers: [
//     {
//       visibility: "off",
//     },
//   ],
// },
// {
//   featureType: "poi.sports_complex",
//   stylers: [
//     {
//       visibility: "off",
//     },
//   ],
// },
// {
//   featureType: "road",
//   elementType: "geometry.fill",
//   stylers: [
//     {
//       color: "#2c2c2c",
//     },
//   ],
// },
// {
//   featureType: "road",
//   elementType: "labels.text.fill",
//   stylers: [
//     {
//       color: "#8a8a8a",
//     },
//   ],
// },
// {
//   featureType: "road.arterial",
//   elementType: "geometry",
//   stylers: [
//     {
//       color: "#373737",
//     },
//   ],
// },
// {
//   featureType: "road.highway",
//   elementType: "geometry",
//   stylers: [
//     {
//       color: "#3c3c3c",
//     },
//   ],
// },
// {
//   featureType: "road.highway.controlled_access",
//   elementType: "geometry",
//   stylers: [
//     {
//       color: "#4e4e4e",
//     },
//   ],
// },
// {
//   featureType: "road.local",
//   elementType: "labels.text.fill",
//   stylers: [
//     {
//       color: "#616161",
//     },
//   ],
// },
// {
//   featureType: "transit",
//   elementType: "labels.text.fill",
//   stylers: [
//     {
//       color: "#757575",
//     },
//   ],
// },
// {
//   featureType: "water",
//   elementType: "geometry",
//   stylers: [
//     {
//       color: "#000000",
//     },
//   ],
// },
// {
//   featureType: "water",
//   elementType: "labels.text.fill",
//   stylers: [
//     {
//       color: "#3d3d3d",
//     },
//   ],
// },
// {
//   featureType: "poi.business",
//   elementType: "geometry",
//   stylers: [
//     {
//       visibility: "on",
//     },
//   ],
// },
// ]}
