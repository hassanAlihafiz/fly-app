import React from "react";
import {
  ActionSheetIOS,
  Platform,
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
import { ActivityIndicator } from "react-native";
import { getCall, getPostCall } from "../utils/API";
import { Overlay } from "@rneui/base";

import {
  getLocalStorage,
  LocalStorage,
  setLocalStorage,
} from "../utils/LocalStorage";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

import { container, formStyles } from "./styles/FormStyle";
import { LoadingOverlay, MessageOverlay, SuccessOverlay } from "./Overlays";

const Signup = ({ navigation, loginAs }) => {
  const [loading, setLoading] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [zipData, setZipData] = React.useState([]);
  const [zipIOSData, setZipIOSData] = React.useState([]);
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });
  const [success, setSuccess] = React.useState({
    value: false,
    message: "",
  });
  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    userType: loginAs,
    zipCodeId: "",
    available: true,
    status: false,
    noti_token: "",
  });

  const handleData = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  React.useEffect(() => {
    getZipCode();
    getNotiToken();
  }, []);

  const getNotiToken = async () => {
    const noti_token = await getLocalStorage("noti_token");
    console.log("noti", noti_token);
    if (noti_token != null) {
      handleData("noti_token", noti_token);
    }
  };

  const getZipCode = () => {
    getCall("zipCode/getZipCodes", "")
      .then((e) => {
        setZipData(e?.data);
        setZipIOSData([
          "Cancel",
          ...e.data.map((value) => {
            return value.name + " - " + value.id;
          }),
        ]);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(JSON.stringify(data));

  const handleSignup = async () => {
    setLoader(true);

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
          setLoader(false);
          setSuccess({
            value: true,
            message: `User Successfully Registered`,
          });
          setTimeout(() => {
            setSuccess({
              value: false,
              message: "",
            });
          }, 2000);
          handleData("token", e?.data?.token);
          setLocalStorage(
            "user",
            JSON.stringify({ ...data, token: e?.data?.token, id: e?.data?.id })
          );
          if (loginAs === "customer") {
            navigation.navigate("HomeScreen");
          } else if (loginAs === "driver") {
            navigation.navigate("DriverScreen");
          }
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
          setError({
            value: true,
            message: "ERROR",
          });
        });
    }
  };

  const onZipPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: zipIOSData,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
        title: "Select Zip",
      },
      (buttonIndex) => {
        if (buttonIndex != 0) {
          const selectedZip = zipIOSData[buttonIndex];
          handleData("zipCodeId", selectedZip?.split("-")[1]?.replace(" ", ""));
          // cancel action
        }
      }
    );
  };

  console.log(success);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={container}>
      {loading ? (
        <ActivityIndicator style={{ margin: 30 }} size="large" />
      ) : (
        <>
          <LoadingOverlay loading={loader} />
          <MessageOverlay
            value={error.value}
            setValue={setError}
            message={error.message}
          />

          <SuccessOverlay value={loader} message={success.message} />
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
          <Text style={formStyles.blackTextCenter}>
            - or Register With Email-
          </Text>
          <View style={formStyles.main}>
            <View style={formStyles.row}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor={formStyles.placeholderTextColor}
                autoComplete="name"
                autoFocus={true}
                onChangeText={(e) => handleData("first_name", e)}
                style={formStyles.inputHalf}
              />

              <TextInput
                placeholder="Last Name"
                placeholderTextColor={formStyles.placeholderTextColor}
                autoComplete="name"
                autoFocus={true}
                onChangeText={(e) => handleData("last_name", e)}
                style={formStyles.inputHalf}
              />
            </View>
            <TextInput
              placeholder="Email"
              placeholderTextColor={formStyles.placeholderTextColor}
              autoComplete="email"
              onChangeText={(e) => handleData("email", e.toLowerCase())}
              style={formStyles.inputFull}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor={formStyles.placeholderTextColor}
              keyboardType="visible-password"
              onChangeText={(e) => handleData("password", e)}
              secureTextEntry={true}
              style={formStyles.inputFull}
            />

            {Platform.OS === "ios" ? (
              <TouchableOpacity
                onPress={onZipPress}
                style={formStyles.pickerIOS}
              >
                {data.zipCodeId != "" ? (
                  <Text style={formStyles.blackText}>{data.zipCodeId}</Text>
                ) : (
                  <Text style={{ color: formStyles.placeholderTextColor }}>
                    Zipcode
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <View style={formStyles.inputFull}>
                <Picker
                  prompt="Zipcode"
                  style={{ width: "100%" }}
                  selectedValue={data.zipCodeId}
                  onValueChange={(e) => handleData("zipCodeId", e.toString())}
                >
                  {zipData.map((value, key) => {
                    return (
                      <Picker.Item
                        key={key}
                        label={value.name + " - " + value.id}
                        value={value.id}
                      />
                    );
                  })}
                </Picker>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={formStyles.yellowButton}
            onPress={handleSignup}
          >
            <Text style={formStyles.whiteTextCenter}>SIGN UP</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default Signup;
