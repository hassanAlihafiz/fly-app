import moment from "moment";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

export default DriverHomeBooking = ({ data }) => {
  console.log(
    "Hewy",
    moment.unix(data?.dateCreated._seconds).format("MM/DD/YYYY")
  );
  return (
    <View
      style={{
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
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text>
          Order Time: {moment.unix(data?.dateCreated._seconds).format("MM/DD/YYYY HH:MM")}
        </Text>
        <Text>
          Customer Name:{" "}
          {data?.userData?.first_name + " " + data?.userData?.last_name}
        </Text>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text>Package Name: {data?.packageData?.name}</Text>
        <Text>Package Type: {data?.packageData?.type}</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Amount: $ {data?.amount}</Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            height: 40,
            width: 100,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            height: 40,
            width: 100,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
