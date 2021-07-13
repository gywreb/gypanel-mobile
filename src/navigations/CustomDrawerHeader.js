import React from "react";
import { StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { appColor } from "../configs/styles";
import { Image } from "react-native-elements/dist/image/Image";
import { Text } from "react-native-elements";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements/dist/icons/Icon";
import capitalize from "../utils/capitalize";
import { imgUri } from "../configs/apiClient";

const CustomDrawerHeader = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
  const navigation = useNavigation();
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: appColor.darkBlue,
          justifyContent: "space-between",
          width: "100%",
          paddingVertical: 8,
          paddingHorizontal: 15,
        }}
      >
        <Text h4 style={{ color: appColor.white }}>
          {capitalize(userInfo?.roleName || "role unknown")}
        </Text>
        <TouchableOpacity
          style={{ position: "relative" }}
          onPress={toggleDrawer}
        >
          <Icon
            name="arrow-left"
            type="material-community"
            color={appColor.white}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.userInfo}>
          <Text h3 style={{ color: appColor.white }}>
            {capitalize(userInfo?.fullname || "")}
          </Text>
          <Text style={{ color: appColor.white }}>{userInfo?.email}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={
              userInfo?.avatar
                ? { uri: imgUri(userInfo?.avatar) }
                : require("../assets/images/profile.jpg")
            }
            style={styles.image}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
  headerContainer: {
    position: "relative",
    alignItems: "center",
    backgroundColor: appColor.darkBlue,
    minHeight: "20%",
  },
  leftButton: {
    marginLeft: 10,
  },
  imageContainer: {
    position: "absolute",
    zIndex: 999,
    top: "50%",
    right: "50%",
    transform: [{ translateX: 60 }, { translateY: 30 }],
    backgroundColor: appColor.white,
    padding: 10,
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTxt: {
    color: "#ddd",
    fontWeight: "bold",
  },
  headerTxt: {
    color: "#ddd",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    top: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomDrawerHeader;
