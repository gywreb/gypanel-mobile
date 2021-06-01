import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import StaffBackground from "../components/AppStaffBackground";
import AppStaffInfo from "../components/AppStaffInfo";
import { objectToArrayConvertor } from "../utils/objectToArrayConvert";
const StaffProfile = () => {
  const { selected } = useSelector((state) => state.staff);
  const infoList = objectToArrayConvertor({
    name: `${selected.firstname} ${selected.lastname}`,
    gender: selected.gender,
    email: selected.contactEmail,
    phone: selected.phone,
    company: selected.company,
    address: selected.address,
  });
  return (
    <AppScreen
      isShowHeader={false}
      customContainer={{ paddingHorizontal: 0, marginTop: 0, height: "100%" }}
      scrollViewHeight="100%"
    >
      <StaffBackground
        avatar={selected.avatar}
        name={`${selected.lastname} ${selected.firstname}`}
        mail={selected.contactEmail}
      />
      <AppStaffInfo infoList={infoList} />
    </AppScreen>
  );
};

export default StaffProfile;
