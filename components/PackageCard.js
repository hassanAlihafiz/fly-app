import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";


const PackageCard = ({ name, price, details, navigation }) => {
  return (
    <View
      style={{
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 10,
      }}
    >
      <ImageBackground
        source={require("../assets/images.jpg")}
        style={{
          borderRadius: 20,
          padding: 10,
          width: widthPercentageToDP(93),
        }}
        blurRadius={2}
      >
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              marginVertical: 3,
              color: "white",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              color: "#E20F10",
              marginVertical: 3,
            }}
          >
            ${price}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              color: "#326996",
              fontWeight: "bold",
            }}
          >
            GOLD WASH +
          </Text>
          {details.map((value) => {
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
        <TouchableOpacity
          style={{
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
              itemName: name,
              itemPrice: price,
              imgUrl: require("../assets/images.jpg"),
            })
          }
        >
          <Text style={{ color: "white", alignSelf: "center" }}>
            {"$" + price}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default PackageCard;
