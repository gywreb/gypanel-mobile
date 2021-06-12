import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../configs/constants";
import { appColor } from "../configs/styles";

const AppError = ({ text, textStyle, containerStyle }) => {
  return (
    <View style={[styles.errorContainer, containerStyle]}>
      <Text style={[styles.textError, textStyle]}>{text}</Text>
    </View>
  );
};

export default AppError;

const styles = StyleSheet.create({
  errorContainer: {
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 0.05 * SCREEN_WIDTH,
  },
  textError: {
    color: appColor.danger,
    fontSize: 16,
    fontWeight: "bold",
  },
});
