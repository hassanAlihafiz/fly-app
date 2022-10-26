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
import RNPickerSelect from "react-native-picker-select";
import { countries } from "../utils/Countries";
import { useNavigation } from "@react-navigation/native";

const PaymentScreen = ({}) => {
  const navigation = useNavigation();
  const [data, setData] = React.useState({
    firstName: null,
    lastName: null,
    address: null,
    address2: null,
    city: null,
    state: null,
    country: null,
    zip: null,
  });
  const handleData = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data);

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
              placeholderTextColor="black"
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
              placeholderTextColor="black"
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
          <View
            style={{
              marginVertical: 10,
              width: "100%",
            }}
          >
            <TextInput
              placeholder="Street Address"
              autoComplete="street-address"
              placeholderTextColor="black"
              onChangeText={(e) => handleData("address", e)}
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
              width: "100%",
            }}
          >
            <TextInput
              placeholder="Apartment, suite, etc"
              autoComplete="postal-address-extended"
              placeholderTextColor="black"
              onChangeText={(e) => handleData("address2", e)}
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
              placeholder="City"
              autoComplete="postal-address-locality"
              placeholderTextColor="black"
              onChangeText={(e) => handleData("city", e)}
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
              placeholder="State"
              autoComplete="postal-address-region"
              placeholderTextColor="black"
              onChangeText={(e) => handleData("state", e)}
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
            <RNPickerSelect
              value={data.country}
              style={{ width: "100%" }}
              onValueChange={(value) => handleData("country", value)}
              items={countries}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
              width: "48%",
            }}
          >
            <TextInput
              placeholder="Zip code"
              autoComplete="postal-address-extended-postal-code"
              placeholderTextColor="black"
              onChangeText={(e) => handleData("zip", e)}
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
          onFocus={(e) => console.log(e)}
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
        onPress={() => navigation.navigate("SelectDriver")}
      >
        <Text style={{ color: "white" }}>Confirm and pay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
