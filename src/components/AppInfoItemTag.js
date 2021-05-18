import React from "react";
import { Chip } from "react-native-elements/dist/buttons/Chip";
import { appColor } from "../configs/styles";

const AppInfoItemTag = ({ title }) => {
  return (
    <Chip
      title={title || ""}
      type="outline"
      titleStyle={{
        color: appColor.mainBlue,
        fontWeight: "bold",
        fontSize: 12,
      }}
      buttonStyle={{
        borderColor: appColor.mainBlue,
        borderWidth: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        backgroundColor: appColor.white,
        borderRadius: 8,
      }}
      containerStyle={{ paddingHorizontal: 5, paddingVertical: 5 }}
    />
  );
};

export default AppInfoItemTag;
