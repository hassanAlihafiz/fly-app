import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FacebookSocialButton } from "react-native-social-buttons";
import { GoogleSocialButton } from "react-native-social-buttons/src/buttons/GoogleSocialButton";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { ActivityIndicator } from "react-native";
import { getCall, getPostCall } from "../utils/API";
import { Overlay } from "@rneui/base";

import { LocalStorage } from "../utils/LocalStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = ({ navigation, loginAs }) => {
  const [loading, setLoading] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });

  React.useEffect(() => {
    async function get() {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    }
    get();
  }, []);

  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    userType: loginAs,
    zipCodeId: "",
    available: true,
  });

  const [zipData, setZipData] = React.useState([]);

  const handleData = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(JSON.stringify(data));
  const handleSignup = async () => {
    if (
      data.first_name == "" ||
      data.last_name == "" ||
      data.email == "" ||
      data.password == "" ||
      data.zip == ""
    ) {
      setError({
        value: true,
        message: "Fields can not be empty",
      });
      setLoader(false);
    } else {
      getPostCall("users/register", "POST", JSON.stringify(data), "")
        .then((e) => {
          setLoading(false);
          setError({
            value: true,
            message: `User Successfully Registered`,
          });
          if (loginAs === "customer") {
            navigation.navigate("HomeScreen");
          } else if (loginAs === "driver") {
            navigation.navigate("DriverScreen");
          }
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          setError({
            value: true,
            message: "ERROR",
          });
        });
    }
  };

  const getZipCode = () => {
    getCall("zipCode/getZipCodes", "GET", "")
      .then((e) => {
        setZipData(e?.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    getZipCode();
  }, []);

  return (
    <View style={{ flex: 1, width: wp("90%"), backgroundColor: "white" }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Overlay
            isVisible={loader}
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
          <Overlay
            isVisible={error.value}
            overlayStyle={{
              padding: 20,
              width: 200,

              backgroundColor: "white",
              borderRadius: 10,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              {error.message}
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
                setError({
                  value: false,
                  message: "",
                })
              }
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </Overlay>
          <FacebookSocialButton
            buttonViewStyle={{
              alignSelf: "center",
              width: wp("80%"),
              justifyContent: "flex-start",
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <GoogleSocialButton
            buttonViewStyle={{
              alignSelf: "center",
              width: wp("80%"),
              justifyContent: "flex-start",
              marginTop: 10,
              marginBottom: 10,
              backgroundColor: "#d7d7d7",
            }}
          />
          <Text
            style={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}
          >
            - or Register With Email-
          </Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: wp("80%"),
                justifyContent: "space-between",
              }}
            >
              <TextInput
                placeholder="First Name"
                autoComplete="name"
                onChangeText={(e) => handleData("first_name", e)}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                  height: 40,
                  borderWidth: 1,
                  borderColor: "#d7d7d7",
                  width: "48%",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                }}
              />

              <TextInput
                placeholder="Last Name"
                autoComplete="name"
                onChangeText={(e) => handleData("last_name", e)}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,

                  height: 40,
                  borderWidth: 1,
                  borderColor: "#d7d7d7",
                  width: "48%",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                }}
              />
            </View>
            <TextInput
              placeholder="Email"
              autoComplete="email"
              onChangeText={(e) => handleData("email", e)}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,

                height: 40,
                borderWidth: 1,
                borderColor: "#d7d7d7",
                width: wp("80%"),
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 5,
              }}
            />

            <TextInput
              placeholder="Password"
              keyboardType="visible-password"
              onChangeText={(e) => handleData("password", e)}
              secureTextEntry={true}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,

                height: 40,
                borderWidth: 1,
                borderColor: "#d7d7d7",
                width: wp("80%"),
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,

                height: 40,
                borderWidth: 1,
                borderColor: "#d7d7d7",
                width: wp("80%"),
                padding: 10,

                borderRadius: 5,
              }}
            >
              <RNPickerSelect
                style={{
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                  color: "black",
                  paddingRight: 30,
                }}
                onValueChange={(e) => handleData("zipCodeId", e.toString())}
                items={zipData.map((value) => {
                  return {
                    label: `${value.name}`,
                    value: value.id,
                  };
                })}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: wp("90%"),
              backgroundColor: "#ef9c00",
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={handleSignup}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 15,
                color: "white",
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Signup;
