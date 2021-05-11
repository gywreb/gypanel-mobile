import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import * as Yup from "yup";
import AppImagePicker from "../components/AppImagePicker";
import AppFormButton from "../components/AppFormButton";
import { appColor } from "../configs/styles";
import AppMultipleSelect from "../components/AppMultipleSelect";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import apiClient from "../configs/apiClient";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { createProduct } from "../store/product/action";

const initialValues = {
  name: "",
  price: 0,
  instock: 0,
  description: "",
  featuredImg: null,
  categories: [],
};

const validationSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  price: Yup.number().min(100).required().label("Price"),
  instock: Yup.number(),
  description: Yup.string(),
  categories: Yup.array().min(1).required().label("Category(s)"),
});

const ProductCreate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.product);
  const [categoryList, setCategoryList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await apiClient.get("/category", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategoryList(data?.data?.categories);
      } catch (error) {
        const { message, code } = error?.response?.data;
        showMessage({
          message: capitalize(message) || "Error",
          description: `Error code: ${code}`,
          duration: 4000,
          type: "danger",
        });
      }
    };
    if (isFocused) fetchCategories();
  }, [isFocused]);

  const handleCreate = async (values, { resetForm }) => {
    const product = new FormData();
    for (let key in values) {
      if (key === "categories")
        values[key].map((category, index) =>
          product.append(`categories[${index}]`, category)
        );
      else product.append(key, values[key]);
    }
    dispatch(createProduct(product, navigation));
    console.log(product);
    resetForm();
  };
  return (
    <AppScreen>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreate}
      >
        {() => (
          <View style={styles.container}>
            <AppImagePicker name="featuredImg" />
            <AppTextInput
              name="name"
              placeholder="Name"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppTextInput
              name="price"
              placeholder="Price"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
            />
            <AppTextInput
              name="instock"
              placeholder="Instock"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
            />
            <AppTextInput
              name="description"
              placeholder="Description"
              autoCapitalize="none"
              autoCorrect={false}
              numberOfLines={3}
            />
            <AppMultipleSelect name="categories" items={categoryList} />
            <AppFormButton
              title="Create"
              bgColor={appColor.darkBlue}
              loading={loading}
              loadingProps={{ color: appColor.white }}
            />
          </View>
        )}
      </Formik>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCreate;
