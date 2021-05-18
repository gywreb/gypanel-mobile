import { DrawerActions, useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColor } from "../configs/styles";

const AppHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.header}>
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
    </SafeAreaView>
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
