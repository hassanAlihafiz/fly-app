import { ScrollView, Text, View } from "react-native";
import React, { Component } from "react";
import SettingsCard from "../components/SettingsCard";

const Settings = () => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center" }}
    >
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <SettingsCard name={"Customer Profile"} />
        <SettingsCard name={"About App"} />
        <SettingsCard name={"Rate the App"} />
        <SettingsCard name={"Report a Problem"} />
        <SettingsCard name={"Terms and Conditions"} />
        <SettingsCard name={"Privacy Policy"} />
        <SettingsCard name={"Log Out"} />
      </ScrollView>
    </View>
  );
};
export default Settings;
