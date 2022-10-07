import { Text, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CardView from "../components/CardView";

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <CardView />
      <CardView />
      <CardView />
      <CardView />
      <CardView />
      <CardView />
    </ScrollView>
  );
};

export default Home;
