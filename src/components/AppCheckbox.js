import React, { useState } from "react";

import { useFormikContext } from "formik";
import { Text, StyleSheet, View } from "react-native";
import { CheckBox } from "react-native-elements";
const AppCheckbox = ({ name, label, labelStyles, value }) => {
  const { values, setFieldValue } = useFormikContext();
  const [checked, setChecked] = useState(false);
  //   console.log(errors[name]);
  const onPress = () => {
    setChecked(!checked);
    if (!checked) {
      const newPermissions = values[name];
      newPermissions.push(value);
      setFieldValue(name, newPermissions);
    } else {
      const newPermissions = values[name].filter((item) => item !== value);
      setFieldValue(name, newPermissions);
    }
  };
  return (
    <View style={styles.container}>
      <CheckBox checked={checked} onPress={onPress} />
      <Text style={[styles.label, labelStyles]}>{label}</Text>
    </View>
  );
};

export default AppCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
