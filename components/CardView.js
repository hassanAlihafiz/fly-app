import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { Component } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const CardView = ({ name, img }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => navigation.navigate("Main Service", { carType: name })}
    >
      <ImageBackground
        source={img}
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
            {name}
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
