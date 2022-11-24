import { ActivityIndicator, Switch, Text, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CardView from "../components/CardView";
import moment from "moment";
import DateView from "../components/DateView ";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";
import { getPostCall } from "../utils/API";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

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

  React.useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted)
        await Location.requestBackgroundPermissionsAsync();
    };
    requestPermissions;
  }, []);

  let refreshInterval = 0;

  React.useEffect(() => {
    console.log("Enable", isEnabled);
    let interval = 0;
    if (isEnabled === false) {
      
      console.log("INTerveal", "off");
      setIsEnabled(false);
      setStatus("Offline");
      stopForegroundUpdate();
      stopBackgroundUpdate();
    } else {
      interval = setInterval(() => {
        setLoading(true);
        startForegroundUpdate();
        startBackgroundUpdate();
        console.log("interval");
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    console.log("Fore Start", isEnabled);
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
          setDriverOnline(location);
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

  console.log("Checking", isEnabled);
  const setDriverOnline = async (_loc) => {
    const user = await getLocalStorage("user");
    const data = {
      id: user?.id,
      lat: _loc.coords.latitude + 10,
      lng: _loc.coords.longitude,
    };
    console.log("lat", _loc.coords.latitude);

    await getPostCall(
      "status/driverOnline",
      "POST",
      JSON.stringify({ id: user?.id }),
      user?.token
    )
      .then((e) => {
        console.log("status updated on db");
        setLoading(false);
        setStatus("Online");
      })
      .catch((e) => {
        console.log("error", e);
        setLoading(false);
        setStatus("Error");
        setIsEnabled(false);
      });
    await getPostCall(
      "status/liveLocation",
      "POST",
      JSON.stringify(data),
      user?.token
    )
      .then((e) => console.log("location updates in db"))
      .catch((e) => console.log("error updating location in db"));
  };

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    const user = await getLocalStorage("user");
    console.log(status);
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 5000,
    });
    await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000,
      },
      (e) => {
        console.log(e);
      },
      (error) => console.log(error)
    );
  };

  return (
    <ScrollView style={{ margin: 10 }}>
      <DateView name={moment().format("ddd, DD MMM YYYY z")} color="black" />
      {/* <CardView name="Hello Dev" img={require("../assets/sedan.jpeg")} /> */}
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
        }}
      >
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

        {isEnabled ? (
          loading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <View>
              <Text>Lat: {locState?.lat}</Text>
              <Text>Lng: {locState?.lng}</Text>
            </View>
          )
        ) : null}
      </View>
    </ScrollView>
  );
};

export default DriverHome;
