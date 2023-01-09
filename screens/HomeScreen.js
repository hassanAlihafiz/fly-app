import { Text, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CardView from "../components/CardView";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { Image } from "react-native";
import { withTheme } from "@rneui/themed";
import { getCall } from "../utils/API";

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
  const [adLoad, setAdLoad] = React.useState(true);
  const [adData, setAdData] = React.useState(null);
  React.useEffect(() => {
    getAd();
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
  const getAd = async () => {
    const user = await getLocalStorage("user");

    await getCall("ad/getAd", user?.token)
      .then((e) => {
        if (e.data != "") {
          setAdData(e.data);
        }
        setAdLoad(false);
      })
      .catch((e) => setAdLoad(false));
  };

  return (
    <View>
      <ScrollView style={adData != null && { marginBottom: 100 }}>
        {carTypes.map((value, key) => {
          return (
            <CardView
              key={key}
              name={value.name}
              img={value.img}
              adData={adData}
            />
          );
        })}
      </ScrollView>
      {adData != null && (
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
            source={{ url: adData?.url }}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      )}
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
