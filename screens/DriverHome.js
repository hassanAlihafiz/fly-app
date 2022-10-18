import { Text, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CardView from "../components/CardView";
import moment from "moment";
import DateView from "../components/DateView ";
const DriverHome = ({ navigation }) => {
  return (
    <ScrollView>
      <DateView name={moment().format("ddd, DD MMM YYYY z")} color= "black" />
      {/* <CardView name="Hello Dev" img={require("../assets/sedan.jpeg")} /> */}
    </ScrollView>
  );
};

export default DriverHome;
