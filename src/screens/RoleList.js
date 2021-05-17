import React from "react";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppRoleItem from "../components/AppRoleItem";

import AppScreen from "../components/AppScreen";
import { getRoleList } from "../store/role/action";
const RoleList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRoleList());
  }, []);
  return (
    <>
      <AppScreen>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {list.map((role, index) => (
            <AppRoleItem
              key={index}
              name={role.name}
              isActive={role.isActive}
            />
          ))}
        </View>
      </AppScreen>
    </>
  );
};

export default RoleList;
