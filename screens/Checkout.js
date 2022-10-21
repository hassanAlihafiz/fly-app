import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Cart from "../components/Cart";

const Checkout = ({ route, navigation }) => {
  const { itemName, itemPrice, imgUrl } = route.params;

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Cart itemName={itemName} itemPrice={itemPrice} imgUrl={imgUrl} />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          height: 50,
          backgroundColor: "#43ce51",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderRadius: 10,
          marginVertical: 20,
          marginHorizontal: 20,
        }}
        onPress={() => navigation.navigate("Payment Screen")}
      >
        <Text style={{ color: "white" }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;
