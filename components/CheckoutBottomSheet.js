import { BottomSheet } from "@rneui/base";
import React from "react";
import { View, Text, ScrollView } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { CardField, CardFieldInput } from "@stripe/stripe-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { TextInput } from "react-native-gesture-handler";

const CheckoutBottomSheet = ({ isVisible, setIsVisible }) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
    >
      <KeyboardAvoidingScrollView>
        <View
          style={{
            backgroundColor: "white",

            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 20,
              top: 20,
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 20,
              borderRadius: 20,
              backgroundColor: "white",
            }}
            onPress={() => setIsVisible(false)}
          >
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Billing Info
          </Text>
          <TextInput
            placeholder="Enter your address"
            autoComplete="postal-address"
            placeholderTextColor="black"
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: "#d7d7d7",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <CardField
            placeholders={{
              number: "4242 4242 4242 4242",
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
          ></CardField>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: "#43ce51",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Confirm and pay</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingScrollView>
    </BottomSheet>
  );
};

export default CheckoutBottomSheet;
