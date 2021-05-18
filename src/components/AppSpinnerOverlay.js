import React from "react";
import { StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { appColor } from "../configs/styles";

const AppSpinnerOverlay = ({ loading }) => {
  return (
    <Spinner
      visible={loading}
      textContent={"Loading..."}
      textStyle={styles.spinnerTextStyle}
      size="large"
    />
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: appColor.white,
  },
});

export default AppSpinnerOverlay;
