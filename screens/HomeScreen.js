import { Text, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CardView from "../components/CardView";
import * as Location from "expo-location";
import { setLocalStorage } from "../utils/LocalStorage";

const Home = ({ navigation }) => {
  const [maploading, setMaploading] = React.useState(true);

  React.useEffect(() => {
    if (maploading == true) {
      getLocation();
    }
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      setMaploading(false);
      return;
    }
    await Location.getCurrentPositionAsync({})
      .then((e) => {
        const obj = {
          latitude: e.coords.latitude.toString(),
          longitude: e.coords.longitude.toString(),
        };
        setLocalStorage("UserCoords", obj);

        setMaploading(false);
      })

      .catch((e) => {
        setMaploading(false);
      });
    return;
  };

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
