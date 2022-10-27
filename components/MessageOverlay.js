import { Overlay } from "@rneui/base";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const MessageOverlay = ({ value, message, setValue }) => {
  console.log(value);
  console.log(message);
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
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        {message}
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 10,
          width: "100%",
          height: 40,
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
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

export default MessageOverlay;
