import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const Landing = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => navigation.navigate("Login"), 5000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ff0000",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/LandingPage.png")}
        style={{
          width: 300,
          height: 300,
        }}
      />
    </View>
  );
};
export default Landing;
