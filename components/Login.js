import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FacebookSocialButton } from "react-native-social-buttons";
import { GoogleSocialButton } from "react-native-social-buttons/src/buttons/GoogleSocialButton";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { setLocalStorage } from "../utils/LocalStorage";
import { container, formStyles } from "./styles/FormStyle";
import { LoadingOverlay, MessageOverlay, SuccessOverlay } from "./Overlays";

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

  console.log(loginAs);
  console.log(data);

  const handleLogin = async () => {
    setLoader(true);
    if (data.email == "" || data.password == "") {
      setError({
        value: true,
        message: "Email and password fields can not be empty",
      });
      setLoader(false);
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
          if (response.data.userType === "customer" && loginAs === "customer") {
            setLocalStorage("user", JSON.stringify(response?.data));
            navigation.navigate("HomeScreen");
            setLoader(false);
          } else if (
            response.data.userType === "driver" &&
            loginAs === "driver"
          ) {
            setLocalStorage("user", JSON.stringify(response?.data));
            navigation.navigate("DriverScreen");
            setLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
          setError({
            value: true,
            message: "Invalid Credentials",
          });
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
