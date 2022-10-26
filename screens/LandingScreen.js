import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";

import { useNavigation } from "@react-navigation/native";
import { getLocalStorage } from "../utils/LocalStorage";

const Landing = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    async function get() {
      const user = await getLocalStorage("user");

      if (user != null && user.userType === "customer") {
        navigation.navigate("HomeScreen");
      } else if (user != null && user.userType === "driver") {
        navigation.navigate("DriverScreen");
      }
    }
    get();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ff0000",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/LandingPage.png")}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Login", { loginAs: "customer", other: "tt" })
        }
        style={{
          width: "70%",
          backgroundColor: "black",
          borderRadius: 30,
          justifyContent: "center",
          height: 50,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>Login as Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Login", {
            loginAs: "driver",
          })
        }
        style={{
          width: "70%",
          height: 50,
          backgroundColor: "black",
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>Login as Driver</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Landing;
