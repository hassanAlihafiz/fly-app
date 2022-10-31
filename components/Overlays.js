import { Overlay } from "@rneui/base";
import React from "react";
import { ActivityIndicator } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export const MessageOverlay = ({ value, message, setValue }) => {
  return (
    <Overlay
      isVisible={value}
      overlayStyle={{
        padding: 20,
        width: 250,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome name="warning" size={30} color="#D4B401" />
      <Text style={overlayStyle.text}>{message}</Text>
      <TouchableOpacity
        style={overlayStyle.btn}
        onPress={() =>
          setValue({
            value: false,
            message: "",
          })
        }
      >
        <Text style={{ color: "white" }}>Close</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export const LoadingOverlay = ({ loading }) => {
  return (
    <Overlay
      isVisible={loading}
      overlayStyle={{
        padding: 20,

        backgroundColor: "white",
        borderRadius: 10,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </Overlay>
  );
};

export const SuccessOverlay = ({ value, message }) => {
  return (
    <Overlay
      isVisible={value}
      overlayStyle={{
        padding: 20,

        backgroundColor: "white",
        borderRadius: 10,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome name="check-circle" size={30} color="green" />
      <Text style={overlayStyle.text}>{message}</Text>
    </Overlay>
  );
};

const overlayStyle = StyleSheet.create({
  text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    marginTop: 10,
    width: "100%",
    height: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
