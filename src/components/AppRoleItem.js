import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "react-native";
import { useDispatch } from "react-redux";

import { appColor } from "../configs/styles";
import { ToggleRole } from "../store/role/action";
import AppActiveRoleButton from "./AppActiveRoleButton";

const AppRoleItem = ({ name, isActive, methods, permissions, id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    setLoading(true);
    await dispatch(ToggleRole(id));
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {name && <Text style={styles.name}>{name.toUpperCase()}</Text>}
          <View>
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
                  backgroundColor: isActive
                    ? appColor.active
                    : appColor.inActive,
                }}
              ></View>
              {/* <Text
                style={{
                  fontWeight: "bold",
                  color: isActive ? appColor.active : appColor.inActive,
                  marginLeft: 3,
                }}
              >
                {isActive ? "Active" : "InActive"}
              </Text> */}
            </View>
          </View>
        </View>
        <View style={[styles.subList]}>
          <Text style={styles.subTitle}>Permissions: </Text>
          <View style={{ flexDirection: "row" }}>
            {permissions.map((permission, index) => (
              <View key={index} style={[styles.subItemBox]}>
                <Text style={[styles.subItemText]}>{permission}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.subList]}>
          <Text style={styles.subTitle}>Methods: </Text>
          <View style={{ flexDirection: "row" }}>
            {methods.map((method, index) => (
              <View key={index} style={[styles.subItemBox]}>
                <Text style={[styles.subItemText]}>{method}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View
        style={[
          styles.isActiveCollar,
          isActive ? styles.Active : styles.inActive,
        ]}
      ></View>
      <AppActiveRoleButton
        isActive={isActive}
        loading={loading}
        onPress={onPress}
      />
    </View>
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
    paddingVertical: 5,
    justifyContent: "space-around",
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
  subList: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  subItemBox: {
    backgroundColor: appColor.gray4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginHorizontal: 3,
  },
  subItemText: {
    fontWeight: "bold",
    color: "#696969",
  },
  subTitle: {
    fontWeight: "bold",
  },
});
