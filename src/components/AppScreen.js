import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "./AppHeader";

const AppScreen = ({ children, customContainer }) => {
  return (
    <SafeAreaView style={{ position: "relative" }}>
      <AppHeader />
      <View style={[styles.container, customContainer]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    position: "relative",
  },
});

export default AppScreen;
