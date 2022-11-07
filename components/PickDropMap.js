import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from "react-native-maps";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";

const PickDropMap = () => {
  const navigation = useNavigation();
  const [locationState, setLocationState] = React.useState({
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  });
  console.log(locationState);
  return (
    <View>
      <View
        style={{
          display: "flex",
          margin: 10,
          padding: 10,
          borderRadius: 10,
          position: "absolute",
          backgroundColor: "white",
          width: "95%",
          zIndex: 2,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Packages
          </Text>
          <MaterialIcons name="local-car-wash" size={24} color="black" />
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ marginTop: 10, height: "100%", width: "100%" }}
        userInterfaceStyle="dark"
        onRegionChange={(e) => setLocationState(e)}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Entypo name="location-pin" size={24} color="black" />
        </View>
      </MapView>
    </View>
  );
};

export default PickDropMap;
