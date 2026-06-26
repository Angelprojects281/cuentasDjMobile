import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e3543",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    width: "100%",
    height: "100%",
    alignContent: "center",
  },

  tittle: {
    color: "#ffffff",
    fontSize: 30,
    textAlign: "center",
    margin: 30,
    fontWeight: 600,
  },

  buttonPrincipal: {
    backgroundColor: "#4cc4e5",
    width: 180,
    height: 60,
    borderRadius: 20,
    elevation: 10,
    padding: 20,
    margin: 15,
  },

  buttonSecundario: {
    backgroundColor: "#e86565",
    width: 180,
    height: 60,
    borderRadius: 20,
    elevation: 10,
    padding: 20,
    margin: 15,
  },

  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: "#4e4c4c",
    fontWeight: 600,
  },

  logo: {
    width: 300,
    height: 250,
    filter: "brightness(5) invert(1)",
  },

  input: {
    width: 150,
    height: 60,
    maxHeight: 60,
    maxWidth: 150,
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: 20,
    padding: 15,
    fontSize: 15,
    marginBottom: 50,
  },
});
