import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Overlay } from "@rneui/base";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import BackButton from "../components/common/BackButton";
import GreenButton from "../components/common/GreenButton";
import { ConfirmOverlay } from "../components/Overlays";

const AtStationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { bookingData } = route.params;
  const [showOverlay, setShowOverlay] = React.useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
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
            {bookingData.bookType == "Car Wash"
              ? "GET THE CAR WASHED"
              : "REFUEL THE CAR"}
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
        {bookingData.bookType == "Car Wash" ? (
          <>
            <Image
              source={require("../assets/car-wash.png")}
              style={{ height: 200, width: "100%" }}
            />
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Get the car washed by a car wash service
            </Text>
          </>
        ) : (
          <>
            <Image
              source={require("../assets/refueller.png")}
              style={{ height: 200, width: "100%" }}
            />
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Get the car gas filled in a gas station
            </Text>
          </>
        )}
      </View>
      <GreenButton
        text="Proceed"
        // disabled={approved || loading}
        // loading={loading}
        width="100%"
        onPress={toggleOverlay}
      />
      <ConfirmOverlay
        show={showOverlay}
        onClose={toggleOverlay}
        onOK={() => {
          setShowOverlay(false);
          navigation.navigate("TripDeliveryScreen", { bookingData });
        }}
      />
    </View>
  );
};

export default AtStationScreen;
