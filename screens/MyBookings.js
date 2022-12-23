import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/base";
import React from "react";
import { RefreshControl } from "react-native";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";
import MyBookingCard from "../components/MyBookingCard";
import { getCall } from "../utils/API";
import { getLocalStorage } from "../utils/LocalStorage";

export default MyBookings = () => {
  const navigation = useNavigation();

  const [bookings, setBookings] = React.useState([]);
  const [ongoingBooking, setOngoingBooking] = React.useState([]);
  const [completedBookings, setCompletedBookings] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [ongoingCollapse, setOngoingCollapse] = React.useState(false);
  const [completedCollapse, setCompletedCollapse] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

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

    await getCall(`booking/getBookingByCustomerId?id=${user?.id}`, user?.token)
      .then((e) => {
        setBookings(e.data);
        setOngoingBooking(
          e.data.filter((arr) => arr.bookingStatus != "completed")
        );
        setCompletedBookings(
          e.data.filter((arr) => arr.bookingStatus == "completed")
        );
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
        <>
          <View style={styles.main}>
            <TouchableOpacity
              disabled={ongoingBooking.length == 0}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
              onPress={() => {
                if (completedCollapse) {
                  setCompletedCollapse(false);
                  setOngoingCollapse(!ongoingCollapse);
                } else {
                  setOngoingCollapse(!ongoingCollapse);
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <MaterialIcons name="pending" size={24} color="black" />
                <Text style={{ marginLeft: 10, fontSize: 20 }}>Ongoing</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {ongoingBooking.length == 0 ? (
                  <Text>No ongoing booking</Text>
                ) : (
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={24}
                    color="black"
                    style={{
                      transform: [
                        { rotate: ongoingCollapse ? "270deg" : "90deg" },
                      ],
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>

            <ScrollView style={{ maxHeight: "90%" }}>
              {ongoingCollapse &&
                ongoingBooking.map((value, key) => {
                  return <MyBookingCard key={key} data={value} ongoing />;
                })}
            </ScrollView>
          </View>
          <View style={styles.main}>
            <TouchableOpacity
              disabled={completedBookings.length == 0}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
              onPress={() => {
                if (ongoingCollapse) {
                  setOngoingCollapse(false);
                  setCompletedCollapse(!completedCollapse);
                } else {
                  setCompletedCollapse(!completedCollapse);
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <AntDesign name="checkcircle" size={22} color="black" />
                <Text style={{ marginLeft: 10, fontSize: 20 }}>Completed</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {completedBookings.length == 0 ? (
                  <Text>No completed booking</Text>
                ) : (
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={24}
                    color="black"
                    style={{
                      transform: [
                        { rotate: completedCollapse ? "270deg" : "90deg" },
                      ],
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
            <ScrollView style={{ maxHeight: "90%" }}>
              {completedCollapse &&
                completedBookings.map((value, key) => {
                  return <MyBookingCard key={key} data={value} />;
                })}
            </ScrollView>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
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
    marginTop: 5,
    marginBottom: 5,
  },
});
