import { Overlay } from "@rneui/base";
import React from "react";
import { ActivityIndicator } from "react-native";

const LoadingOverlay = ({ loading }) => {
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

export default LoadingOverlay;
