import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { appColor } from "../configs/styles";

const AppCard = ({ children, title, textStyle, bodyStyle }) => {
  return (
    <>
      <View style={[style.container]}>
        {title && (
          <View style={style.title}>
            <Text style={[style.text, textStyle]}>{title}</Text>
          </View>
        )}
        <View style={[style.CardBody, bodyStyle]}>{children}</View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    position: "relative",
    borderRadius: 15,
    alignItems: "center",
  },
  title: {
    position: "absolute",
    top: "13%",

    zIndex: 999,
  },
  text: {
    fontWeight: "700",
    fontSize: 30,
    color: appColor.black,
  },
  CardBody: {
    borderRadius: 15,
    shadowColor: appColor.black,

    backgroundColor: appColor.white,
    width: "100%",
    height: 350,
    padding: 10,
    top: "20%",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 4,
    shadowRadius: 0,
    elevation: 30,
  },
});

export default AppCard;
