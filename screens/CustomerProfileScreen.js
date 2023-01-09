import React from "react";
import { Text, View } from "react-native";
import Profile from "../components/Profile";

export default CustomerProfileScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Profile title="Customer Profile" />
    </View>
  );
};
