import { View, Text } from "react-native";
import React from "react";
import Profile from "../components/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DriverProfile = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Profile title="Driver Profile" />
    </View>
  );
};

export default DriverProfile;
