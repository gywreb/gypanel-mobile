import React from "react";
import { View, ActivityIndicator } from "react-native";
import { appColor } from "../configs/styles";
const Loading = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 500,
      }}
    >
      <ActivityIndicator size="large" color={appColor.darkBlue} />
    </View>
  );
};

export default Loading;
