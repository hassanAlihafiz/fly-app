import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FacebookSocialButton } from "react-native-social-buttons";
import { GoogleSocialButton } from "react-native-social-buttons/src/buttons/GoogleSocialButton";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";
import { container, formStyles } from "./styles/FormStyle";
import { LoadingOverlay, MessageOverlay, SuccessOverlay } from "./Overlays";
import { getPostCall } from "../utils/API";

const Login = ({ navigation, loginAs }) => {
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });
  const [success, setSuccess] = React.useState({
    value: false,
    message: "",
  });
  const [data, setData] = React.useState({
    email: "",
    password: "",
    userType: loginAs,
  });

  const handleLogin = async () => {
    const noti_token = await getLocalStorage("noti_token");

    setLoader(true);
    if (data.email == "" || data.password == "") {
      setError({
        value: true,
        message: "Email and password fields can not be empty",
      });
      setLoader(false);
    } else {
      getPostCall("users/login", "POST", JSON.stringify(data))
        .then(async (response) => {
          const _data = response?.data;
          if (response?.data != "Wrong user type") {
            if (_data?.userType === "customer") {
              setLoader(false);
              setSuccess({
                value: true,
                message: "Login Successful",
              });
              setTimeout(() => {
                setSuccess({
                  value: false,
                  message: "",
                });
              }, 2000);
              setLocalStorage("user", JSON.stringify(_data));
              await getPostCall(
                "notification/addNotiToken",
                "POST",
                JSON.stringify({
                  id: _data.id,
                  noti_token: noti_token,
                  userType: _data?.userType,
                }),
                _data?.token
              )
                .then((e) => console.log("noti token added to db"))
                .catch((e) => console.log("error adding noti token to db"));
              navigation.navigate("HomeScreen");
            } else if (_data?.userType === "driver") {
              console.log(_data.status_approved);
              if (_data.status_approved) {
                setLoader(false);
                setSuccess({
                  value: true,
                  message: "Login Successful",
                });
                setTimeout(() => {
                  setSuccess({
                    value: false,
                    message: "",
                  });
                }, 2000);
                setLocalStorage("user", JSON.stringify(_data));
                await getPostCall(
                  "notification/addNotiToken",
                  "POST",
                  JSON.stringify({
                    id: _data.id,
                    noti_token: noti_token,
                    userType: _data?.userType,
                  }),
                  response?.data?.token
                )
                  .then((e) => console.log("noti token added to db"))
                  .catch((e) => console.log("error adding noti token to db"));
                navigation.navigate("DriverScreen");
              } else {
                setLoader(false);
                setError({
                  value: true,
                  message: "Please wait for the admin to approve your account.",
                });
              }
            }
          } else {
            setLoader(false);
            setError({
              value: true,
              message: "Wrong login type",
            });
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            const code = error?.response?.data?.code;

            if (code == "auth/wrong-password") {
              setLoader(false);
              setError({
                value: true,
                message: "Wrong Credentials",
              });
            } else if (code == "auth/too-many-requests") {
              setLoader(false);
              setError({
                value: true,
                message:
                  "Access to this account has been temporarily disabled due to many failed login attempts",
              });
            } else if (code == "auth/invalid-email") {
              setLoader(false);
              setError({
                value: true,
                message: "The email address is badly formatted",
              });
            } else if (code == "auth/user-not-found") {
              setLoader(false);
              setError({
                value: true,
                message: "No user found on provided email",
              });
            } else {
              setLoader(false);
              setError({
                value: true,
                message: "Error",
              });
            }
          } else {
            setLoader(false);
            setError({
              value: true,
              message: "Error",
            });
          }
        });
    }
  };

  return (
    <View style={container}>
      <LoadingOverlay loading={loader} />
      <MessageOverlay
        value={error.value}
        setValue={setError}
        message={error.message}
      />
      <SuccessOverlay value={success.value} message={success.message} />
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
      <Text style={formStyles.blackTextCenter}>- or Log In With -</Text>
      <View style={formStyles.mainSecond}>
        <View style={formStyles.mainSecondRow}>
          <View style={formStyles.inputIcon}>
            <Feather
              name="mail"
              size={24}
              color="#737373"
              style={formStyles.inputIcon.icon}
            />
          </View>
          <TextInput
            value={data.email}
            onChangeText={(e) =>
              setData({
                ...data,
                email: e,
              })
            }
            placeholder="yours@example.com"
            autoComplete="email"
            style={formStyles.inputWithIcon}
          />
        </View>
        <View style={formStyles.mainSecondRow}>
          <View style={formStyles.inputIcon}>
            <MaterialIcons
              name="lock-outline"
              size={24}
              color="#737373"
              style={formStyles.inputIcon.icon}
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
            style={formStyles.inputWithIcon}
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
  );
};

export default Login;
