import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";

import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import BackButton from "../components/common/BackButton";
import GreenButon from "../components/common/GreenButton";
import { LoadingOverlay, MessageOverlay } from "../components/Overlays";
import { getCall, getPostCall } from "../utils/API";
import { getLocalStorage } from "../utils/LocalStorage";

export default CarPickedScreen = ({ route }) => {
  const { bookingData } = route.params;
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });

  const handleClick = async () => {
    setLoading(true);
    const user = await getLocalStorage("user");
    await getCall(
      `booking/getBookingByBookingId?id=${bookingData?.id}`,
      user?.token
    )
      .then(async (e) => {
        console.log(e?.data?.carHandedToDriver);
        if (e?.data?.carHandedToDriver) {
          await getPostCall(
            "trip/tripToStation",
            "POST",
            JSON.stringify({
              id: bookingData?.id,
              noti_token: bookingData?.userData?.noti_token,
            }),
            user?.token
          )
            .then((e) => {
              setLoading(false);
              navigation.navigate("TripStationScreen", { bookingData });
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
            Meet Customer
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
          Wait for the customer to hand over the car to you
        </Text>
      </View>
      <GreenButon
        text="Vehicle Received"
        disabled={loading}
        loading={loading}
        width="100%"
        onPress={handleClick}
      />
    </View>
  );
};
