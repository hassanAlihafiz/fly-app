import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import BookingMap from "../components/common/BookingMap";
import DirectionsMap from "../components/common/DirectionsMap";
import DriverMapCard from "../components/common/DriverMapCard";
import { LoadingOverlay } from "../components/Overlays";
import { getCall } from "../utils/API";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";

export default function BookingTripStation() {
  const navigation = useNavigation();
  const [bookingData, setBookingData] = React.useState();
  const [loader, setLoader] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [arrived, setArrived] = React.useState(false);
  const [duration, setDuration] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [fitToBound, setFitToBound] = React.useState(false);
  const [customerLocation, setCustomerLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [driverLocation, setDriverLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  React.useEffect(() => {
    getBooking();
    setInterval(() => {
      getBooking();
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (bookingData?.bookingStatus == "at_station") {
      navigation.navigate("MyBookingAtStationScreen");
    }
  }, [bookingData]);

  const getBooking = async () => {
    await getLocalStorage("booking_data")
      .then((e) => {
        setBookingData(e);
        const coords = e?.washStation?.geometry?.location;

        if (
          e?.driverData?.lat != undefined &&
          e?.driverData?.lng != undefined
        ) {
          setDriverLocation({
            latitude: e?.driverData?.lat,
            longitude: e?.driverData?.lng,
          });
        }
        setCustomerLocation({
          latitude: Number(coords?.lat),
          longitude: Number(coords?.lng),
        });
        setLoader(false);
      })
      .catch((e) => setLoader(false));
  };

  return (
    <View>
      <LoadingOverlay loading={loader} />
      <BookingMap
        loading={loading}
        coords={[driverLocation, customerLocation]}
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
        text="Driver is on the way to station"
        duration={duration}
        distance={distance}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          bottom: 30,
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
    </View>
  );
}
