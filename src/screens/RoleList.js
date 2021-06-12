import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoleList from "../components/AppRoleList";
import AppScreen from "../components/AppScreen";
import { getRoleList } from "../store/role/action";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/core";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";

const RoleList = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { list, loading } = useSelector((state) => state.role);

  useEffect(() => {
    if (isFocused) {
      dispatch(getRoleList());
    }
  }, [isFocused, dispatch]);

  if (loading) {
    return <AppSpinnerOverlay loading={loading} />;
  } else
    return (
      <>
        <AppScreen>
          <Animatable.View
            style={{ marginTop: 20 }}
            animation="bounceInDown"
            duration={500}
          >
            <AppRoleList roleList={list} />
          </Animatable.View>
        </AppScreen>
      </>
    );
};

export default RoleList;
