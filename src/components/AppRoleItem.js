import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { appColor } from "../configs/styles";

const AppRoleItem = ({ name, icon, iconSize, iconColor }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.box}>
        {name && <Text style={styles.name}>{name.toUpperCase()}</Text>}
        {icon && <Icon name={icon} size={iconSize} color={iconColor} />}
      </View>
    </TouchableOpacity>
  );
};

export default AppRoleItem;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    // padding: 5,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    width: 175,
    height: 175,
    backgroundColor: appColor.white,
    borderRadius: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
});
