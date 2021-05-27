import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import { GetStaffList } from "../store/staff/action";
const StaffList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.staff);
  useEffect(() => {
    dispatch(GetStaffList());
  }, []);

  return (
    <>
      <AppScreen>
        <View>
          {list?.map((item, index) => (
            <Text key={index}>{item.firstname}</Text>
          ))}
        </View>
      </AppScreen>
    </>
  );
};

export default StaffList;
