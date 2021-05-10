import React, { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import { getProductList } from "../store/product/action";

const ProductList = () => {
  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.product);
  console.log(list);

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <AppScreen>
      <Text>Product List</Text>
    </AppScreen>
  );
};

export default ProductList;
