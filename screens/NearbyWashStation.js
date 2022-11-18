import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { Image } from "react-native";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MessageOverlay } from "../components/Overlays";

const NearbyWashStation = ({ route }) => {
  const { packageData, serviceFee, total, lat, lng, carType } = route.params;

  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [nearbyStations, setNearbyStations] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });

  React.useEffect(() => {
    getNearbyStations();
  }, []);

  const getNearbyStations = async () => {
    await axios
      .get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          lat.toString() +
          "," +
          lng.toString() +
          "&radius=10000&type=car_wash&key=" +
          "AIzaSyBIHr09mmQOV8a0LybJlTt39_8U4_1NokY"
      )
      .then((e) => {
        // console.log(e.data.results);
        setNearbyStations(e.data.results);
      })
      .then(() => setLoading(false));
  };

  const handleSelect = () => {
    if (selected != "") {
      navigation.navigate("SelectDriver", {
        washStation: selected,
        packageData,
        serviceFee,
        total,
        carType,
        lat,
        lng,
      });
    } else {
      setError({
        value: true,
        message: "Please select a wash station",
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <MessageOverlay
        value={error.value}
        setValue={setError}
        message={error.message}
      />
      <TouchableOpacity onPress={() => navigation.pop()}>
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
          Select Wash Stations
        </Text>
        <MaterialIcons name="local-car-wash" size={24} color="black" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: 10, marginBottom: 50 }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          nearbyStations.map((value, key) => {
            return (
              <View
                key={key}
                style={{
                  marginVertical: 10,
                  width: "98%",
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelected(value)}
                  style={{
                    padding: 20,
                    flexDirection: "row",
                    backgroundColor:
                      selected.place_id == value.place_id ? "#CCC" : "white",
                    alignItems: "center",
                    borderRadius: 10,

                    shadowColor: "#000",
                    shadowOffset: {
                      width: 1,
                      height: 2,
                    },
                    shadowOpacity: 0.13,
                    shadowRadius: 4,

                    elevation: 20,
                  }}
                >
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 10,
                    }}
                    source={{ uri: value.icon }}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ color: "black", fontSize: 19 }}>
                      {value.name}
                    </Text>
                    {/* <Text>Distance</Text> */}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
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
          width: "100%",
          borderRadius: 10,
        }}
        onPress={handleSelect}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Select Wash Station
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NearbyWashStation;
