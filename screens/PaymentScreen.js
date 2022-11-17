import React from "react";
import { View, Text, ScrollView } from "react-native";

import { Entypo, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { CardField, CardFieldInput } from "@stripe/stripe-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { TextInput } from "react-native-gesture-handler";
import { BottomSheet } from "react-native-btr";
import { MaterialIcons } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
// import RNPickerSelect from "react-native-picker-select";
import { countries } from "../utils/Countries";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { formStyles } from "../components/styles/FormStyle";
import { ActionSheetIOS } from "react-native";

import { getPostCall } from "../utils/API";
import { getLocalStorage, getToken } from "../utils/LocalStorage";
import {
  LoadingOverlay,
  MessageOverlay,
  SuccessOverlay,
} from "../components/Overlays";

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();

  const {
    packageData,
    gasStation,
    serviceFee,
    carType,
    total,
    numOfGal,
    lat,
    lng,
    selectedDriver,
    washStation,
  } = route.params;

  console.log("PD", packageData);
  console.log(gasStation);
  console.log(serviceFee);
  console.log("ct", carType);
  console.log("t", total);
  console.log("nog", numOfGal);
  console.log(lat);
  console.log(lng);
  console.log(selectedDriver);

  const [user, setUser] = React.useState({});
  const [token, setToken] = React.useState();

  const [loading, setLoading] = React.useState(false);
  const [countriesIOS, setCountriesIOS] = React.useState([
    "Cancel",
    ...countries.map((value) => {
      return value.label;
    }),
  ]);
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [cardInfo, setCardInfo] = React.useState({
    brand: "",
    cvc: "",
    expiryMonth: "",
    expiryYear: "",
    number: "",
    validCVC: "",
    validExpiryDate: "",
    validNumber: "",
  });
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });
  const [success, setSuccess] = React.useState({
    value: false,
    message: "",
  });
  React.useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const _user = await getLocalStorage("user");
    const _token = await getToken("user");
    setUser(_user);
    setToken(_token);
  };

  const handleData = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handelConfirm = () => {
    setLoading(true);
    if (
      data.firstName != "" &&
      data.lastName != "" &&
      data.address != "" &&
      data.city != "" &&
      data.state != "" &&
      data.country != "" &&
      data.zip != ""
    ) {
      if (
        cardInfo.brand != "" &&
        cardInfo.cvc != "" &&
        cardInfo.expiryMonth != "" &&
        cardInfo.expiryYear != "" &&
        cardInfo.number != "" &&
        cardInfo.validCVC == "Valid" &&
        cardInfo.validExpiryDate == "Valid" &&
        cardInfo.validNumber == "Valid"
      ) {
        let dataObj;

        if (packageData.type == "Gas") {
          dataObj = {
            packageId: packageData.id,
            driverId: selectedDriver.id,
            userId: user.id,
            amount: total,
            zipCode: user.zipCodeId,
            userData: {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              paymentMethod: data,
              location: {
                lat: lat,
                lng: lng,
              },
            },
            driverData: {
              available: false,
              email: selectedDriver.email,
              first_name: selectedDriver.first_name,
              last_name: selectedDriver.last_name,
            },
            packageData: packageData,
            paymentMethod: data,
            gasStation: gasStation,
            numOfGal: numOfGal,
            washStation: null,
            bookType: packageData.type,
          };
        } else {
          dataObj = {
            packageId: packageData.id,
            driverId: selectedDriver.id,
            userId: user.id,
            amount: total,
            zipCode: user.zipCodeId,
            userData: {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              paymentMethod: data,
              location: {
                lat: lat,
                lng: lng,
              },
            },
            driverData: {
              available: false,
              email: selectedDriver.email,
              first_name: selectedDriver.first_name,
              last_name: selectedDriver.last_name,
            },
            packageData: packageData,
            paymentMethod: data,
            gasStation: null,
            numOfGal: null,
            washStation: washStation,
            bookType: packageData.type,
          };
        }

        getPostCall(
          "booking/addBooking",
          "POST",
          JSON.stringify(dataObj),
          token
        )
          .then((e) => {
            setLoading(false);

            setSuccess({
              value: true,
              message: "Successfully Booked",
            });
            setTimeout(() => {
              navigation.navigate("Main Service");
            }, 1000);
          })
          .catch((e) => {
            setLoading(false);
            setError({
              value: true,
              message: "Error occured",
            });
          });
      } else {
        setLoading(false);
        setError({
          value: true,
          message: "Please enter valid card details",
        });
      }
    } else {
      setLoading(false);
      setError({
        value: true,
        message: "Please fill all the fields",
      });
    }
  };

  console.log(data);
  const onCountryPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: countriesIOS,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
        title: "Select Country",
      },
      (buttonIndex) => {
        if (buttonIndex != 0) {
          countriesIOS[buttonIndex];
          handleData("country", countriesIOS[buttonIndex]);
        }
      }
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <LoadingOverlay loading={loading} />
      <MessageOverlay
        value={error.value}
        setValue={setError}
        message={error.message}
      />
      <SuccessOverlay value={success.value} message={success.message} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginVertical: 10,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Billing Info
        </Text>
        <MaterialIcons name="payment" size={24} color="black" />
      </View>
      <KeyboardAvoidingScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginVertical: 10,
              width: "48%",
            }}
          >
            <TextInput
              placeholder="First Name"
              autoComplete="name"
              placeholderTextColor="#9EA0A4"
              onChangeText={(e) => handleData("firstName", e)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: "#d7d7d7",
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: "white",
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
              width: "48%",
            }}
          >
            <TextInput
              placeholder="Last Name"
              autoComplete="name"
              placeholderTextColor="#9EA0A4"
              onChangeText={(e) => handleData("lastName", e)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: "#d7d7d7",
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: "white",
                borderRadius: 5,
              }}
            />
          </View>

          <TextInput
            placeholder="Street Address"
            autoComplete="street-address"
            placeholderTextColor="#9EA0A4"
            onChangeText={(e) => handleData("address", e)}
            style={{
              width: "100%",

              marginVertical: 10,
              height: 40,
              borderWidth: 1,
              borderColor: "#d7d7d7",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          />

          <TextInput
            placeholder="Apartment, suite, etc"
            autoComplete="postal-address-extended"
            placeholderTextColor="#9EA0A4"
            onChangeText={(e) => handleData("address2", e)}
            style={{
              width: "100%",

              marginVertical: 10,
              height: 40,
              borderWidth: 1,
              borderColor: "#d7d7d7",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          />

          <TextInput
            placeholder="City"
            autoComplete="postal-address-locality"
            placeholderTextColor="#9EA0A4"
            onChangeText={(e) => handleData("city", e)}
            style={{
              marginVertical: 10,
              width: "48%",
              height: 40,
              borderWidth: 1,
              borderColor: "#d7d7d7",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          />

          <TextInput
            placeholder="State"
            autoComplete="postal-address-region"
            placeholderTextColor="#9EA0A4"
            onChangeText={(e) => handleData("state", e)}
            style={{
              height: 40,
              marginVertical: 10,
              width: "48%",
              borderWidth: 1,
              borderColor: "#d7d7d7",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          />

          <View
            style={{
              marginVertical: 10,
              width: "48%",
              height: 40,
              borderWidth: 1,
              borderColor: "#d7d7d7",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderRadius: 5,
              justifyContent: "center",
            }}
          >
            {Platform.OS === "ios" ? (
              <TouchableOpacity onPress={onCountryPress}>
                {data.country != "" ? (
                  <Text style={formStyles.blackText}>{data.country}</Text>
                ) : (
                  <Text style={{ color: formStyles.placeholderTextColor }}>
                    Country
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <Picker
                prompt="Country"
                style={{ width: "100%" }}
                selectedValue={data.country}
                onValueChange={(e) => {
                  handleData("country", e.toString());
                }}
              >
                {countries.map((value, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={value.label}
                      value={value.value}
                    />
                  );
                })}
              </Picker>
            )}
          </View>

          <TextInput
            placeholder="Zip code"
            autoComplete="postal-address-extended-postal-code"
            keyboardType="number-pad"
            placeholderTextColor="#9EA0A4"
            onChangeText={(e) => handleData("zip", e)}
            style={{
              marginVertical: 10,
              width: "48%",
              height: 40,
              borderWidth: 1,
              borderColor: "#d7d7d7",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          />
        </View>
        <CardField
          placeholders={{
            number: "Enter your card number",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
          postalCodeEnabled={false}
          onCardChange={(e) =>
            setCardInfo({
              brand: e.brand,
              cvc: e.cvc,
              expiryMonth: e.expiryMonth,
              expiryYear: e.expiryYear,
              number: e.number,
              validCVC: e.validCVC,
              validExpiryDate: e.validExpiryDate,
              validNumber: e.validNumber,
            })
          }
          dangerouslyGetFullCardDetails
        />
      </KeyboardAvoidingScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          height: 50,
          marginVertical: 20,
          marginHorizontal: 20,
          backgroundColor: "#43ce51",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderRadius: 10,
        }}
        onPress={handelConfirm}
      >
        <Text style={{ color: "white" }}>Confirm and pay: ${total}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
