import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";

import { useNavigation } from "@react-navigation/native";
import { getLocalStorage } from "../utils/LocalStorage";
import { getPostCall } from "../utils/API";
import { LoadingOverlay } from "../components/Overlays";

const Landing = () => {
  const navigation = useNavigation();
  const [bool, setBool] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const get = async () => {
    const user = await getLocalStorage("user");
    console.log("User", user);
    if (user != null) {
      const body = {
        token: user?.token,
      };

      getPostCall("verifyToken/verifyAuth", "POST", JSON.stringify(body), "")
        .then((e) => {
          console.log(e?.data);
          if (e?.data.success) {
            if (user.userType === "customer") {
              navigation.navigate("HomeScreen");
              setLoader(false);
            }
          } else if (user.userType === "driver") {
            navigation.navigate("DriverScreen");
            setLoader(false);
          }
        })
        .catch((e) => {
          console.log(e.response.data.success);
          setLoader(false);
        });
    }
  };

  React.useEffect(() => {
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
      <LoadingOverlay loading={loader} />
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
