import React from "react";
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Cart = ({ itemName, itemPrice, imgUrl }) => {
  const serviceFee = parseFloat(itemPrice * 0.12).toFixed(2);
  const total = (parseFloat(itemPrice) + parseFloat(serviceFee)).toFixed(2);
  const navigation = useNavigation();

  return (
    <View>
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
        <Text style={{ marginVertical: 10, fontSize: 20, fontWeight: "bold" }}>
          Your cart
        </Text>

        <AntDesign name="shoppingcart" size={24} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 10,

          width: "100%",
          backgroundColor: "white",
          padding: 20,
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
          source={imgUrl}
          style={{ height: 100, width: 100, borderRadius: 10 }}
        />

        <View>
          <Text>{itemName} Package</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>${itemPrice}</Text>
        </View>
      </View>
      <View style={{ marginVertical: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 5,
          }}
        >
          <Text>Subtotal</Text>
          <Text>${itemPrice}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 5,
          }}
        >
          <Text>Service fees</Text>
          <Text>${serviceFee}</Text>
        </View>
        <View
          style={{
            marginVertical: 10,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Total</Text>
          <Text style={{ fontWeight: "bold" }}>${total}</Text>
        </View>
      </View>
    </View>
  );
};

export default Cart;
