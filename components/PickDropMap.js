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
  TextInput,
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
import { FontAwesome5 } from "@expo/vector-icons";

const PickDropMap = () => {
  const navigation = useNavigation();
  const [maploading, setMaploading] = React.useState();
  const [locationState, setLocationState] = React.useState({
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  });

  return (
    <View>
      <MapView
        loadingEnable={maploading}
        provider={PROVIDER_GOOGLE}
        style={{ height: "100%", width: "100%" }}
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
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </View>
      </MapView>

      <View
        style={{
          display: "flex",
          margin: 20,
          padding: 10,
          borderRadius: 10,
          position: "absolute",
          backgroundColor: "white",
          width: "90%",
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
            Pickup Location
          </Text>
          <MaterialIcons name="local-car-wash" size={24} color="black" />
        </View>
        <TextInput
          placeholder="Enter pickup location"
          autoComplete="name"
          placeholderTextColor="#9EA0A4"
          // onChangeText={(e) => handleData("firstName", e)}
          style={{
            height: 40,
            borderWidth: 1,
            borderColor: "#d7d7d7",
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          height: 50,
          marginVertical: 20,
          marginHorizontal: 20,

          backgroundColor: "#43ce51",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",

          borderRadius: 10,
        }}
        onPress={() =>
          navigation.navigate("SelectDriver", {
            // packageData: packageData,
            // imgUrl: require("../assets/images.jpg"),
          })
        }
      >
        <Text style={{ color: "white", alignSelf: "center" }}>
          Confirm pickup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickDropMap;
