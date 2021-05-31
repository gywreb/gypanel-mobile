import React from "react";
import { View } from "react-native";
import { ToggleRole } from "../store/role/action";
import AppRoleItem from "./AppRoleItem";
import { useDispatch } from "react-redux";
const AppRoleList = ({ roleList }) => {
  const dispatch = useDispatch();
  const onPress = async (id) => {
    await dispatch(ToggleRole(id));
  };
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
          handleActive={onPress}
          dotStyles={{ top: 5, right: 3 }}
        />
      ))}
    </View>
  );
};

export default AppRoleList;
