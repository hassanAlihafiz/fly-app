import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import React, { Component } from "react";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const ServiceCard = ({ name, price }) => {
  return (
    <ImageBackground
      source={require("../assets/images.jpg")}
      style={{
        width: widthPercentageToDP(85),
        height: heightPercentageToDP(30),
        backgroundColor: "black",
        marginHorizontal: 10,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 30,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 22,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
          <TouchableOpacity
            style={{
              height: 30,
              backgroundColor: "#43ce51",
              justifyContent: "center",
              width: "30%",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", alignSelf: "center" }}>
              {"$" + price}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default ServiceCard;
