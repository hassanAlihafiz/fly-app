import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React from "react";
import { Image, Text } from "react-native";
import { View } from "react-native";
import BackButton from "../components/common/BackButton";
import GreenButton from "../components/common/GreenButton";
import { ConfirmOverlay, LoadingOverlay } from "../components/Overlays";
import { getPostCall } from "../utils/API";
import { getLocalStorage } from "../utils/LocalStorage";

export default BookingAtStationScreen = () => {
  const navigation = useNavigation();
  const [bookingData, setBookingData] = React.useState();
  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    getBooking();
    setInterval(() => {
      getBooking();
    }, 5000);
  }, []);

  React.useEffect(() => {
    if (bookingData?.bookingStatus == "trip-delivery") {
      navigation.navigate("MyBookingTripDeliveryScreen");
    }
  }, [bookingData]);

  const getBooking = async () => {
    await getLocalStorage("booking_data")
      .then((e) => {
        setBookingData(e);
        setLoader(false);
      })
      .catch((e) => setLoader(false));
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <LoadingOverlay loading={loader} />
      {!loader ? (
        <>
          <View>
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
                {bookingData?.bookType == "Car Wash"
                  ? "DRIVER IS AT CAR WASH STATION"
                  : "DRIVER IS AT GAS STATION"}
              </Text>
              <MaterialIcons
                name="miscellaneous-services"
                size={24}
                color="black"
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,

              width: "100%",
              backgroundColor: "white",
              padding: 10,
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
            {bookingData?.bookType == "Car Wash" ? (
              <>
                <Image
                  source={require("../assets/car-wash.png")}
                  style={{ height: 200, width: "100%" }}
                />
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  Your car is at the car wash station for car wash
                </Text>
              </>
            ) : (
              <>
                <Image
                  source={require("../assets/refueller.png")}
                  style={{ height: 200, width: "100%" }}
                />
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  Your car is at the gas station for refuelling
                </Text>
              </>
            )}
          </View>
        </>
      ) : null}
    </View>
  );
};
