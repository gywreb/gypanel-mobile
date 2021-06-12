import { useRoute } from "@react-navigation/core";
import React, { useRef } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "./AppHeader";

const AppScreen = ({
  children,
  customContainer,
  isShowHeader = true,
  scrollViewHeight = Dimensions.get("window").height * 0.9,
  needRefresh,
  refreshing,
  onRefresh,
  handleScroll,
  isLastestUpdate,
}) => {
  const route = useRoute();
  const scrollViewRef = useRef();

  const isLastestProps = isLastestUpdate
    ? {
        onContentSizeChange: (contentWidth, contentHeight) => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        },
        onLayout: (contentWidth, contentHeight) => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        },
      }
    : null;

  return (
    <SafeAreaView style={{ position: "relative" }}>
      {isShowHeader && <AppHeader title={route?.params?.title} />}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        // scrollEventThrottle={16}
        refreshControl={
          needRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : null
        }
        style={{
          height: scrollViewHeight,
        }}
        {...isLastestProps}
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
