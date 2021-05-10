import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, Text } from "react-native";
import NumericInput from "react-native-numeric-input";
import { appColor } from "../configs/styles";

const AppNumericInput = ({
  name,
  hasIcon,
  max,
  min,
  icon,
  size = 25,
  color,
  step = 1,
}) => {
  const {
    setFieldValue,
    values,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext();

  return (
    <>
      <NumericInput
        value={values[name] || 0}
        onChange={(value) => setFieldValue(name, value)}
        totalWidth={size * 4}
        totalHeight={size}
        maxValue={max || 255}
        minValue={min || 0}
        // iconSize={25}
        step={step}
        valueType="real"
        rounded
        textColor="#000"
        type="up-down"
        containerStyle={{ backgroundColor: "#fff" }}
        // iconStyle={{ color: "white" }}
        rightButtonBackgroundColor={color || appColor.mainBlue}
        leftButtonBackgroundColor={color || appColor.mainBlue}
      />
      {touched[name] && errors[name] && (
        <Text style={styles.error}>{errors[name]}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: appColor.error,
  },
});

export default AppNumericInput;
