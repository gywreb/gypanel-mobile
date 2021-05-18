import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoleList from "../components/AppRoleList";
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
        <AppRoleList roleList={list} />
      </AppScreen>
    </>
  );
};

export default RoleList;
