import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native";
import BackButton from "./BackButton";

export default DriverMapCard = ({ loading, text, duration, distance }) => {
  return (
    <View style={styles.main}>
      <BackButton />
      <View style={styles.justifyBetween}>
        <Text style={styles.textMain}>{text}</Text>
        <MaterialCommunityIcons
          name="navigation-variant"
          size={24}
          color="black"
        />
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.justifyBetween}>
            <View style={styles.alignCenter}>
              <Text style={styles.textSub}>{duration} min</Text>
              <AntDesign name="clockcircle" size={19} color="black" />
            </View>
            <View style={styles.alignCenter}>
              <Text style={styles.textSub}>{distance} km</Text>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={20}
                color="black"
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: "flex",
    margin: 20,
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "white",
    width: "90%",
    zIndex: 2,
  },
  justifyBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  textMain: { marginVertical: 10, fontSize: 20, fontWeight: "bold" },
  textSub: { marginRight: 10, fontSize: 20, fontWeight: "bold" },
});
