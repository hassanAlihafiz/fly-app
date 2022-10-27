import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ServiceCard from "../components/ServiceCard";
import PackageCard from "../components/PackageCard";
import { getLocalStorage, getToken } from "../utils/LocalStorage";
import { getCall } from "../utils/API";
import { ActivityIndicator } from "react-native";

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
  const [loading, setLoading] = React.useState(true);
  const [packages, setPackages] = React.useState([]);
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    if (token != null) {
      getPackages();
    }
  }, [token]);

  const getUser = async () => {
    const _token = await getToken("user");
    setToken(_token);
  };

  const getPackages = () => {
    getCall("packages/getPackages", "GET", token)
      .then((e) => {
        setPackages(e?.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={{ marginBottom: 20 }} showsVerticalScrollIndicator={false}>
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
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: 5,
            marginTop: 5,
            marginBottom: 5,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {packages.map((value, key) => {
            return <PackageCard packageData={value} key={key} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};
export default ServiceOffered;
