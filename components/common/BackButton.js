import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.pop()}>
      <Ionicons name="ios-arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
