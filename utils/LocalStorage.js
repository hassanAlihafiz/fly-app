import AsyncStorage from "@react-native-async-storage/async-storage";

import React from "react";

export const setLocalStorage = async (key, value) => {
  console.log(key, value);
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Error saving data
  }
};

export const getLocalStorage = async (key) => {
  const value = JSON.parse(await AsyncStorage.getItem(key));
  if (value) {
    return value;
  }
  return null;
};

export const getToken = async (key) => {
  const value = JSON.parse(await AsyncStorage.getItem(key));
  if (value) {
    return value.token;
  }
  return null;
};
export const getUserZip = async (key) => {
  const value = JSON.parse(await AsyncStorage.getItem(key));
  if (value) {
    return value.token;
  }
  return null;
};
export const clearLocalStorage = async () => {
  await AsyncStorage.clear();
};
