import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { appColor } from "../configs/styles";

const FAButton = ({
  title,
  icon,
  onPress,
  textStyle,
  iconSize = 30,
  iconColor = "white",
}) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      {title && <Text style={(styles.text, textStyle)}>{title}</Text>}
      {icon && <Icon name={icon} size={iconSize} color={iconColor} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.darkBlue,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    position: "absolute",
    right: "15%",
    bottom: "5%",
    transform: [{ translateX: 40 }],
    elevation: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: appColor.white,
  },
});

export default FAButton;
