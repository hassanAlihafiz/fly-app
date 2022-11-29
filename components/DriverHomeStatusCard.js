import React from "react";
import { ActivityIndicator, Switch, Text } from "react-native";
import { View } from "react-native";

export default DriverHomeStatusCard = ({
  loading,
  status,
  isEnabled,
  toggleSwitch,
  lat,
  lng,
}) => {
  return (
    <View
      style={{
        borderRadius: 10,
        height: isEnabled ? 140 : null,
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
        justifyContent: "space-between",
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15 }}>Status: </Text>
          <Text style={{ fontSize: 15 }}>{status}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15 }}>Go online</Text>
          <Switch
            disabled={loading}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View>
        {isEnabled ? (
          loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text>Lat: {lat}</Text>
              <Text>Lng: {lng}</Text>
            </>
          )
        ) : null}
      </View>
    </View>
  );
};
