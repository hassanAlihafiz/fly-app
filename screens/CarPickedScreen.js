import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";

import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import BackButton from "../components/common/BackButton";
import GreenButon from "../components/common/GreenButton";

export default CarPickedScreen = ({ route }) => {
  const { bookingData } = route.params;
  const navigation = useNavigation();
  const [approved, setApproved] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
        disabled={approved || loading}
        loading={loading}
        width="100%"
        onPress={() =>
          navigation.navigate("TripStationScreen", { bookingData })
        }
      />
    </View>
  );
};
