import { Formik } from "formik";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import * as Yup from "yup";
import AppFormButton from "../components/AppFormButton";
import { appColor } from "../configs/styles";
import { useDispatch, useSelector } from "react-redux";
import { CreateCategory } from "../store/category/actions";
import { useNavigation } from "@react-navigation/core";
import AppCard from "../components/AppCard";
const inittialValues = {
  name: "",
  description: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  description: Yup.string().required().label("Description"),
});
const CategoryCreate = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.category);
  const navigation = useNavigation();
  const handleCreate = (category) => {
    dispatch(CreateCategory(category, navigation));
  };
  return (
    <AppScreen>
      <AppCard>
        <Formik
          initialValues={inittialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {() => {
            return (
              <View style={styles.container}>
                <AppTextInput name="name" placeholder="Category name" />
                <AppTextInput
                  name="description"
                  placeholder="Category description"
                />
                <AppFormButton
                  title="Create Category"
                  bgColor={appColor.darkBlue}
                  loading={loading}
                  loadingProps={{ color: appColor.white }}
                />
              </View>
            );
          }}
        </Formik>
      </AppCard>
    </AppScreen>
  );
};

export default CategoryCreate;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
