import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { Component } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CardView = () => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/sedan.jpg")}
        style={{
          height: hp(30),
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255, 0, 0,0.3)",
            height: hp(30),
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#FFFFFF",
              fontSize: 30,
              backgroundColor: "transparent",
              opacity: 0.8,
            }}
          >
            SEDAN
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CardView;
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
});
