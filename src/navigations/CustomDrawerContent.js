import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { compulsiveDrawerItemsTop, drawerItems } from "../configs/drawer";
import { appColor } from "../configs/styles";
import asyncStorageController from "../utils/asyncStorage";
import CustomDrawerHeader from "./CustomDrawerHeader";
import RootNavigator from "../../RootNavigator";
import { ROUTE_KEY } from "../configs/routes";
import { useNavigation } from "@react-navigation/core";
import { logout } from "../store/auth/action";
import AppHeader from "../components/AppHeader";

const CustomDrawerContent = (props) => {
  const [mainDrawer, setMainDrawer] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleMainDrawer = () => {
    setMainDrawer(true);
    setFilteredItems([]);
  };

  const onItemParentPress = (key, drawerItems) => {
    const filteredMainDrawerRoutes = drawerItems.find((e) => {
      return e.key === key;
    });
    if (filteredMainDrawerRoutes.routes.length === 1) {
      const selectedRoute = filteredMainDrawerRoutes.routes[0];
      props.navigation.toggleDrawer();
      props.navigation.navigate(selectedRoute.nav, {
        screen: selectedRoute.routeName,
        title: selectedRoute.title,
      });
    } else {
      setMainDrawer(false);
      setFilteredItems(filteredMainDrawerRoutes);
    }
  };

  const logOut = async () => {
    dispatch(logout(navigation));
  };

  function renderMainDrawer() {
    const toRenderDrawerItems = [
      ...compulsiveDrawerItemsTop,
      ...props.drawerItems,
    ];
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ marginTop: "25%" }}>
          {toRenderDrawerItems.map((parent) => (
            <View key={parent.key}>
              <TouchableOpacity
                key={parent.key}
                testID={parent.key}
                onPress={() => {
                  onItemParentPress(parent.key, toRenderDrawerItems);
                }}
              >
                <View style={styles.parentItem}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name={parent.icon} type="material-community" />
                    <Text style={[styles.icon, styles.title]}>
                      {parent.title}
                    </Text>
                  </View>
                  <Icon name="chevron-right" type="material-community" />
                </View>
              </TouchableOpacity>
            </View>
          ))}
          {renderLogoutBtn()}
        </View>
      </ScrollView>
    );
  }

  function renderFilteredItemsDrawer() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ marginTop: "25%" }}>
          <TouchableOpacity
            onPress={() => toggleMainDrawer()}
            style={styles.backButtonRow}
          >
            <Icon
              name="arrow-left-thick"
              type="material-community"
              color={appColor.black}
              size={30}
            />
          </TouchableOpacity>
          {filteredItems.routes.map((route) => {
            return (
              <TouchableOpacity
                key={route.routeName}
                testID={route.routeName}
                onPress={() => {
                  props.navigation.navigate(route.nav, {
                    screen: route.routeName,
                    title: route.title,
                  });
                }}
                style={styles.item}
              >
                <Text style={styles.title}>{route.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  function renderLogoutBtn() {
    return (
      <View>
        <TouchableOpacity onPress={logOut} testID="customDrawer-logout">
          <View style={styles.parentItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="logout" type="material-community" />
              <Text style={[styles.icon, styles.title]}>{"Log out"}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerContainer}>
        <CustomDrawerHeader />
        {mainDrawer ? renderMainDrawer() : renderFilteredItemsDrawer()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
  },
  logo: {
    width: 100,
    height: 75,
  },
  drawerContainer: {
    backgroundColor: appColor.white,
    flex: 1,
  },
  container: {
    flex: 1,
    zIndex: 999,
  },
  centered: {
    alignItems: "center",
  },
  parentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 14,
  },
  title: {
    margin: 16,
    fontWeight: "bold",
    color: appColor.black,
  },
  backButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 17,
    paddingLeft: 13,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
  },
  backButtonText: {
    marginLeft: 10,
    color: "#F0F0F0",
  },
});

export default CustomDrawerContent;
