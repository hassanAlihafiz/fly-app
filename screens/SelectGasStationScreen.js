import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

import { getCall } from "../utils/API";
import { getLocalStorage } from "../utils/LocalStorage";
import { ActivityIndicator } from "react-native";
import { MessageOverlay } from "../components/Overlays";

const SelectGasStationScreens = ({ route }) => {
  const navigation = useNavigation();
  const { packageData, serviceFee, total, carType, numOfGal } = route.params;

  const [loading, setLoading] = React.useState(true);
  const [gasStations, setGasStations] = React.useState(null);
  const [user, setUser] = React.useState({});
  const [selected, setSelected] = React.useState("");
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    if (Object.keys(user).length != 0) {
      getGasStations();
    }
  }, [user]);

  const getUser = async () => {
    const _user = await getLocalStorage("user");
    setUser(_user);
  };

  const getGasStations = () => {
    getCall("gasStation/getGasStation", user.token)
      .then((e) => {
        setGasStations(e?.data);
        setLoading(false);
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      });
  };

  const handleSelect = () => {
    if (selected != "") {
      navigation.navigate("PickDropMap", {
        gasStation: selected,
        packageData: packageData,
        serviceFee: serviceFee,
        total: total,
        carType: carType,
        numOfGal: numOfGal,
      });
    } else {
      setError({
        value: true,
        message: "Please select a gas station",
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
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <MessageOverlay
        value={error.value}
        setValue={setError}
        message={error.message}
      />

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
          Select Gas Stations
        </Text>
        <FontAwesome5 name="gas-pump" size={24} color="black" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: 10, marginBottom: 50 }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : gasStations.length == 0 ? (
          <Text>No Stations Found</Text>
        ) : (
          gasStations.map((value, key) => {
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

                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: selected.id == value.id ? "#CCC" : "white",
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
                    source={{
                      uri: value.imgUrl,
                    }}
                  />
                  <Text
                    style={{ color: "black", marginLeft: 40, fontSize: 19 }}
                  >
                    {value.name}
                  </Text>

                  <Text key={key} style={{ color: "black" }}>
                    {value.email}
                  </Text>
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
          Select Gas Station
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectGasStationScreens;
