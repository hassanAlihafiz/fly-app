import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { clearLocalStorage, setLocalStorage } from "../utils/LocalStorage";
import { DevSettings } from "react-native";
const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await clearLocalStorage();
    navigation.navigate("Landing");
  };

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        animated={true}
      />
      <DrawerContentScrollView contentContainerStyle={styles.container}>
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
        <Pressable
          style={{
            height: 60,
            backgroundColor: "#FFFFFF",
            width: "100%",
            paddingLeft: 12,
          }}
        >
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  name="logout"
                  size={24}
                  color="#c74647"
                  style={{
                    alignSelf: "center",
                  }}
                />
              </View>
              <Text
                style={{
                  left: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                  width: "100%",
                  color: "#c74647",
                  fontSize: 20,
                  height: 40,
                  alignSelf: "center",
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </Pressable>
      </DrawerContentScrollView>
    </>
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
  item: {
    flexDirection: "row",
  },
});
