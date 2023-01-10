import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActionSheetIOS,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { TextInput } from "react-native";
import { Text, View } from "react-native";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import MaskInput, { Masks } from "react-native-mask-input";
import { getCall, getPostCall } from "../utils/API";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";
import GreenButton from "./common/GreenButton";
import { LoadingOverlay, MessageOverlay, SuccessOverlay } from "./Overlays";

export default function Profile({ title }) {
  const [loader, setLoader] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
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
    phone_no: "",
    zipCodeId: "",
  });
  const [editData, setEditData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    zipCodeId: "",
  });

  React.useEffect(() => {
    getZipCode();
    getLocal();
  }, []);

  const getLocal = async () => {
    const user = await getLocalStorage("user");

    setData({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone_no: user?.phone_no,
      zipCodeId: user?.zipCodeId,
    });
    setEditData({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone_no: user?.phone_no,
      zipCodeId: user?.zipCodeId,
    });
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
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleData = (name, value) => {
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditData(data);
    setEdit(!edit);
  };
  const handleCancel = () => {
    setEditData({
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      zipCodeId: "",
    });
    setEdit(!edit);
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

  const handleSubmit = async () => {
    setLoading(true);
    if (
      editData.email == "" ||
      editData.first_name == "" ||
      editData.last_name == "" ||
      editData.zipCodeId == "" ||
      editData.phone_no == "" ||
      editData.phone_no == undefined
    ) {
      setError({
        value: true,
        message: "All fields are required",
      });

      setLoading(false);
    } else {
      const user = await getLocalStorage("user");

      getPostCall(
        "users/update",
        "POST",
        JSON.stringify({ ...editData, id: user.id }),
        ""
      )
        .then(async (e) => {
          setLoading(false);

          setSuccess({
            value: true,
            message: `User Successfully Updated`,
          });
          setTimeout(() => {
            setSuccess({
              value: false,
              message: ``,
            });
          }, 3000);
          const user = await getLocalStorage("user");
          const _data = {
            ...user,
            first_name: editData.first_name,
            last_name: editData.last_name,
            phone_no: editData.phone_no,
            email: editData.email,
            zipData: editData.zipCodeId,
          };
          setLocalStorage("user", JSON.stringify(_data));
          setData(_data);
          handleCancel();
        })
        .catch((e) => {
          setLoading(false);

          setError({
            value: true,
            message: "Error updating profile",
          });
        });
    }
  };

  return (
    <View style={cardStyle}>
      <LoadingOverlay loading={loading} />
      <MessageOverlay
        value={error.value}
        message={error.message}
        setValue={setError}
      />
      <SuccessOverlay value={success.value} message={success.message} />
      <View style={cardStyle.header}>
        <Text style={cardStyle.title}>{edit ? "Edit Profile" : title}</Text>
        <MaterialCommunityIcons
          name="account-details"
          size={24}
          color="black"
        />
      </View>
      {loader ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <KeyboardAvoidingScrollView scrollEnabled={false}>
          <View style={rowStyle}>
            <View style={rowStyle.col1}>
              <Text>First Name:</Text>
            </View>
            <View style={rowStyle.col2}>
              {edit ? (
                <TextInput
                  placeholder="First Name"
                  autoComplete="name"
                  placeholderTextColor={rowStyle.placeholderTextColor}
                  value={editData.first_name}
                  onChangeText={(e) => handleData("first_name", e)}
                  style={rowStyle.input}
                />
              ) : (
                <Text style={rowStyle.text}>{data.first_name}</Text>
              )}
            </View>
          </View>
          <View style={rowStyle}>
            <View style={rowStyle.col1}>
              <Text>Last Name:</Text>
            </View>
            <View style={rowStyle.col2}>
              {edit ? (
                <TextInput
                  placeholder="Last Name"
                  autoComplete="name-family"
                  placeholderTextColor={rowStyle.placeholderTextColor}
                  value={editData.last_name}
                  onChangeText={(e) => handleData("last_name", e)}
                  style={rowStyle.input}
                />
              ) : (
                <Text style={rowStyle.text}>{data.last_name}</Text>
              )}
            </View>
            <View style={rowStyle}>
              <View style={rowStyle.col1}>
                <Text>Email:</Text>
              </View>
              <View style={rowStyle.col2}>
                {edit ? (
                  <TextInput
                    placeholder="Email"
                    autoComplete="email"
                    placeholderTextColor={rowStyle.placeholderTextColor}
                    value={editData.email}
                    onChangeText={(e) => handleData("email", e)}
                    style={rowStyle.input}
                  />
                ) : (
                  <Text style={rowStyle.text}>{data.email}</Text>
                )}
              </View>
            </View>
            <View style={rowStyle}>
              <View style={rowStyle.col1}>
                <Text>Phone No:</Text>
              </View>
              <View style={rowStyle.col2}>
                {edit ? (
                  <MaskInput
                    value={editData.phone_no}
                    style={rowStyle.input}
                    placeholder="Enter your phone number"
                    autoFocus={false}
                    placeholderTextColor={rowStyle.placeholderTextColor}
                    keyboardType="number-pad"
                    onChangeText={(masked, unmasked) => {
                      handleData("phone_no", masked);
                    }}
                    mask={Masks.USA_PHONE}
                  />
                ) : (
                  <Text style={rowStyle.text}>{data?.phone_no}</Text>
                )}
              </View>
            </View>
            <View style={rowStyle}>
              <View style={rowStyle.col1}>
                <Text>Zip Code:</Text>
              </View>
              <View style={rowStyle.col2}>
                {edit ? (
                  <>
                    {Platform.OS === "ios" ? (
                      <TouchableOpacity
                        onPress={onZipPress}
                        style={rowStyle.pickerIOS}
                      >
                        {data.zipCodeId != "" ? (
                          <Text style={rowStyle.blackText}>
                            {editData.zipCodeId}
                          </Text>
                        ) : (
                          <Text
                            style={{ color: rowStyle.placeholderTextColor }}
                          >
                            Zipcode
                          </Text>
                        )}
                      </TouchableOpacity>
                    ) : (
                      <View style={rowStyle.inputFull}>
                        <Picker
                          prompt="Zipcode"
                          style={{ width: "100%" }}
                          selectedValue={editData.zipCodeId}
                          onValueChange={(e) =>
                            handleData("zipCodeId", e.toString())
                          }
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
                  </>
                ) : (
                  <Text style={rowStyle.text}>{data.zipCodeId}</Text>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingScrollView>
      )}
      {!edit ? (
        <GreenButton text="Edit" width="100%" onPress={handleEdit} />
      ) : (
        <View style={rowStyle.bot}>
          <TouchableOpacity style={rowStyle.cancelBtn} onPress={handleCancel}>
            <Text style={{ alignSelf: "center" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...rowStyle.cancelBtn,
              backgroundColor: "#43ce51",
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "white", alignSelf: "center" }}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const cardStyle = StyleSheet.create({
  borderRadius: 10,
  flex: 1,
  width: "100%",
  backgroundColor: "white",
  padding: 20,
  shadowColor: "#000",
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowOpacity: 0.13,
  shadowRadius: 4,

  elevation: 20,
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const rowStyle = StyleSheet.create({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",

  col1: {
    marginVertical: 10,
    width: "30%",
  },
  col2: {
    marginVertical: 10,
    width: "70%",
    height: 30,

    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  pickerIOS: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    height: 40,
    borderColor: "#d7d7d7",
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  inputFull: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    height: 40,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  placeholderTextColor: "#9EA0A4",
  blackText: { color: "black" },
  bot: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    height: 50,
    backgroundColor: "#E9E9EA",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10,
  },
});
