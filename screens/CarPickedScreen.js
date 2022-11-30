import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";

export default CarPickedScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
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
          flexDirection: "row",
          justifyContent: "space-between",
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
      ></View>
    </View>
  );
};
