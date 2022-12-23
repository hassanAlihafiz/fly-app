import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import BackButton from "../components/common/BackButton";
import GreenButton from "../components/common/GreenButton";
import {
  ConfirmOverlay,
  LoadingOverlay,
  MessageOverlay,
  SuccessOverlay,
} from "../components/Overlays";
import { getCall, getPostCall } from "../utils/API";
import { getLocalStorage } from "../utils/LocalStorage";

export default DriverCustomerConfirm = ({ route }) => {
  const navigation = useNavigation();
  const { bookingData } = route.params;

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });
  const [onSumbit, setOnSubmit] = React.useState(false);

  React.useEffect(() => {
    getBooking();
    setInterval(() => {
      getBooking();
    }, 1000);
  }, []);

  const getBooking = async () => {
    await getLocalStorage("booking_data")
      .then((e) => {
        setBookingData(e);
      })
      .catch((e) => console.log("error getting data from local"));
  };

  const handleClick = async () => {
    setLoading(true);
    const user = await getLocalStorage("user");
    await getCall(
      `booking/getBookingByBookingId?id=${bookingData?.id}`,
      user?.token
    )
      .then(async (e) => {
        if (e?.data?.carHandedToDriver == false) {
          await getPostCall(
            "trip/delivered",
            "POST",
            JSON.stringify({
              id: bookingData?.id,
              noti_token: bookingData?.userData?.noti_token,
            }),
            user?.token
          )
            .then((e) => {
              setLoading(false);
              setOnSubmit(true);
              setTimeout(() => {
                setOnSubmit(false);

                navigation.navigate("FirstHome", { bookingData });
              }, 5000);
            })
            .catch((e) => {
              setLoading(false);
              console.log("catch", e);
            });
        } else {
          console.log(e?.data?.carHandedToDriver);
          setLoading(false);
          setError({
            value: true,
            message: "Please wait for the Customer to confirm",
          });
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
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
      <MessageOverlay
        value={error.value}
        setValue={setError}
        message={error.message}
      />
      <SuccessOverlay
        value={onSumbit}
        message="Thank you so much for being a part of FLY"
      />
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
            Deliver the Car
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
        <Image
          source={require("../assets/car-deliver.png")}
          style={{ height: 300, width: "100%" }}
        />
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          Please return the car to the customer and wait for the customer's
          confirmation
        </Text>
      </View>

      <GreenButton
        text="Complete Booking"
        disabled={loading}
        loading={loading}
        width="100%"
        onPress={handleClick}
      />
    </View>
  );
};
