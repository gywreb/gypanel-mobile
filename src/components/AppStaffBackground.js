import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { imgUri } from "../configs/apiClient";
import { appColor } from "../configs/styles";
import AppBackButton from "../components/AppBackButton";
import { useNavigation } from "@react-navigation/core";
import { ROUTE_KEY } from "../configs/routes";
const StaffBackground = ({ avatar, name, mail }) => {
  const navigation = useNavigation();
  const hanldeGoToStaffList = () => {
    navigation.navigate(ROUTE_KEY.StaffList);
  };
  return (
    <LinearGradient
      start={{ x: -0.1, y: 0.3 }}
      end={{ x: 1, y: 2 }}
      style={styles.backgroundContainer}
      colors={[
        appColor.midBlue,
        appColor.lightBlue,
        appColor.midBlue,
        appColor.darkBlue,
      ]}
    >
      <>
        <View style={[styles.cardAvatar]}>
          <View style={[styles.avatarContainer]}>
            <Image
              style={[styles.avatarSize]}
              source={
                avatar
                  ? { uri: imgUri(avatar) }
                  : require("../assets/images/profile.jpg")
              }
            />
          </View>
          <View style={[styles.infoContainer]}>
            {name && <Text style={[styles.nameText]}>{name}</Text>}
            {mail && <Text style={[styles.mailText]}>{mail}</Text>}
          </View>
        </View>
        <AppBackButton
          title="Back to Staff list"
          positionStyles={{ bottom: -25, zIndex: 999 }}
          onPress={hanldeGoToStaffList}
        />
      </>
    </LinearGradient>
  );
};

export default StaffBackground;

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "relative",
    width: "100%",
    alignSelf: "center",
    height: "40%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  cardAvatar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    overflow: "hidden",
    borderRadius: 1000,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSize: {
    width: 150,
    height: 150,
  },
  nameText: {
    color: appColor.white,
    fontWeight: "bold",
    fontSize: 30,
  },
  mailText: {
    color: appColor.white,
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
