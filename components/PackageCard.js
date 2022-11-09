import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const PackageCard = ({ packageData, carType }) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={
        packageData.type == "Gas"
          ? require("../assets/gas-station.jpg")
          : require("../assets/images.jpg")
      }
      imageStyle={{
        borderRadius: 20,
      }}
      style={{
        margin: 10,
        padding: 20,
        marginBottom: 60,

        width: widthPercentageToDP(80),
        height: "100%",
      }}
      blurRadius={2}
    >
      <View>
        <Text
          style={{
            fontWeight: "500",
            textAlign: "center",
            fontSize: 30,
            marginVertical: 3,
            color: "white",
          }}
        >
          {packageData.name}
        </Text>
        <Text
          style={
            packageData.type == "Gas"
              ? {
                  textAlign: "center",
                  fontSize: 30,
                  color: "#E20F10",
                  marginVertical: 3,
                }
              : {
                  textAlign: "center",
                  fontSize: 30,
                  color: "#E20F10",
                  marginVertical: 3,
                }
          }
        >
          ${packageData.Price}
        </Text>

        <View>
          {packageData.details.map((value) => {
            return (
              <View key={value} style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", color: "white" }}
                >
                  {"\u2022"}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    flex: 1,
                    paddingLeft: 5,
                    color: "white",
                  }}
                >
                  {value}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      {/* <View> */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          height: 30,
          backgroundColor: "#43ce51",
          justifyContent: "center",
          alignSelf: "center",
          width: "30%",
          borderRadius: 10,
          marginVertical: 10,
        }}
        onPress={() =>
          navigation.navigate("Checkout", {
            packageData: packageData,
            carType: carType,
            imgUrl:
              packageData.type == "Gas"
                ? require("../assets/gas-station.jpg")
                : require("../assets/images.jpg"),
          })
        }
      >
        <Text style={{ color: "white", alignSelf: "center" }}>
          {"$" + packageData.Price}
        </Text>
      </TouchableOpacity>
      {/* </View> */}
    </ImageBackground>
  );
};

export default PackageCard;
