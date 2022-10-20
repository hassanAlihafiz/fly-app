import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Cart from "../components/Cart";
import CheckoutBottomSheet from "../components/CheckoutBottomSheet";

const Checkout = ({ route, navigation }) => {
  const [isVisible, setIsVisible] = React.useState(false);
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
        onPress={() => setIsVisible(true)}
      >
        <Text style={{ color: "white" }}>Checkout</Text>
      </TouchableOpacity>
      <CheckoutBottomSheet isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

export default Checkout;
