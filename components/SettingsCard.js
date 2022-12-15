import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { heightPercentageToDP } from "react-native-responsive-screen";

const SettingsCard = ({ name }) => {
  return (
    <View
      style={{
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        height: heightPercentageToDP(9),
        justifyContent: "center",
        width: "80%",
        marginBottom: 10,
        paddingLeft: 10,
      }}
    >
      <TouchableOpacity>
        <Text
          style={{ color: name === "Log Out" ? "red" : "grey", fontSize: 20 }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SettingsCard;
