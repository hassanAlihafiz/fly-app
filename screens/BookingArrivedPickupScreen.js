import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import BackButton from "../components/common/BackButton";
import GreenButton from "../components/common/GreenButton";
import {
  ConfirmOverlay,
  LoadingOverlay,
  MessageOverlay,
} from "../components/Overlays";
import { getPostCall } from "../utils/API";
import { getLocalStorage } from "../utils/LocalStorage";

export default function BookingArrivedPickupScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [bookingData, setBookingData] = React.useState();
  const [confirm, setConfirm] = React.useState(false);

  React.useEffect(() => {
    getBooking();
    setInterval(() => {
      getBooking();
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (bookingData?.bookingStatus == "trip_to_station") {
      navigation.navigate("MyBookingTripStationScreen");
    }
  }, [bookingData]);

  const getBooking = async () => {
    await getLocalStorage("booking_data")
      .then((e) => {
        setBookingData(e);
      })
      .catch((e) => {
        console.log("error getting data from local");
      });
  };

  const handleClick = async () => {
    console.log("active");
    setConfirm(false);
    setLoading(true);
    const user = await getLocalStorage("user");
    console.log("user", user?.token);
    console.log("booking id", bookingData?.id);
    await getPostCall(
      "trip/carHandedToDriver",
      "POST",
      JSON.stringify({
        id: bookingData?.id,
      }),
      user?.token
    )
      .then((e) => {
        setLoading(false);
        console.log("success");
      })
      .catch((e) => {
        setLoading(false);
        console.log("catch", e);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <LoadingOverlay loading={loading} />
      <ConfirmOverlay
        value={confirm}
        onClose={() => setConfirm(false)}
        onOK={() => handleClick()}
      />
      <View>
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
            Meet Driver
          </Text>
          <FontAwesome name="handshake-o" size={24} color="black" />
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,

          width: "100%",
          backgroundColor: "white",
          padding: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowOpacity: 0.13,
          shadowRadius: 4,

          elevation: 20,
        }}
      >
        <Image
          source={require("../assets/hand-shake.png")}
          style={{ height: 200, width: "100%" }}
        />
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          Hand over the car to the driver and hit proceed to continue
        </Text>
      </View>
      <GreenButton
        text="Proceed"
        // disabled={approved || loading}
        // loading={loading}
        width="100%"
        onPress={() => setConfirm(true)}
      />
    </View>
  );
}
