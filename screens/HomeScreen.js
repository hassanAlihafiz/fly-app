import { Text, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CardView from "../components/CardView";
import { setLocalStorage } from "../utils/LocalStorage";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { Image } from "react-native";
import { withTheme } from "@rneui/themed";

const BACKGROUND_FETCH_TASK = "background-fetch";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

const Home = () => {
  React.useEffect(() => {
    const background = async () => {
      const status = await BackgroundFetch.getStatusAsync();
      const isRegistered = await TaskManager.isTaskRegisteredAsync(
        BACKGROUND_FETCH_TASK
      );
      console.log("status", status);
      console.log("register", isRegistered);

      if (isRegistered) {
        await registerBackgroundFetchAsync();
      }
    };
    background();
  }, []);

  return (
    <View>
      <ScrollView style={{ marginBottom: 100 }}>
        {carTypes.map((value, key) => {
          return <CardView key={key} name={value.name} img={value.img} />;
        })}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 100,
          width: "100%",
          backgroundColor: "white",
          padding: 1,
        }}
      >
        <Image
          source={require("../assets/Ad.jpeg")}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const carTypes = [
  {
    name: "HATCHBACK",
    img: require("../assets/hackBook.jpeg"),
  },
  {
    name: "SEDAN",
    img: require("../assets/sedan.jpeg"),
  },
  {
    name: "MPV",
    img: require("../assets/mpv.jpeg"),
  },
  { name: "SUV", img: require("../assets/suv.jpeg") },
];
