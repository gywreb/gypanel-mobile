import { useFormikContext } from "formik";
import React, { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { ref } from "yup";
import { HEIGHT_SCALE_RATIO, SCREEN_HEIGHT } from "../configs/constants";
import { appColor } from "../configs/styles";
import AppBottomSheet from "./AppBottomSheet";
import AppModalPicker from "./AppModalPicker";

const AppFormModalPicker = ({
  renderData,
  name,
  placeholder,
  hasIcon,
  size = 24,
  type,
  icon,
  color,
  setFormModalActive,
  setFormModalClose,
}) => {
  const {
    setFieldValue,
    values,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext();
  const [isPanelActive, setIsPanelActive] = useState(false);

  // ref
  const bottomSheetModalRef = useRef(null);

  const openPanel = () => {
    setIsPanelActive(true);
  };
  const closePanel = () => {
    setIsPanelActive(false);
  };

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      {/* <AppBottomSheet innerRef={bottomSheetModalRef} /> */}
      <AppModalPicker
        scrollViewProps={{
          style: { height: SCREEN_HEIGHT * 0.7 * HEIGHT_SCALE_RATIO },
        }}
        closePanel={() => {
          closePanel();
          setFormModalClose();
        }}
        renderData={renderData || []}
        isAcive={isPanelActive}
        selectHandler={(e, value) => {
          setFieldValue(name, value);
          setFormModalActive();
        }}
        handleClose={() => setFieldTouched()}
        onlySmall
      />
      <View
        style={{
          width: "100%",
          borderRadius: 40,
          paddingHorizontal: 10,
          borderWidth: 0,
          marginTop: errors[name] ? 10 : 0,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            openPanel();
            setFormModalActive();
            handlePresentModalPress();
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: appColor.white,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {hasIcon && (
                <Icon
                  name={icon}
                  size={size}
                  color={color}
                  type={type || "material-community"}
                  style={{ paddingRight: 5 }}
                />
              )}
              <Text style={[styles.placeholder, values[name] && styles.title]}>
                {values[name]?.label || placeholder}
              </Text>
            </View>
            <Icon
              name="chevron-down"
              type="material-community"
              size={size}
              color={color || appColor.black}
            />
          </View>
          {/* <View
            style={{
              height: 1.3,
              backgroundColor: appColor.textColor,
              marginTop: 10,
              marginHorizontal: 20,
            }}
          /> */}
        </TouchableOpacity>
        {errors[name] && touched[name] && (
          <Text style={styles.error}>{errors[name]}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: { color: appColor.black },
  placeholder: {
    color: appColor.textColor,
    fontSize: 18,
  },
  error: {
    fontSize: 16,
    paddingLeft: 5,
    marginTop: 10,
    color: appColor.error,
  },
});

export default AppFormModalPicker;
