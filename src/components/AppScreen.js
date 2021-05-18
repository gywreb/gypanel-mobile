import { useRoute } from "@react-navigation/core";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "./AppHeader";

const AppScreen = ({ children, customContainer }) => {
  const route = useRoute();

  return (
    <SafeAreaView style={{ position: "relative" }}>
      <AppHeader title={route?.params?.title} />
      <ScrollView
        style={{
          height: Dimensions.get("window").height * 0.9,
        }}
      >
        <View style={[styles.container, customContainer]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("screen").height,
    paddingHorizontal: 20,
    position: "relative",
    paddingBottom: 30,
    marginTop: 15,
  },
});

export default AppScreen;
