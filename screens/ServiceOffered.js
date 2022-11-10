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
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

const ServiceOffered = ({ route, navigation }) => {
  const carType = route?.params;

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

  console.log(route?.params);
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        style={{ marginLeft: 20, marginTop: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Text
              style={{
                marginTop: 10,
                color: "black",
                fontWeight: "bold",
                fontSize: 22,
                marginHorizontal: 20,
                marginHorizontal: 20,
              }}
            >
              Car Wash
            </Text>
            <ScrollView
              horizontal
              contentContainerStyle={{
                marginHorizontal: 10,

                marginTop: 5,
                marginBottom: 5,
              }}
              showsHorizontalScrollIndicator={false}
            >
              {packages
                .filter((arr) => arr.type == "Car Wash")
                .map((value, key) => {
                  return (
                    <PackageCard
                      packageData={value}
                      key={key}
                      carType={carType}
                    />
                  );
                })}
            </ScrollView>

            <Text
              style={{
                marginTop: 10,
                color: "black",
                fontWeight: "bold",
                fontSize: 22,
                marginHorizontal: 20,
              }}
            >
              Gas
            </Text>
            {packages.filter((arr) => arr.type == "Gas").length == 0 ? (
              <Text
                style={{
                  marginTop: 10,
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 15,
                  marginHorizontal: 20,
                }}
              >
                No Active package of this category
              </Text>
            ) : (
              <ScrollView
                horizontal
                contentContainerStyle={{
                  marginLeft: 10,

                  marginTop: 5,
                  marginBottom: 5,
                }}
                showsHorizontalScrollIndicator={false}
              >
                {packages
                  .filter((arr) => arr.type == "Gas")
                  .map((value, key) => {
                    return (
                      <PackageCard
                        packageData={value}
                        key={key}
                        carType={carType}
                      />
                    );
                  })}
              </ScrollView>
            )}

            <Text
              style={{
                marginTop: 10,
                color: "black",
                fontWeight: "bold",
                fontSize: 22,
                marginHorizontal: 20,
              }}
            >
              Others
            </Text>
            {packages.filter((arr) => arr.type == "Others").length == 0 ? (
              <Text
                style={{
                  marginTop: 10,
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 15,
                  marginHorizontal: 20,
                }}
              >
                No Active package of this category
              </Text>
            ) : (
              <>
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    marginLeft: 10,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  {packages
                    .filter((arr) => arr.type == "Others")
                    .map((value, key) => {
                      return (
                        <PackageCard
                          packageData={value}
                          key={key}
                          carType={carType}
                        />
                      );
                    })}
                </ScrollView>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default ServiceOffered;
