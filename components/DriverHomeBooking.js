import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View, Image } from "react-native";
import { getPostCall } from "../utils/API";
import { getLocalStorage } from "../utils/LocalStorage";
import { LoadingOverlay } from "./Overlays";

export default DriverHomeBooking = ({ data, loading }) => {
  const navigation = useNavigation();
  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    console.log(data?.bookingStatus);
    if (data?.bookingStatus == "trip_started") {
      navigation.navigate("TripScreen", { bookingData: data });
    } else if (data?.bookingStatus == "arrived_for_pickup") {
      navigation.navigate("PickCarScreen", { bookingData: data });
    } else if (data?.bookingStatus == "trip_to_station") {
      navigation.navigate("TripStationScreen", { bookingData: data });
    } else if (data?.bookingStatus == "at_station") {
      navigation.navigate("AtStationScreen", { bookingData: data });
    } else if (data?.bookingStatus == "trip-delivery") {
      navigation.navigate("TripDeliveryScreen", { bookingData: data });
    } else if (data?.bookingStatus == "delivery") {
      navigation.navigate("DriverCustomerConfirm", { bookingData: data });
    }
  }, []);

  const handleClick = async () => {
    setLoader(true);
    const user = await getLocalStorage("user");

    await getPostCall(
      "trip/tripStarted",
      "POST",
      JSON.stringify({ id: data?.id, noti_token: data?.userData?.noti_token }),
      user?.token
    )
      .then((e) => {
        setLoader(false);
        navigation.navigate("TripScreen", { bookingData: data });
      })
      .catch((e) => {
        setLoader(false);
        console.log("catch", e);
      });
  };

  return (
    <View style={styles.main}>
      <LoadingOverlay loading={loader} />
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 10 }}>
            <Text>
              {moment
                .unix(data?.dateCreated._seconds)
                .format("MM/DD/YYYY HH:MM")}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {data?.userData?.first_name + " " + data?.userData?.last_name}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {data?.packageData?.name}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {data?.packageData?.type}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              $ {data?.amount}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            source={
              data.carType == "SEDAN"
                ? require("../assets/sedan.jpeg")
                : data.carType == "HATCHBACK"
                ? require("../assets/hackBook.jpeg")
                : data.carType == "MPV"
                ? require("../assets/mpv.jpeg")
                : data.carType == "SUV"
                ? require("../assets/suv.jpeg")
                : null
            }
            style={{ height: 130, width: "100%", borderRadius: 10 }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            height: 40,
            width: 100,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Reject</Text>
        </TouchableOpacity>
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
          <Text style={{ color: "white" }} disabled={loading}>
            Pick up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
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
    marginTop: 5,
    marginBottom: 5,
  },
});
