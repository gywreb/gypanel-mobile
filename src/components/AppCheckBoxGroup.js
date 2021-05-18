import React from "react";
import AppCheckbox from "./AppCheckbox";
import { useFormikContext } from "formik";
import { View, Text, StyleSheet } from "react-native";
import { appColor } from "../configs/styles";
const AppCheckBoxGroup = ({ name, list, title }) => {
  const { errors } = useFormikContext();
  return (
    <>
      {title && (
        <View style={{ marginLeft: 20, marginVertical: 5 }}>
          <Text style={[styles.title]}>{title}</Text>
        </View>
      )}
      <View style={[styles.checkboxContainer]}>
        {list.map((item, index) => (
          <AppCheckbox key={index} name={name} label={item} value={item} />
        ))}
      </View>
      {errors[name] && (
        <View style={[styles.errorContainer]}>
          <Text style={[styles.textError]}>{errors[name]}</Text>
        </View>
      )}
    </>
  );
};

export default AppCheckBoxGroup;
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  errorContainer: {
    width: "100%",
    alignItems: "center",
    // marginBottom: 30,
    // paddingHorizontal: 30,
  },
  textError: {
    color: appColor.danger,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
});
