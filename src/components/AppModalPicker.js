import React, { useState } from "react";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import { SwipeablePanel } from "rn-swipeable-panel";
import { LANDSCAPE, SCREEN_HEIGHT } from "../configs/constants";
import { appColor } from "../configs/styles";
import { useOrientation } from "../hooks/useOrientation";

const AppModalPicker = ({
  isAcive = false,
  closePanel,
  renderData,
  selectHandler,
}) => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });

  return (
    <SwipeablePanel
      {...panelProps}
      openLarge={false}
      showCloseButton={false}
      isActive={isAcive}
    >
      <ScrollView style={{ maxHeight: Dimensions.get("screen").height * 0.3 }}>
        {renderData?.map((item, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={(e) => {
              selectHandler(e, item);
              closePanel();
            }}
          >
            <ListItem.Content
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItem.Title
                style={{ fontSize: 20, color: appColor.darkBlue }}
              >
                {item.toString()}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </SwipeablePanel>
  );
};

export default AppModalPicker;
