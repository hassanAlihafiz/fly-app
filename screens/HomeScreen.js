import { Text, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CardView from "../components/CardView";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <CardView name="HATCHBACK" img={require("../assets/hackBook.jpeg")} />
      <CardView name="SEDAN" img={require("../assets/sedan.jpeg")} />
      <CardView name="MPV" img={require("../assets/mpv.jpeg")} />
      <CardView name="SUV" img={require("../assets/suv.jpeg")} />
    </ScrollView>
  );
};

export default Home;
