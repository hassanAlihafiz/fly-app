import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ServiceCard from "../components/ServiceCard";
import PackageCard from "../components/PackageCard";

const goldPackage = ["Exterior wash", "Rim clean", "Towel Dried"];
const platinumPackage = [
  "Exterior wash",
  "Rim clean",
  "Tire shine",
  "Undercarriage bath",
  "Towel Dried",
];
const deluxPackage = [
  "Exterior wash",
  "Vacuumed",
  "Window clean",
  "Rim clean",
  "Tire shine",
  "Undercarriage bath",
  "Towel Dried",
];
const vipPackage = [
  "Exterior wash",
  "Vacuumed",
  "Window clean",
  "Rim clean",
  "Tire shine",
  "Rain - x",
  "Body gloss",
  "Towel Dried",
];
const ServiceOffered = ({ navigation }) => {
  return (
    <ScrollView
      style={{ marginBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          paddingLeft: 20,
          marginTop: 10,
          color: "black",
          fontWeight: "bold",
          fontSize: 22,
        }}
      >
        Packages
      </Text>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 5,
          marginTop: 5,
          marginBottom: 5,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <PackageCard
          name="GOLD"
          price={19}
          type="GOLD WASH +"
          details={goldPackage}
          navigation={navigation}
        />
        <PackageCard
          name="PLATINUM"
          price={25}
          type="GOLD WASH +"
          details={platinumPackage}
          navigation={navigation}
        />
        <PackageCard
          name="DELUX"
          price={33}
          type="Exterior WASH +"
          details={deluxPackage}
          navigation={navigation}
        />
        <PackageCard
          name="VIP"
          price={45}
          type="GOLD WASH +"
          details={vipPackage}
          navigation={navigation}
        />
      </ScrollView>
      {/* <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            paddingLeft: 20,
            marginTop: 10,
            color: "black",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          Auto Coating
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={{
            marginHorizontal: 5,
            marginTop: 5,
            marginBottom: 5,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <ServiceCard name={"30 ML 9H Scratch"} price={"16.95"} />
          <ServiceCard name={"30 ML 9H Scratch"} price={"16.95"} />
          <ServiceCard name={"30 ML 9H Scratch"} price={"16.95"} />
        </ScrollView>
        <Text
          style={{
            paddingLeft: 20,
            marginTop: 10,
            color: "black",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          Fuel Tank Packages
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={{
            marginHorizontal: 5,
            marginTop: 5,
            marginBottom: 5,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <ServiceCard name={"Full Tank"} price={"15"} />
          <ServiceCard name={"Full Tank"} price={"15"} />
          <ServiceCard name={"Full Tank"} price={"15"} />
        </ScrollView>
      </View> */}
    </ScrollView>
  );
};
export default ServiceOffered;
