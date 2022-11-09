import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Cart = ({
  data,
  imgUrl,
  serviceFee,
  total,
  gallons,
  setGallons,
  subTotal,
  carType,
}) => {
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
          <Text>{data.name} Package</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>${data.Price}</Text>
        </View>
      </View>
      <ScrollView style={{ height: "100%" }}>
        {data.type == "Gas" ? (
          <View style={{ marginTop: 20 }}>
            <Text>Number of gallons</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (gallons > 0)
                    setGallons((parseInt(gallons) - 1).toString());
                }}
              >
                <AntDesign name="minuscircle" size={30} color="gray" />
              </TouchableOpacity>
              <TextInput
                keyboardType="numeric"
                value={gallons}
                onChangeText={(e) => {
                  setGallons(e);
                }}
                maxLength={2}
                style={{
                  paddingHorizontal: 10,
                  textAlign: "center",
                  fontSize: 20,
                  width: 60,
                  height: 50,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginHorizontal: 10,
                  color: gallons == 0 ? "red" : "black",
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setGallons((parseInt(gallons) + 1).toString());
                }}
              >
                <AntDesign name="pluscircle" size={30} color="gray" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical: 10,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            />
          </View>
        ) : null}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text>Subtotal</Text>
            <Text>${subTotal}</Text>
          </View>
          {carType.carType === "MPV" || carType.carType === "SUV" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <Text>Extra fees for {carType.carType}</Text>
              <Text>$ 5</Text>
            </View>
          ) : null}
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
      </ScrollView>
    </View>
  );
};

export default Cart;
