import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { appColor } from "../configs/styles";
import { useFormikContext } from "formik";

const AppRadio = ({
  label,
  value,
  name,
  checkColor = appColor.white,
  borderCheckColor = appColor.white,
  checked,
  onPress,
}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <View style={[styles.check, { borderColor: borderCheckColor }]}>
            <View
              style={[
                styles.bgCheck,
                checked
                  ? checkColor && { backgroundColor: checkColor }
                  : { backgroundColor: "transparent" },
              ]}
            />
          </View>
          <Text style={[styles.label]}>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default AppRadio;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
  },
  label: {
    color: appColor.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  check: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    borderWidth: 0.5,
    borderColor: appColor.white,
    marginRight: 5,
    marginBottom: 5,
  },
  bgCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
