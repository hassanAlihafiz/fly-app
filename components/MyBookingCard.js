import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { getCall } from "../utils/API";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";

export default function MyBookingCard({ index, data, ongoing }) {
  const navigation = useNavigation();
  const [bookingStatus, setBookingStatus] = React.useState(data.bookingStatus);

  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    if (update) {
      setInterval(() => {
        getBooking();
      }, 1000);
    }
  }, [update]);

  const getBooking = async () => {
    const user = await getLocalStorage("user");
    await getCall(`booking/getBookingByBookingId?id=${data?.id}`, user?.token)
      .then(async (e) => {
        await setLocalStorage(
          "booking_data",
          JSON.stringify({ ...e.data, id: data?.id })
        );
        setBookingStatus(e?.data?.bookingStatus);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClick = () => {
    setUpdate(true);
    if (bookingStatus == "trip_started") {
      navigation.navigate("MyBookingTripScreen");
    } else if (bookingStatus == "arrived_for_pickup") {
      navigation.navigate("MyBookingArrivedForPickupScreen");
    } else if (bookingStatus == "trip_to_station") {
      navigation.navigate("MyBookingTripStationScreen");
    } else if (bookingStatus == "at_station") {
      navigation.navigate("MyBookingAtStationScreen");
    } else if (bookingStatus == "trip-delivery") {
      navigation.navigate("MyBookingTripDeliveryScreen");
    } else if (bookingStatus == "delivery") {
      navigation.navigate("MyBookingDeliveryScreen");
    }
  };

  return (
    <View
      style={{
        borderTopColor: index == 0 ? null : "#CCCCCC",
        borderTopWidth: index == 0 ? null : 1,
        margin: 20,
        marginTop: 0,
        paddingTop: 20,
      }}
    >
      <View style={{ flexDirection: "row", width: "100%", marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 10 }}>
            <Text>
              {moment
                .unix(data?.dateCreated._seconds)
                .format("MM/DD/YYYY HH:MM")}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {data?.packageData?.name}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {data?.packageData?.type}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            $ {data?.amount}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {data.bookingStatus == "pending" ? (
          <View style={{ alignItems: "center" }}>
            <Text>Wait for your trip to start</Text>
            <Text>Please refresh the page to update</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              height: 40,
              width: 100,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleClick}
          >
            <Text style={{ color: "white" }}>
              {ongoing ? "View" : "View Details"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
