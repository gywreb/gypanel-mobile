import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoleList from "../components/AppRoleList";
import AppScreen from "../components/AppScreen";
import { getRoleList } from "../store/role/action";
import * as Animatable from "react-native-animatable";

const RoleList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRoleList());
  }, []);
  return (
    <>
      <AppScreen>
        <Animatable.View animation="bounceInDown" duration={500}>
          <AppRoleList roleList={list} />
        </Animatable.View>
      </AppScreen>
    </>
  );
};

export default RoleList;
