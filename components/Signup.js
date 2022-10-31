import React from "react";
import {
  ActionSheetIOS,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
// import RNPickerSelect from "react-native-picker-select";
import { ActivityIndicator } from "react-native";
import { getCall, getPostCall } from "../utils/API";
import { Overlay } from "@rneui/base";

import { LocalStorage, setLocalStorage } from "../utils/LocalStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DevSettings } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { PickerIOS } from "@react-native-picker/picker";

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
  });

  console.log(zipIOSData);

  React.useEffect(() => {
    getZipCode();
  }, []);

  const getZipCode = () => {
    getCall("zipCode/getZipCodes", "GET", "")
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

  const handleData = (name, value) => {
    setData({
      ...data,
      [name]: value,
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

          handleData("token", e?.data?.token);
          setLocalStorage("user", JSON.stringify(data));
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

          <SuccessOverlay value={true} message={success.message} />
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
              onChangeText={(e) => handleData("email", e)}
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
