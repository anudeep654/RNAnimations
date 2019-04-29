import { StyleSheet, Dimensions } from "react-native";
const tabHeight = Dimensions.get("window").height;
export default (styles = StyleSheet.create({
  itemStyle: {
    marginRight: 10,
    padding: 18,
    height: "100%",
    borderColor: "red",
    borderBottomWidth: 5,
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: null,
    fontFamily: "Zapfino"
  },
  itemStyleWithoutBorder: {
    marginRight: 10,
    padding: 10,
    fontSize: 20,
    borderColor: null,
    borderWidth: 0
  },
  imageStyles: {
    width: 50,
    height: 50
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: tabHeight * 0.1,
    margin: 5
  },
  tabContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  scrollViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
}));
