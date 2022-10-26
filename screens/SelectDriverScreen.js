import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getCall } from "../utils/API";
import { getLocalStorage, getToken } from "../utils/LocalStorage";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SelectDriverScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(true);
  const [zipDrivers, setZipDrivers] = React.useState(null);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    if (user != null) {
      getZipDrivers();
    }
  }, [user]);

  const getUser = async () => {
    const _user = await getLocalStorage("user");
    setUser(_user);
  };

  const getZipDrivers = () => {
    getCall("driver/getDrivers", "GET", user.token)
      .then((e) => {
        const db = [];
        console.log("all", e.data);
        e?.data?.map((value) => {
          if (value.zipCodeId === user.zipCodeId) {
            console.log(value);
            db.push(value);
          }
        });
        setZipDrivers(db);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log("user", user);
  console.log("zips", zipDrivers);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
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
        <Text
          style={{
            marginVertical: 10,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Select Driver
        </Text>
        <FontAwesome name="drivers-license-o" size={24} color="black" />
      </View>
      <KeyboardAvoidingScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: 10, marginBottom: 50 }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          zipDrivers.map((value, key) => {
            return (
              <View
                key={key}
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 10,

                  width: "98%",
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
                <AntDesign name="user" size={30} color="black" />
                <Text style={{ color: "black" }}>
                  {value.first_name} {value.last_name}
                </Text>

                <Text key={key} style={{ color: "black" }}>
                  {value.email}
                </Text>
              </View>
            );
          })
        )}
      </KeyboardAvoidingScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#43ce51",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderRadius: 10,
          height: 50,
        }}
        onPress={() => navigation.navigate("SelectDriver")}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Confirm and pay
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectDriverScreen;
