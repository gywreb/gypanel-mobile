import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { appColor } from "../configs/styles";

const AppStaffInfo = ({ infoList, title }) => {
  return (
    <View style={[styles.container]}>
      {title && (
        <View>
          <Text>{title}</Text>
        </View>
      )}

      {infoList?.map((info, index) => (
        <View style={[styles.infoContainer]}>
          <Icon type="material-community" name={info.icon} size={30} />
          <View key={index} style={{ marginLeft: 10 }}>
            <Text style={[styles.label]}>{info.label}: </Text>
            <Text style={[styles.text]}>{info.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default AppStaffInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.white,
    height: "100%",
    paddingVertical: 45,
    paddingHorizontal: 25,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: appColor.black,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    color: appColor.gray,
  },
});
