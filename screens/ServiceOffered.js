import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ServiceCard from "../components/ServiceCard";

const ServiceOffered = () => {
  return (
    <ScrollView
      style={{ marginBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            paddingLeft: 20,
            marginTop: 10,
            color: "black",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          Feature Package
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
          <ServiceCard name={"Exterior Package"} price={"114.95"} />
          <ServiceCard name={"Exterior Package"} price={"114.95"} />
          <ServiceCard name={"Exterior Package"} price={"114.95"} />
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
      </View>
    </ScrollView>
  );
};
export default ServiceOffered;
