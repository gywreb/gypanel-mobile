import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { appColor } from "../configs/styles";

const AppActiveRoleButton = ({
  loading,
  isActive,
  positionStyles,
  onPress,
  noAbsolute,
}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.activeButton,
          noAbsolute && styles.noAbsolute,
          positionStyles,
          isActive ? styles.active : styles.inActive,
          loading ? styles.loading : null,
        ]}
        onPress={onPress}
      >
        {loading ? (
          <ActivityIndicator size={20} color={appColor.white} />
        ) : (
          <Icon
            name={isActive ? "checkmark-outline" : "close-outline"}
            type="ionicon"
            size={20}
            color={appColor.white}
          />
        )}

        <Text style={styles.activeText}>
          {isActive ? "Activate" : "Inactive"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AppActiveRoleButton;

const styles = StyleSheet.create({
  noAbsolute: {
    position: "relative",
  },
  activeButton: {
    position: "absolute",
    right: 10,
    bottom: 45,
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",

    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  activeText: {
    fontWeight: "bold",
    color: appColor.white,
    fontSize: 15,
  },
  active: {
    backgroundColor: appColor.active,
  },
  inActive: {
    backgroundColor: appColor.inActive,
  },
  loading: {
    backgroundColor: appColor.warning,
  },
});
