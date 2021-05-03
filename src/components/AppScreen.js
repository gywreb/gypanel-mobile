import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "./AppHeader";

const AppScreen = ({ children }) => {
  return (
    <SafeAreaView>
      <AppHeader />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default AppScreen;
