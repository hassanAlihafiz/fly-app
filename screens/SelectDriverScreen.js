import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

import { getCall } from "../utils/API";
import { getLocalStorage } from "../utils/LocalStorage";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MessageOverlay } from "../components/Overlays";
import { getDistance, isPointWithinRadius } from "geolib";

const SelectDriverScreen = ({ route }) => {
  const navigation = useNavigation();
  const {
    packageData,
    gasStation,
    serviceFee,
    carType,
    total,
    numOfGal,
    lat,
    lng,
    washStation,
  } = route.params;

  const [loading, setLoading] = React.useState(true);
  const [zipDrivers, setZipDrivers] = React.useState(null);
  const [user, setUser] = React.useState({});
  const [selectedDriver, setDriver] = React.useState("");
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    if (Object.keys(user).length != 0) {
      getZipDrivers();
    }
  }, [user]);

  const getUser = async () => {
    const _user = await getLocalStorage("user");
    setUser(_user);
  };
  console.log(
    isPointWithinRadius(
      { latitude: 24.858482932069435, longitude: 67.06088024784917 },
      { latitude: 24.858479703009476, longitude: 67.0608801394701 },
      10000
    )
  );
  const getZipDrivers = () => {
    getCall("driver/getDrivers", "GET", user.token)
      .then((e) => {
        const db = [];

        e?.data?.map((driver) => {
          if (driver.status == true && driver.available == true) {
            const nearbyDriver = isPointWithinRadius(
              { latitude: Number(lat), longitude: Number(lng) },
              { latitude: Number(driver.lat), longitude: Number(driver.lng) },
              5000
            );
            if (nearbyDriver == true) {
              db.push(driver);
            }
          }
        });

        // e?.data?.map((value) => {
        //   if (value.zipCodeId === user.zipCodeId) {
        //     db.push(value);
        //   }
        // });
        setZipDrivers(db);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSelect = () => {
    if (selectedDriver != "") {
      navigation.navigate("PaymentScreen", {
        packageData,
        gasStation,
        serviceFee,
        carType,
        total,
        numOfGal,
        lat,
        lng,
        washStation,
        selectedDriver,
      });
    } else {
      setError({
        value: true,
        message: "Please select a driver",
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
          Select Driver
        </Text>
        <FontAwesome name="drivers-license-o" size={24} color="black" />
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
        ) : zipDrivers.length == 0 ? (
          <Text>No Driver in your location</Text>
        ) : (
          zipDrivers.map((value, key) => {
            return (
              <View
                key={key}
                style={{
                  marginVertical: 10,

                  width: "98%",
                }}
              >
                <TouchableOpacity
                  onPress={() => setDriver(value)}
                  style={
                    selectedDriver.id == value.id
                      ? {
                          padding: 20,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderRadius: 10,
                          backgroundColor: "#CCC",
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 1,
                            height: 2,
                          },
                          shadowOpacity: 0.13,
                          shadowRadius: 4,

                          elevation: 20,
                        }
                      : {
                          padding: 20,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderRadius: 10,
                          backgroundColor: "white",
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 1,
                            height: 2,
                          },
                          shadowOpacity: 0.13,
                          shadowRadius: 4,

                          elevation: 20,
                        }
                  }
                >
                  <AntDesign name="user" size={30} color="black" />
                  <Text style={{ color: "black" }}>
                    {value.first_name} {value.last_name}
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
          Select Driver
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectDriverScreen;
