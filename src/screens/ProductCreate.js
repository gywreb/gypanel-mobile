import { Formik, useFormikContext } from "formik";
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
import { createProduct, updateProduct } from "../store/product/action";
import { GetListCategory } from "../store/category/actions";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
import { useRoute } from "@react-navigation/native";
import { valuesIn } from "lodash";

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
  price: Yup.number()
    .typeError("Price must specify a number")
    .min(100)
    .required()
    .label("Price"),
  instock: Yup.number()
    .typeError("Instock must specify a number")
    .label("Instock"),
  description: Yup.string().label("Description"),
  categories: Yup.array().min(1).required().label("Category(s)"),
});

const ProductCreate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { loading: productIsRequest } = useSelector((state) => state.product);
  const { list: categoryList, loading: categoryIsRequest } = useSelector(
    (state) => state.category
  );
  const isFocused = useIsFocused();
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (isFocused) {
      if (route.params?.updatingProduct) {
        const { updatingProduct } = route.params;
        console.log(updatingProduct);
        setFormValues({
          ...initialValues,
          name: updatingProduct?.name,
          price: updatingProduct?.price.toString() || 0,
          instock: updatingProduct?.instock || 0,
          description: updatingProduct?.description || "",
          categories: updatingProduct?.categories
            .filter((category) => category.isActive)
            .map((category) => category._id),
        });
      }

      dispatch(GetListCategory());
    } else {
      setFormValues(initialValues);
      navigation.setParams({ updatingProduct: null });
    }
  }, [isFocused, dispatch]);

  const handleCreate = async (values, { resetForm, setFieldValue }) => {
    const product = new FormData();
    for (let key in values) {
      if (key === "categories")
        values[key].map((category, index) =>
          product.append(`categories[${index}]`, category)
        );
      else product.append(key, values[key]);
    }
    dispatch(createProduct(product, navigation));
    resetForm(initialValues);
    setFieldValue("featuredImg", null);
  };

  const handleUpdate = async (values, { resetForm, setFieldValue }) => {
    const toUpdateProduct = new FormData();
    for (let key in values) {
      switch (key) {
        case "categories": {
          values[key].map((category, index) => {
            toUpdateProduct.append(`categories[${index}]`, category);
          });
          break;
        }
        case "featuredImg": {
          values[key] !== null
            ? toUpdateProduct.append(key, values[key])
            : null;
          break;
        }
        default: {
          toUpdateProduct.append(key, values[key]);
          break;
        }
      }
    }
    dispatch(
      updateProduct(
        route.params?.updatingProduct?._id,
        toUpdateProduct,
        navigation
      )
    );
    resetForm();
    setFieldValue("featuredImg", null);
  };

  if (categoryIsRequest)
    return <AppSpinnerOverlay loading={categoryIsRequest} />;
  else
    return (
      <AppScreen>
        <Formik
          enableReinitialize
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={route.params?.updatingProduct ? handleUpdate : handleCreate}
        >
          {() => (
            <View style={styles.container}>
              <AppImagePicker
                name="featuredImg"
                hasImage={
                  route.params?.updatingProduct &&
                  route.params?.updatingProduct?.featuredImg
                    ? route.params?.updatingProduct?.featuredImg
                    : null
                }
              />
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
                onTypeValidate
              />
              <AppTextInput
                name="instock"
                placeholder="Instock"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                onTypeValidate
              />
              <AppTextInput
                name="description"
                placeholder="Description"
                autoCapitalize="none"
                autoCorrect={false}
                numberOfLines={3}
              />
              {route.params?.updatingProduct && (
                <Text style={styles.warning}>
                  *Inactive category(s) will be omitted after update
                </Text>
              )}
              <AppMultipleSelect
                name="categories"
                items={
                  categoryList
                    ? categoryList.filter((category) => category.isActive)
                    : []
                }
              />

              <AppFormButton
                title={route.params?.updatingProduct ? "Update" : "Create"}
                bgColor={appColor.darkBlue}
                loading={productIsRequest}
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
  warning: {
    marginTop: -15,
    paddingBottom: 15,
    color: appColor.warning,
    fontWeight: "bold",
  },
});

export default ProductCreate;
