import AsyncStorage from "@react-native-async-storage/async-storage";

import React from "react";

export const LocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
};

// export const getLocalStorage = async (key) => {
//   await AsyncStorage.getItem(key);
// };
