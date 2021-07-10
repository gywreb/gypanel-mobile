import { DrawerActions, useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { appColor } from "../configs/styles";

const AppHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Icon
        type="material-community"
        name="menu"
        size={32}
        color="#fff"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.screenTitle}>{title || "Home"}</Text>
      </View>
      <View style={{ width: 32 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: appColor.gray8,
    elevation: 5,
    backgroundColor: appColor.mainBlue,
  },
  screenTitle: {
    textAlign: "center",
    color: appColor.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AppHeader;
