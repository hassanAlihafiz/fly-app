import { KeyboardAvoidingView, Text, View } from "react-native";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextInputComponent from "../components/TextInput";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";

export default class StripeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <KeyboardAvoidingScrollView>
          <View>
            <TextInputComponent
              placeholder={"CARD HOLDER'S NAME"}
              name="CARD HOLDER'S NAME"
            />
            <TextInputComponent
              placeholder={"EMAIL ADDRESS"}
              name="EMAIL ADDRESS"
            />
            <TextInputComponent placeholder={"PHONE"} name="PHONE" />
            <TextInputComponent placeholder={"ZIP CODE"} name="ZIP CODE" />
            <TextInputComponent
              placeholder={"94110"}
              name="CREDIT CARD NUMBER"
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <View
                style={{
                  width: "65%",
                }}
              >
                <TextInputComponent placeholder={"MM/YY"} name="EXPIRY DATE" />
              </View>
              <View
                style={{
                  width: "30%",
                }}
              >
                <TextInputComponent placeholder={"CVC"} name="CVC" />
              </View>
            </View>
          </View>
        </KeyboardAvoidingScrollView>

        <TouchableOpacity
          style={{
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#FFFFFF" }}>Pay 150</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
