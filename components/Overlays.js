import { Overlay } from "@rneui/base";
import React from "react";
import { ActivityIndicator } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export const MessageOverlay = ({ value, message, setValue }) => {
  return (
    <Overlay
      isVisible={value}
      overlayStyle={{
        padding: 20,
        width: "90%",
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

export const LoadingOverlay = ({ loading, text }) => {
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
      {text == undefined ? null : <Text style={overlayStyle.text}>{text}</Text>}
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

export const ConfirmOverlay = ({ value, onClose, onOK }) => {
  return (
    <Overlay
      isVisible={value}
      overlayStyle={{
        margin: 20,
        padding: 20,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome name="warning" size={30} color="#D4B401" />
      <Text
        style={{
          marginTop: 10,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Please confirm that the process is completed
      </Text>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "red",
            borderRadius: 10,
            alignItems: "center",
            width: 100,
          }}
          onPress={onClose}
        >
          <Entypo name="cross" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "green",
            borderRadius: 10,
            alignItems: "center",
            width: 100,
          }}
          onPress={onOK}
        >
          <Entypo name="check" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
