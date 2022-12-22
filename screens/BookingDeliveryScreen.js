import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import BackButton from "../components/common/BackButton";

export default BookingDeliveryScreen = () => {
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
    </View>
  );
};
