import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FAB, Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { Swipeable } from "react-native-gesture-handler";
import AppScreen from "../components/AppScreen";
import { useNavigation } from "@react-navigation/core";
import { ToggleCategory, GetListCategory } from "../store/category/actions";
import { appColor } from "../configs/styles";
import { ROUTE_KEY } from "../configs/routes";

import FAButton from "../components/FAButton";
const CategoryList = () => {
  const dispatch = useDispatch();
  // focuse screen when navigate back to screen
  // const isFocused = useIsFocused();
  const { list: categories } = useSelector((state) => state.category);
  const navigation = useNavigation();
  const handleChangeNavigation = () => {
    navigation.navigate(ROUTE_KEY.CategoryCreate);
  };

  const handleToggle = (categoryId) => {
    dispatch(ToggleCategory(categoryId));
  };

  useEffect(() => {
    dispatch(GetListCategory());
  }, [dispatch]);

  return (
    <>
      <AppScreen customContainer={{ paddingHorizontal: 5 }}>
        <View style={[style.container]}>
          {categories?.map((category) =>
            category.isActive ? (
              <Swipeable
                key={category._id}
                containerStyle={{ borderRadius: 15 }}
                childrenContainerStyle={{ borderRadius: 15 }}
                renderRightActions={() => (
                  <>
                    <TouchableOpacity
                      style={style.edit}
                      onPress={() => console.log("Phong")}
                    >
                      <Text style={style.text}>EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={style.delete}
                      onPress={() => handleToggle(category._id)}
                    >
                      <Text style={style.text}>DELETE</Text>
                    </TouchableOpacity>
                  </>
                )}
              >
                <View key={category._id} style={style.categoryContainer}>
                  <Text style={style.title}>{category.name}</Text>
                </View>
              </Swipeable>
            ) : null
          )}

          {/* <FAB
            placement="right"
            buttonStyle={{
              backgroundColor: appColor.darkBlue,
              bottom: 0,
              zIndex: 99,
            }}
            containerStyle={{
              backgroundColor: "black",
              bottom: 120,
              right: 5,
            }}
            icon={<Icon name="add" color="white" />}
            onPress={handleChangeNavigation}
          /> */}
        </View>
      </AppScreen>
      <FAButton icon="add" onPress={handleChangeNavigation} />
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
