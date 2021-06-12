import { useFormikContext } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { SCREEN_HEIGHT } from "../configs/constants";
import { appColor } from "../configs/styles";
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
}) => {
  const {
    setFieldValue,
    values,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext();
  const [isPanelActive, setIsPanelActive] = useState(false);
  const openPanel = () => {
    setIsPanelActive(true);
  };
  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    <>
      <AppModalPicker
        scrollViewProps={{ style: { height: SCREEN_HEIGHT * 0.7 } }}
        closePanel={() => closePanel()}
        renderData={renderData || []}
        isAcive={isPanelActive}
        selectHandler={(e, value) => setFieldValue(name, value)}
        handleClose={() => setFieldTouched()}
        onlySmall
      />
      <View
        style={{
          width: "100%",
          borderRadius: 40,
          paddingHorizontal: 20,
          borderWidth: 0,
          marginTop: errors[name] ? 10 : 0,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity onPress={() => openPanel()}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
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
          <View
            style={{
              height: 1.3,
              backgroundColor: appColor.textColor,
              marginTop: 10,
              marginHorizontal: 10,
            }}
          />
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
