import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27AE60",
    paddingLeft: 20,
    paddingRight: 20,
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 8,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#E0E0E0",
  },
  buttons: {
    marginTop: 10,
    borderColor: "red",
  },
  button: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#F2994A",
    backgroundColor: "#F2994A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600",
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  myUser: {
    backgroundColor: "#6FCF97",
  },
});
