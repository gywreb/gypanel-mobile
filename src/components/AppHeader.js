import { DrawerActions, useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const AppHeader = () => {
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 40,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});

export default AppHeader;
