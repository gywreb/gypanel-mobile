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
          {list.map((role) => (
            <AppRoleItem name={role.name} />
          ))}
          <AppRoleItem iconSize={50} icon="add" />
        </View>
      </AppScreen>
    </>
  );
};

export default RoleList;
