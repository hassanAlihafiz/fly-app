import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

export const container = StyleSheet.create({
  flex: 1,
  width: widthPercentageToDP("90%"),
  backgroundColor: "white",
});

export const formStyles = StyleSheet.create({
  main: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainSecond: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    height: 90,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: widthPercentageToDP("80%"),
    justifyContent: "space-between",
  },
  placeholderTextColor: "#9EA0A4",
  blackText: { color: "black" },
  inputHalf: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    width: "48%",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  inputFull: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    width: widthPercentageToDP("80%"),
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  pickerIOS: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    height: 40,
    borderColor: "#d7d7d7",
    width: widthPercentageToDP("80%"),
    padding: 10,
    borderRadius: 5,
  },
  yellowButton: {
    height: 50,
    width: widthPercentageToDP("90%"),
    backgroundColor: "#ef9c00",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  whiteTextCenter: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
  },
  blackTextCenter: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});