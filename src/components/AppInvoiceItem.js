import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { CountUp } from "use-count-up";
import { appColor } from "../configs/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { TouchableOpacity } from "react-native";

const AppInvoiceItem = ({
  fromStaff,
  clientInfo,
  total,
  isConfirm,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.box}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[styles.subList]}>
            <Text style={styles.subTitle}>Staff: </Text>
            <Text>{fromStaff}</Text>
          </View>
        </View>
        <View style={[styles.subList]}>
          <Text style={styles.subTitle}>Customer: </Text>
          <Text>{clientInfo}</Text>
        </View>
        <View style={[styles.subList]}>
          <Text style={styles.subTitle}>Total: </Text>
          <Text>
            <CountUp
              isCounting
              end={total}
              suffix=" VND"
              thousandsSeparator=","
            />
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.isActiveCollar,
          isConfirm ? styles.Active : styles.inActive,
        ]}
      ></View>
      <View
        style={[
          styles.activeButton,
          isConfirm ? styles.active : styles.inActive,
        ]}
      >
        <Icon
          name={isConfirm ? "checkmark-outline" : "close-outline"}
          type="ionicon"
          size={20}
          color={appColor.white}
        />

        <Text style={styles.activeText}>
          {isConfirm ? "Confirmed" : "Unconfirm"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 120,
    marginBottom: 18,
    backgroundColor: appColor.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  box: {
    height: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "space-around",
    borderRadius: 8,
  },
  isActiveCollar: {
    position: "absolute",
    height: "100%",
    width: 7,
    top: 0,
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  Active: {
    backgroundColor: appColor.active,
  },
  inActive: {
    backgroundColor: appColor.inActive,
  },
  subList: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  subItemBox: {
    backgroundColor: appColor.gray4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginHorizontal: 3,
  },
  subItemText: {
    fontWeight: "bold",
    color: "#696969",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    flexDirection: "row",
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
});

export default AppInvoiceItem;
