import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { Component } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const DateView = ({ name, img, color }) => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      {/* <ImageBackground
        source={img}
        style={{
          height: hp(30),
          width: "100%",
          justifyContent: "center",
        }}
      > */}
        <View
          style={{
            backgroundColor: color,
            height: hp(20),
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
            {name}
          </Text>
        </View>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};

export default DateView;
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
});
