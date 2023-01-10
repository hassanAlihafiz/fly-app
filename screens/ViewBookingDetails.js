import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getLocalStorage } from "../utils/LocalStorage";

export default function ViewBookingDetails({ route }) {
  const { data, userType } = route.params;
  console.log(userType);
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <View style={cardStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={cardStyle.header}>
          <Text
            style={{ marginVertical: 10, fontSize: 20, fontWeight: "bold" }}
          >
            Booking Details
          </Text>
          <Entypo name="list" size={24} color="black" />
        </View>

        <View style={rowStyle}>
          <View style={rowStyle.col1}>
            <Text>Booking Time:</Text>
          </View>
          <View style={rowStyle.col2}>
            <Text style={rowStyle.text}>
              {moment
                .unix(data?.dateCreated._seconds)
                .format("MM/DD/YYYY HH:MM")}
            </Text>
          </View>
        </View>

        <View style={rowStyle}>
          <View style={rowStyle.col1}>
            <Text>Booking End On:</Text>
          </View>
          <View style={rowStyle.col2}>
            <Text style={rowStyle.text}>
              {moment
                .unix(data?.tripEnded?._seconds)
                .format("MM/DD/YYYY HH:MM")}
            </Text>
          </View>
        </View>
        {userType == "customer" ? (
          <View style={rowStyle}>
            <View style={rowStyle.col1}>
              <Text>Driver Name:</Text>
            </View>
            <View style={rowStyle.col2}>
              <Text style={rowStyle.text}>
                {data?.driverData?.first_name + " " + data?.driverData?.last_name}
              </Text>
            </View>
          </View>
        ) : (
          <View style={rowStyle}>
            <View style={rowStyle.col1}>
              <Text>Customer Name:</Text>
            </View>
            <View style={rowStyle.col2}>
              <Text style={rowStyle.text}>
                {data?.userData?.first_name + " " + data?.userData?.last_name}
              </Text>
            </View>
          </View>
        )}
        <View style={rowStyle}>
          <View style={rowStyle.col1}>
            <Text>Car Type:</Text>
          </View>
          <View style={rowStyle.col2}>
            <Text style={rowStyle.text}>{data?.carType}</Text>
          </View>
        </View>
        <View style={rowStyle}>
          <View style={rowStyle.col1}>
            <Text>Package Name:</Text>
          </View>
          <View style={rowStyle.col2}>
            <Text style={rowStyle.text}>{data?.packageData?.name}</Text>
          </View>
        </View>
        <View style={rowStyle}>
          <View style={rowStyle.col1}>
            <Text>Package Type:</Text>
          </View>
          <View style={rowStyle.col2}>
            <Text style={rowStyle.text}>{data?.packageData?.type}</Text>
          </View>
        </View>
        <View style={rowStyle}>
          <View style={rowStyle.col1}>
            <Text>Station Name:</Text>
          </View>
          <View style={rowStyle.col2}>
            {data?.bookType == "Gas" ? (
              <Text style={rowStyle.text}>
                {data?.gasStation?.name}
                {" (" + data?.numOfGal + " Gallons)"}
              </Text>
            ) : (
              <Text style={rowStyle.text}>{data?.washStation?.name}</Text>
            )}
          </View>
        </View>

        <View style={rowStyle}>
          <View style={rowStyle.col1}>
            <Text>Amount:</Text>
          </View>
          <View style={rowStyle.col2}>
            <Text style={rowStyle.text}>$ {data?.amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const cardStyle = StyleSheet.create({
  borderRadius: 10,
  flex: 1,
  width: "100%",
  backgroundColor: "white",
  padding: 20,
  shadowColor: "#000",
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowOpacity: 0.13,
  shadowRadius: 4,

  elevation: 20,
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 30,
  },
  title: {
    marginTop: 10,
    marginBottom: 30,

    fontSize: 20,
    fontWeight: "bold",
  },
});

const rowStyle = StyleSheet.create({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",

  marginVertical: 10,
  col1: {
    flex: 1.5,
  },
  col2: {
    flex: 2.5,

    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  pickerIOS: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    height: 40,
    borderColor: "#d7d7d7",
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  inputFull: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    height: 40,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  placeholderTextColor: "#9EA0A4",
  blackText: { color: "black" },
  bot: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    height: 50,
    backgroundColor: "#E9E9EA",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10,
  },
});
