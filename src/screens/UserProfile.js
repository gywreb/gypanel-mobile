import { useNavigation } from "@react-navigation/core";
import React from "react";

import { useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import AppUserBackground from "../components/AppUserBackground";
import AppUserInfo from "../components/AppUserInfo";
import { ROUTE_KEY } from "../configs/routes";
import { objectToArrayConvertor } from "../utils/objectToArrayConvert";
const UserProfile = () => {
  const navigation = useNavigation();
  const { userInfo } = useSelector((state) => state.auth);
  const infoList = objectToArrayConvertor({
    name: userInfo?.fullname || "NOT UPDATE YET",
    gender: userInfo?.gender || "NOT UPDATE YET",
    email: userInfo?.email || "NOT UPDATE YET",
    phone: userInfo?.phone || "NOT UPDATE YET",
    company: userInfo?.company || "NOT UPDATE YET",
    address: userInfo?.address || "NOT UPDATE YET",
  });
  const handleGoBack = () => {
    navigation.navigate(ROUTE_KEY.Home);
  };
  return (
    <AppScreen
      isShowHeader={false}
      customContainer={{ paddingHorizontal: 0, marginTop: 0, height: "100%" }}
      scrollViewHeight="100%"
    >
      <AppUserBackground
        avatar={userInfo?.avatar}
        name={userInfo?.fullname}
        mail={userInfo?.email}
        buttonTitle={"Back to Home"}
        onPress={handleGoBack}
      />
      <AppUserInfo infoList={infoList} />
    </AppScreen>
  );
};

export default UserProfile;
