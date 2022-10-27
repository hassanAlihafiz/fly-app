import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Cart from "../components/Cart";

const Checkout = ({ route, navigation }) => {
  const { packageData, imgUrl } = route.params;

  const serviceFee = parseFloat(packageData.Price * 0.12).toFixed(2);
  const total = (
    parseFloat(packageData.Price) + parseFloat(serviceFee)
  ).toFixed(2);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Cart
        itemName={packageData.name}
        itemPrice={packageData.Price}
        imgUrl={imgUrl}
        serviceFee={serviceFee}
        total={total}
      />
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
        onPress={() =>
          navigation.navigate("SelectDriver", {
            packageData: packageData,
            serviceFee: serviceFee,
            total: total,
          })
        }
      >
        <Text style={{ color: "white" }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;
