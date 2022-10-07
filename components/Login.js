import React from "react";
import {
  KeyboardAvoidingView,
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

const Login = ({ navigation }) => {
  return (
    // <KeyboardAvoidingView behavior="padding">
    <View style={{ flex: 1, width: wp("90%") }}>
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
        }}
      />
      <Text style={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}>
        - or Log In With -
      </Text>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          justifyContent: "space-between",
          height: 90,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            width: wp("80%"),
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
              backgroundColor: "#d7d7d7",
            }}
          />
          <TextInput
            placeholder="yours@example.com"
            style={{
              height: 40,
              borderWidth: 2,
              borderColor: "#ececec",
              width: wp("70%"),
              paddingLeft: 10,
              paddingRight: 10,
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
              backgroundColor: "#d7d7d7",
            }}
          />
          <TextInput
            placeholder="yours password"
            style={{
              height: 40,
              borderWidth: 2,
              borderColor: "#ececec",
              width: wp("70%"),
              paddingLeft: 10,
              paddingRight: 10,
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
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
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
