import React from "react";
import { View } from "react-native";

import AppRoleItem from "./AppRoleItem";

const AppRoleList = ({ roleList }) => {
  return (
    <View>
      {roleList.map((role, index) => (
        <AppRoleItem
          id={role._id}
          key={index}
          name={role.name}
          isActive={role.isActive}
          permissions={role.permissions}
          methods={role.methods}
        />
      ))}
    </View>
  );
};

export default AppRoleList;
