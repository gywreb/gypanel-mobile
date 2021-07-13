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
  isBlack = false,
}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <View
            style={[
              styles.check,
              { borderColor: isBlack ? appColor.black : borderCheckColor },
            ]}
          >
            <View
              style={[
                styles.bgCheck,
                checked
                  ? checkColor && {
                      backgroundColor: isBlack ? appColor.black : checkColor,
                    }
                  : { backgroundColor: "transparent" },
              ]}
            />
          </View>
          <Text
            style={[
              styles.label,
              { color: isBlack ? appColor.black : appColor.white },
            ]}
          >
            {label}
          </Text>
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
    marginRight: 5,
    marginBottom: 5,
  },
  bgCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
