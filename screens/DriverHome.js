import { ActivityIndicator, Switch, Text, View } from "react-native";
import React, { Component } from "react";
import { Directions, ScrollView } from "react-native-gesture-handler";
import CardView from "../components/CardView";
import moment from "moment";
import DateView from "../components/DateView ";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";
import { getPostCall } from "../utils/API";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import DriverHomeStatusCard from "../components/DriverHomeStatusCard";
import { widthPercentageToDP } from "react-native-responsive-screen";
import DriverHomeBooking from "../components/DriverHomeBooking";

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    // Storing Received Lat & Long to DB by logged In User Id

    console.log("Received new locations for user = ", locations);
  }
});

let foregroundSubscription = null;

const DriverHome = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [status, setStatus] = React.useState("Offline");
  const [locState, setLocState] = React.useState({
    lat: 0,
    lng: 0,
  });
  const [bookingData, setBookingData] = React.useState(null);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  React.useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted)
        await Location.requestBackgroundPermissionsAsync();
    };
    requestPermissions;
  }, []);
  React.useEffect(() => {
    if (isEnabled == true) {
      getBooking();
    }
  }, [loading]);
  React.useEffect(() => {
    let interval = 0;
    if (isEnabled === false) {
      disableLocation();
    } else {
      setDriverOnline();
      setLoading(true);
      interval = setInterval(() => {
        updateLocation();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isEnabled]);

  const disableLocation = () => {
    setIsEnabled(false);
    setStatus("Offline");
    setDriverOffline();
    stopForegroundUpdate();
    stopBackgroundUpdate();
  };
  const updateLocation = () => {
    setLoading(true);
    startForegroundUpdate();
    startBackgroundUpdate();
  };
  const setDriverOnline = async () => {
    const user = await getLocalStorage("user");
    await getPostCall(
      "status/driverOnline",
      "POST",
      JSON.stringify({ id: user?.id }),
      user?.token
    )
      .then((e) => {
        console.log("status updated on db");
        setStatus("Online");
      })
      .catch((e) => {
        console.log("error", e);
        setLoading(false);
        setStatus("Error");
        setIsEnabled(false);
      });
  };
  const setUpdatedLocation = async (_loc) => {
    const user = await getLocalStorage("user");
    await setLocalStorage("driver_coords", JSON.stringify(_loc));
    const data = {
      id: user?.id,
      lat: _loc.coords.latitude,
      lng: _loc.coords.longitude,
    };
    console.log("lat", _loc.coords.latitude);
    console.log("lng", _loc.coords.longitude);

    await getPostCall(
      "status/liveLocation",
      "POST",
      JSON.stringify(data),
      user?.token
    )
      .then((e) => {
        console.log("location updates in db");
        setLoading(false);
      })
      .catch((e) => console.log("error updating location in db"));
  };
  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted

    if (isEnabled) {
      const { granted } = await Location.getForegroundPermissionsAsync();
      if (!granted) {
        console.log("location tracking denied");
        return;
      }

      // Make sure that foreground location tracking is not running
      foregroundSubscription?.remove();

      // Start watching position in real-time

      foregroundSubscription = await Location.watchPositionAsync(
        {
          // For better logs, we set the accuracy to the most sensitive option
          accuracy: Location.Accuracy.BestForNavigation,
        },
        (location) => {
          setLocState({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
          // console.log("CORRDS", location.coords);
          setUpdatedLocation(location);
          // setPosition(location.coords);
        }
      );
    }
  };
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();
    // console.log("tracking stopped");
  };
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync();
    if (!granted) {
      // console.log("location tracking denied");
      return;
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
    if (!isTaskDefined) {
      // console.log("Task is not defined");
      return;
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      console.log("Already started");
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    });
  };
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log("Location tacking stopped");
    }
  };
  const setDriverOffline = async () => {
    const user = await getLocalStorage("user");
    await getPostCall(
      "status/driverOffline",
      "POST",
      JSON.stringify({ id: user?.id }),
      user?.token
    )
      .then((e) => {
        console.log("status offline updated on db");
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  const getBooking = async () => {
    const user = await getLocalStorage("user");
    await getPostCall(
      "booking/getBooking",
      "POST",
      JSON.stringify({ id: user?.id }),
      user?.token
    )
      .then((e) => {
        if (e.data.length != 0) {
          setBookingData(e.data);
        } else {
          setBookingData(null);
        }
      })
      .catch((e) => console.log("catch", e));
  };

  return (
    <View>
      <DateView name={moment().format("ddd, DD MMM YYYY z")} color="black" />
      {/* <CardView name="Hello Dev" img={require("../assets/sedan.jpeg")} /> */}
      <View
        style={{
          padding: 10,
          // height: widthPercentageToDP("100%"),
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <DriverHomeStatusCard
          loading={loading}
          status={status}
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
          lat={locState?.lat}
          lng={locState?.lng}
        />
        {isEnabled && bookingData != null ? (
          <DriverHomeBooking enable={isEnabled} data={bookingData} />
        ) : null}
      </View>
    </View>
  );
};

export default DriverHome;
