import React from "react";

import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { appColor } from "../configs/styles";

const AppBackButton = ({ title, onPress, positionStyles }) => {
  return (
    <TouchableWithoutFeedback
      style={{ width: 500, height: 500, backgroundColor: "black" }}
      onPress={onPress}
    >
      <LinearGradient
        style={[styles.container, positionStyles]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[appColor.darkBlue, appColor.midBlue, appColor.darkBlue]}
      >
        <>
          <Icon
            type="material-community"
            name="chevron-left"
            color={appColor.white}
            size={25}
          />
          {title && <Text style={[styles.title]}>{title}</Text>}
        </>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default AppBackButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 1000,
    alignSelf: "center",
  },
  title: {
    color: appColor.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
