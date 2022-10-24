import { Image, KeyboardAvoidingView, ScrollView, View } from "react-native";
import React from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AuthTabs from "../components/AuthTabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";

const Login = ({route, navigation }) => {
  // console.log(route.params.loginAs)
   route.params.loginAs
  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: hp("40%"),
          }}
        >
          <Image
            // style={styles.tinyLogo}
            style={{
              backgroundColor: "red",
              width: 200,
              height: 200,
              borderRadius: 100,
            }}
            source={require("../assets/logo.png")}
          />
        </View>

        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            height: hp("60%"),
            width: wp("90%"),
          }}
        >
          <AuthTabs loginAs={route.params.loginAs}  navigation={navigation} />
        </View>
      </View>
      <StatusBar style="auto" />
    </KeyboardAwareScrollView>
  );
};
export default Login;
