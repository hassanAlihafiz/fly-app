import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        animated={true}
      />
      <View style={{ flex: 1, backgroundColor: "#FFFF" }}>
        <View style={styles.headerContainer}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 40,
            }}
          >
            Menu
          </Text>
        </View>
        <DrawerItemList {...props} />
      </View>
      {/* <Text style={styles.version}>V 1.0.2</Text> */}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "space-between",
    backgroundColor: "red",
    width: "100%",
  },
  headerContainer: {
    paddingLeft: Platform.OS === "ios" ? 20 : 15,
    marginBottom: Platform.OS === "ios" ? 25 : 20,
    // alignItems: "center",
    backgroundColor: "red",
    height: 100,
  },
  header: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "red",
  },
  version: {
    bottom: 50,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
});
