import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import React, { Component } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { LoadingOverlay } from "./Overlays";
import { setLocalStorage } from "../utils/LocalStorage";
import * as TaskManager from "expo-task-manager";

// const LOCATION_TASK_NAME = "background-location-task";

// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//   if (error) {
//     // Error occurred - check `error.message` for more details.
//     console.log(error);
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     console.log(locations);
//     console.log(data);
//     // do something with the locations captured in the background
//   }
// });

const CardView = ({ name, img }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const disabledLocationAlert = () => {
    Alert.alert(
      "Fly app wants to use your location",
      "Location access is required to use his application",
      [
        {
          text: "Cancel",
          style: "destructive",
        },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
  };

  const handleClick = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    // if (status === "granted") {
    //   const { status: backgroundStatus } =
    //     await Location.requestBackgroundPermissionsAsync();
    //   if (backgroundStatus === "granted") {
    //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    //       accuracy: Location.Accuracy.Balanced,
    //     });
    //   }
    // }

    if (status !== "granted") {
      disabledLocationAlert();
      setLoading(false);
      return;
    }
    await Location.getCurrentPositionAsync({})
      .then((e) => {
        const obj = JSON.stringify({
          latitude: e.coords.latitude.toString(),
          longitude: e.coords.longitude.toString(),
        });
        setLocalStorage("UserCoords", obj);
      })
      .catch((e) => {
        console.log("error adding to local storage", e);
      });
    setLoading(false);
    navigation.navigate("Main Service", { carType: name });
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={handleClick}>
      <LoadingOverlay loading={loading} text="Getting your location" />
      <ImageBackground
        source={img}
        style={{
          height: hp(30),
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255, 0, 0,0.3)",
            height: hp(30),
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#FFFFFF",
              fontSize: 30,
              backgroundColor: "transparent",
              opacity: 0.8,
            }}
          >
            {name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CardView;
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
});
