import React, { useEffect } from "react";
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
import { Alert } from "react-native";
import { Overlay } from "@rneui/base";
import { ActivityIndicator } from "react-native";

const Login = ({ navigation, loginAs }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  console.log(JSON.stringify(data));
  console.log(loginAs);

  const handleLogin = async () => {
    setLoading(true);
    if (data.email == "" || data.password == "") {
      setError({
        value: true,
        message: "Email and password fields can not be empty",
      });
      setLoading(false);
    } else {
      var config = {
        method: "post",
        url: "https://fly-backend.herokuapp.com/users/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      };
      axios(config)
        .then((response) => {
          setLoading(false);
          setError({
            value: true,
            message: "Login Successful",
          });
          console.log(JSON.stringify(response));
          if (response.data.userType === "customer" && loginAs === "customer") {
            navigation.navigate("HomeScreen");
          } else if (
            response.data.userType === "Driver" &&
            loginAs === "Driver"
          ) {
            navigation.navigate("DriverScreen");
          } else {
            setError({
              value: true,
              message: `Please login as a ${response.data.userType.toUpperCase()}`,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError({
            value: true,
            message: "Invalid Credentials",
          });
        });
    }
  };

  return (
    // <KeyboardAvoidingView behavior="padding">
    <View style={{ flex: 1, width: wp("90%"), backgroundColor: "white" }}>
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
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          {error.message}
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 10,
            width: 100,
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
      <Text style={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}>
        - or Log In With -
      </Text>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          justifyContent: "space-between",
          height: 90,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

            width: wp("80%"),
          }}
        >
          <View
            style={{
              borderTopLeftRadius: 5,
              backgroundColor: "#d7d7d7",
              borderBottomLeftRadius: 5,
            }}
          >
            <Feather
              name="mail"
              size={24}
              color="#737373"
              style={{
                alignSelf: "center",
                height: 40,
                paddingTop: 7,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
          </View>
          <TextInput
            value={data.email}
            onChangeText={(e) =>
              setData({
                ...data,
                email: e.toLowerCase(),
              })
            }
            keyboardType="email-address"
            placeholder="yours@example.com"
            autoComplete="email"
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: "#d7d7d7",
              width: wp("70%"),
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 30,
            width: wp("80%"),
          }}
        >
          <View
            style={{
              borderTopLeftRadius: 5,
              backgroundColor: "#d7d7d7",
              borderBottomLeftRadius: 5,
            }}
          >
            <MaterialIcons
              name="lock-outline"
              size={24}
              color="#737373"
              style={{
                alignSelf: "center",
                height: 40,
                paddingTop: 7,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
          </View>
          <TextInput
            value={data.password}
            onChangeText={(e) =>
              setData({
                ...data,
                password: e,
              })
            }
            keyboardType="visible-password"
            secureTextEntry={true}
            placeholder="yours password"
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: "#d7d7d7",
              width: wp("70%"),
              paddingLeft: 10,
              paddingRight: 10,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
        </View>
      </View>
      <Text
        style={{
          alignSelf: "center",
          textDecorationLine: "underline",
          fontStyle: "italic",
        }}
      >
        Don't remember your password?
      </Text>
      <TouchableOpacity
        style={{
          height: 50,
          width: wp("90%"),
          backgroundColor: "#ef9c00",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
        onPress={handleLogin}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 15,
            color: "white",
          }}
        >
          LOG IN
        </Text>
      </TouchableOpacity>
    </View>
    // </KeyboardAvoidingView>
  );
};

export default Login;
