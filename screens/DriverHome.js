import { Text, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CardView from "../components/CardView";
import moment from "moment";
const DriverHome = ({ navigation }) => {
  return (
    <ScrollView>
      <CardView name={moment().format("HH:MM DD/MM/YYYY z")} color= "green" />
      <CardView name="Hello Dev" img={require("../assets/sedan.jpeg")} />
    </ScrollView>
  );
};

export default DriverHome;
