import { View, Text, TextInput } from "react-native";
import React from "react";

const TextInputComponent = (props) => {
  return (
    <View style={{ paddingLeft: 20, marginVertical: 15 }}>
      <Text>{props.name}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={{
          height: 40,
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          fontSize: 20,
        }}
        maxLength={props.maxLength}
      />
    </View>
  );
};

export default TextInputComponent;
