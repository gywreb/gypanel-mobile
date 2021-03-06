import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";
import { appColor } from "../configs/styles";

const AppTextInput = ({
  placeholder,
  size = 24,
  type,
  icon,
  name,
  hasIcon,
  color,
  customInputContainer,
  onTypeValidate = false,
  ...componentProps
}) => {
  const {
    setFieldValue,
    values,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext();
  return (
    <Input
      onChangeText={(text) => setFieldValue(name, text)}
      onBlur={() => setFieldTouched(name)}
      value={values[name] || ""}
      inputContainerStyle={[styles.inputContainer, customInputContainer]}
      placeholder={placeholder || ""}
      leftIcon={
        hasIcon ? (
          <Icon
            type={type || "material-community"}
            name={icon}
            size={size}
            color={color || "black"}
          />
        ) : null
      }
      errorMessage={
        onTypeValidate
          ? errors[name]
            ? errors[name]
            : null
          : touched[name] && errors[name]
          ? errors[name]
          : null
      }
      errorStyle={styles.error}
      {...componentProps}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 40,
    paddingHorizontal: 10,
    borderWidth: 0,
  },
  error: {
    fontSize: 15,
    marginLeft: 14,
    marginTop: 8,
    marginBottom: 14,
    color: appColor.error,
    fontWeight: "500",
  },
});

export default AppTextInput;
