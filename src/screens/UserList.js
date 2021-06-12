import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
import * as Animatable from "react-native-animatable";
import AppInfoItem from "../components/AppInfoItem";
import { objectToArrayConvertor } from "../utils/objectToArrayConvert";
import _ from "lodash";
import { getUsers, toggleUserActive } from "../store/user/action";
import { SCREEN_HEIGHT } from "../configs/constants";
import { SwipeablePanel } from "rn-swipeable-panel";
import AppModalItemDetail from "../components/AppModalItemDetail";
import { convertToDisplayDetails } from "../utils/convertToDisplayDetails";

const UserList = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { list, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isFocused) {
      dispatch(getUsers());
    }
  }, [isFocused]);

  const handleActive = async (id) => {
    await dispatch(toggleUserActive(id));
  };

  const openPanel = (id) => {
    const user = list.find((user) => user._id === id);
    setCurrentUser(user);
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
            {list?.map((user) => (
              <AppInfoItem
                isStaff
                onOpenDetail={() => openPanel(user._id)}
                id={user._id}
                key={user._id}
                imageName={user.avatar}
                displayFields={objectToArrayConvertor(
                  _.pick(user, ["fullname", "email"])
                )}
                isActive={user.isActive}
                handleActive={handleActive}
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
              _.omit(currentUser, ["password", "__v", "createdAt", "updatedAt"])
            )}
            image={null}
            isPerson
          />
        </SwipeablePanel>
      </>
    );
  }
};

export default UserList;
