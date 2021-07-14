import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { Swipeable } from "react-native-gesture-handler";
import AppScreen from "../components/AppScreen";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { ToggleCategory, GetListCategory } from "../store/category/actions";
import { appColor } from "../configs/styles";
import { ROUTE_KEY } from "../configs/routes";

import * as Animatable from "react-native-animatable";
import AppRoleItem from "../components/AppRoleItem";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
const CategoryList = () => {
  const dispatch = useDispatch();

  // focuse screen when navigate back to screen
  const isFocused = useIsFocused();
  const { list: categories } = useSelector((state) => state.category);
  const navigation = useNavigation();
  const handleChangeNavigation = () => {
    navigation.navigate(ROUTE_KEY.CategoryCreate);
  };

  const { loading } = useSelector((state) => state.category);

  const handleToggle = async (categoryId) => {
    await dispatch(ToggleCategory(categoryId));
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(GetListCategory());
    }
  }, [dispatch, isFocused]);

  if (loading) {
    return <AppSpinnerOverlay loading={loading} />;
  } else
    return (
      <>
        <AppScreen customContainer={{ paddingHorizontal: 5 }}>
          <Animatable.View animation="bounceInDown" duration={500}>
            <View style={[style.container]}>
              {categories?.map((category, index) => (
                <AppRoleItem
                  id={category?._id}
                  key={index}
                  name={category?.name}
                  isActive={category?.isActive}
                  customContainer={{
                    width: "90%",
                    alignSelf: "center",
                    height: 85,
                  }}
                  activeStyles={{ bottom: 25, right: 6 }}
                  handleActive={handleToggle}
                />
              ))}
            </View>
          </Animatable.View>
        </AppScreen>
        {/* <FAButton icon="add" onPress={handleChangeNavigation} /> */}
      </>
    );
};

const style = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 10,
  },
  title: {
    fontSize: 25,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appColor.white,
    height: 70,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  categoryButtonContainer: {
    flexDirection: "row",
  },
  edit: {
    justifyContent: "center",
    backgroundColor: appColor.edit,
    height: 70,
    paddingHorizontal: 15,
  },
  delete: {
    justifyContent: "center",
    backgroundColor: appColor.delete,
    height: 70,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 20,
    color: appColor.white,
    fontWeight: "bold",
  },
});
export default CategoryList;
