import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";

import { appColor } from "../configs/styles";

const AppRoleItem = ({ name, isActive, methods, permissions }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.box}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {name && <Text style={styles.name}>{name.toUpperCase()}</Text>}
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: isActive ? appColor.active : appColor.inActive,
              }}
            ></View>
            <Text
              style={{
                fontWeight: "bold",
                color: isActive ? appColor.active : appColor.inActive,
                marginLeft: 3,
              }}
            >
              {isActive ? "Active" : "InActive"}
            </Text>
          </View>
        </View>
        <View>
          <Text>Permissions</Text>
        </View>
        <View>
          <Text>Methods</Text>
        </View>
      </View>
      <View
        style={[
          styles.isActiveCollar,
          isActive ? styles.Active : styles.inActive,
        ]}
      ></View>
    </TouchableOpacity>
  );
};

export default AppRoleItem;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 120,
    marginBottom: 18,
    backgroundColor: appColor.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  box: {
    height: "100%",
    paddingHorizontal: 15,
    paddingTop: 10,
    // justifyContent: "center",
    borderRadius: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
  isActiveCollar: {
    position: "absolute",
    height: "100%",
    width: 7,
    top: 0,
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  Active: {
    backgroundColor: appColor.active,
  },
  inActive: {
    backgroundColor: appColor.inActive,
  },
});
