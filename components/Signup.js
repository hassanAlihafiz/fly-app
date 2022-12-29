import React, { useEffect } from "react";
import {
  ActionSheetIOS,
  Button,
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
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

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
    available: false,
    status: false,
    status_approved: false,
    noti_token: "",
  });
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadRes, setUploadRes] = React.useState({
    error: false,
    success: false,
    message: "",
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

  const handleSignup = async () => {
    setLoader(true);

    if (
      data.first_name == "" ||
      data.last_name == "" ||
      data.email == "" ||
      data.password == "" ||
      data.zip == "" ||
      (loginAs === "driver" && data?.url == undefined)
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
          if (loginAs === "customer") {
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
              JSON.stringify({
                ...data,
                token: e?.data?.token,
                id: e?.data?.id,
              })
            );
            navigation.navigate("HomeScreen");
          } else {
            setSuccess({
              value: true,
              message: `Your signup request has been submitted. Please wait for the admin to approve.`,
            });
            setTimeout(() => {
              setSuccess({
                value: false,
                message: "",
              });
              navigation.navigate("Landing");
            }, 5000);
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

  const pickDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result?.type != "cancel") {
      setFile(result);

      setUploading(true);
      const formData = new FormData();
      formData.append("file", result);

      await axios
        .post(
          "https://sunny-jetty-368714.ue.r.appspot.com/file/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          handleData("url", response.data.url);
          setUploading(false);

          setUploadRes({
            ...uploadRes,
            success: true,
            message: "File Uploaded",
          });

          setTimeout(() => {
            setUploadRes({
              ...uploadRes,
              success: false,
              message: "",
            });
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setUploading(false);

          setUploadRes({
            ...uploadRes,
            error: true,
            message: "Error Uploading File",
          });

          setTimeout(() => {
            setUploadRes({
              ...uploadRes,
              error: false,
              message: "",
            });
          }, 3000);
        });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={container}>
      {loading ? (
        <ActivityIndicator style={{ margin: 30 }} size="large" />
      ) : (
        <>
          <LoadingOverlay
            loading={loader || uploading}
            text={uploading ? "Uploading..." : null}
          />
          <MessageOverlay
            value={error.value || uploadRes.error}
            setValue={setError}
            message={error.message || uploadRes.message}
          />
          <SuccessOverlay
            value={success.value || uploadRes.success}
            message={success.message || uploadRes.message}
          />
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
            {loginAs === "driver" && (
              <TouchableOpacity onPress={pickDoc} style={formStyles.inputBtn}>
                <Text
                  style={{
                    color: "#9EA0A4",
                  }}
                >
                  {data?.url == undefined ? "Upload the document" : file?.name}
                </Text>
                <Entypo name="upload-to-cloud" size={24} color="black" />
              </TouchableOpacity>
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
