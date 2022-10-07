import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";

const Login = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ alignSelf: "center" }}>LoginScreen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;
