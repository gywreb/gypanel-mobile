import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import { GetStaffList } from "../store/staff/action";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";

import * as Animatable from "react-native-animatable";
import AppInfoItem from "../components/AppInfoItem";
import { objectToArrayConvertor } from "../utils/objectToArrayConvert";
import * as _ from "lodash";
const StaffList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.staff);
  useEffect(() => {
    dispatch(GetStaffList());
  }, []);

  if (loading) return <AppSpinnerOverlay loading={loading} />;
  else {
    return (
      <>
        <AppScreen>
          <Animatable.View animation="bounceInDown" duration={500}>
            {list?.map((staff) => (
              <AppInfoItem
                key={staff._id}
                isStaff={true}
                imageName={staff.avatar}
                displayFields={objectToArrayConvertor(
                  _.pick(staff, [
                    "firstname",
                    // "contactEmail",
                    "address",
                    "company",
                  ])
                )}
                isActive={staff.isActive}
              />
            ))}
          </Animatable.View>
        </AppScreen>
      </>
    );
  }
};

export default StaffList;
