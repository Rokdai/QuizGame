import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circleCorrect: {
    backgroundColor: "#28A125",
  },
  icon: {
    width: screen.width / 3,
  },
});

export const MyAlert = ({ correct, visible }) => {
  if (!visible) return null;

  const icon = correct
    ? require("../assets/check.png")
    : require("../assets/close.png");
  console.log(icon);
  const circleStyles = [styles.circle];

  if (correct) {
    circleStyles.push(styles.circleCorrect);
  }

  return (
    <View style={styles.container}>
      <View style={circleStyles}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
    </View>
  );
};
