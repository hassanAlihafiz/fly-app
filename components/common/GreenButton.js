import React from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

export default GreenButton = ({
  text,
  loading,
  onPress,
  disabled,
  width,
  margin,
}) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 0,
        height: 50,
        marginVertical: 20,
        marginHorizontal: 20,
        backgroundColor: disabled ? "#E9E9EA" : "#43ce51",
        margin: margin,

        justifyContent: "center",
        alignItems: "center",
        width: width,

        borderRadius: 10,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ color: "white", alignSelf: "center" }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
