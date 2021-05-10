import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

const AppFormButton = ({
  title,
  type,
  textColor,
  bgColor,
  ...componentProps
}) => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      buttonStyle={styles.button}
      containerStyle={styles.container(bgColor)}
      title={title || "Title here"}
      type={type || null}
      titleStyle={styles.title(textColor)}
      onPress={handleSubmit}
      {...componentProps}
    />
  );
};

const styles = StyleSheet.create({
  container(bgColor) {
    return {
      backgroundColor: bgColor || "#000",
      paddingVertical: 5,
      width: "93%",
      borderRadius: 40,
    };
  },
  button: {
    width: "100%",
  },
  title(textColor) {
    return {
      color: textColor || "#fff",
    };
  },
});

export default AppFormButton;
