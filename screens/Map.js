import * as React from "react";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        zoomEnabled
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={Platform.OS === "android" ? "standard" : "standard"}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          centerOffset={(0, 0)}
          // onDrag={(e, n) => console.log("location", e.nativeEvent, n)}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          onSelect={(e) => console.log("onSelect", e.nativeEvent)}
          onDragEnd={(e) => console.log("onDragEnd", e.nativeEvent)}
          onDragStart={(e) => console.log("onDragStart", e.nativeEvent)}
        >
          <TouchableOpacity style={{ height: 80 }}>
            <Entypo name="location-pin" size={50} color="red" />
          </TouchableOpacity>
        </Marker>
      </MapView>
      <View style={styles.textView}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={"#FFFFFF"}
          style={{
            paddingLeft: 10,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  textView: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 30,
    width: "90%",
    backgroundColor: "rgba(30, 30, 30, 0.75)",
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    color: "#FFF",
    width: "85%",
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 17,
  },
});
