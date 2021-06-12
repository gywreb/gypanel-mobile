import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import {
  GetStaffList,
  SelectedStaff,
  toggleStaffActive,
} from "../store/staff/action";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";

import * as Animatable from "react-native-animatable";
import AppInfoItem from "../components/AppInfoItem";
import { objectToArrayConvertor } from "../utils/objectToArrayConvert";
import * as _ from "lodash";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { ROUTE_KEY } from "../configs/routes";
import { SCREEN_HEIGHT } from "../configs/constants";
import { SwipeablePanel } from "rn-swipeable-panel";
import AppModalItemDetail from "../components/AppModalItemDetail";
import { convertToDisplayDetails } from "../utils/convertToDisplayDetails";
const StaffList = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { list, loading } = useSelector((state) => state.staff);
  const navigation = useNavigation();
  useEffect(() => {
    if (isFocused) dispatch(GetStaffList());
  }, [isFocused, dispatch]);

  const switchStaffProfile = (id) => {
    navigation.navigate(ROUTE_KEY.StaffProfile);
    dispatch(SelectedStaff(id));
  };

  const handleActive = async (id) => {
    await dispatch(toggleStaffActive(id));
  };

  const openPanel = (id) => {
    const staff = list.find((staff) => staff._id === id);
    setCurrentStaff(staff);
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  if (loading) return <AppSpinnerOverlay loading={loading} />;
  else {
    return (
      <>
        <AppScreen>
          <Animatable.View animation="bounceInDown" duration={500}>
            {list?.map((staff) => (
              <AppInfoItem
                onOpenDetail={() => openPanel(staff._id)}
                id={staff._id}
                key={staff._id}
                isStaff={true}
                imageName={staff.avatar}
                displayFields={objectToArrayConvertor(
                  _.pick(staff, ["firstname", "contactEmail", "gender"])
                )}
                isActive={staff.isActive}
                handleActive={handleActive}
                // onPress={() => switchStaffProfile(staff._id)}
              />
            ))}
          </Animatable.View>
        </AppScreen>
        <SwipeablePanel
          {...panelProps}
          isActive={isPanelActive}
          closeOnTouchOutside={true}
          showCloseButton={false}
        >
          <AppModalItemDetail
            displayFields={convertToDisplayDetails(
              _.omit(currentStaff, [
                "invoices",
                "__v",
                "createdAt",
                "updatedAt",
              ])
            )}
            image={currentStaff?.avatar}
            isPerson
          />
        </SwipeablePanel>
      </>
    );
  }
};

export default StaffList;
