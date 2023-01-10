import { View, Text } from "react-native";
import React from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCall } from "../utils/API";
import MyBookingCard from "../components/MyBookingCard";
import { ActivityIndicator } from "react-native";
import { getLocalStorage } from "../utils/LocalStorage";
import { StyleSheet } from "react-native";

const DriverCompleted = () => {
  const navigation = useNavigation();
  const [bookings, setBookings] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    const focused = navigation.addListener("focus", () => {
      getBookingById();
    });
  }, [navigation]);

  React.useEffect(() => {
    getBookingById();
  }, [refresh]);

  React.useEffect(() => {
    getBookingById();
  }, []);

  const getBookingById = async () => {
    const user = await getLocalStorage("user");

    await getCall(`booking/getBookingByDriverId?id=${user?.id}`, user?.token)
      .then((e) => {
        setBookings(e.data);

        setLoader(false);
        setRefresh(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 20,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
        />
      }
    >
      {loader ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.main}>
          {bookings.map((value, key) => {
            return (
              <View key={key}>
                <MyBookingCard driver={true} index={key} data={value} />
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default DriverCompleted;

const styles = StyleSheet.create({
  main: {
    marginBottom: 40,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 20,
  },
});
