import React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View } from "react-native";
import Login from "./Login";
import Signup from "./Signup";



const AuthTabs = ({ navigation,props }) => {
  console.log("my", props)
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Log In" },
    { key: "second", title: "Sign Up" },
  ]);
  const renderScene = SceneMap({
    first: () => <Login props={props} navigation={navigation} />,
    second: () => <Signup props={props} navigation={navigation} />,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: wp("100%"), backgroundColor: "green" }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          labelStyle={{ textTransform: "none" }}
          style={{
            backgroundColor: "transparent",
          }}
          indicatorStyle={{
            borderBottomWidth: 3,
            borderBottomColor: "#e8a11c",
          }}
          indicatorContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: "#d4d4d4",
          }}
          activeColor="#e8a11c"
          inactiveColor="#888888"
        />
      )}
    />
  );
};

export default AuthTabs;
