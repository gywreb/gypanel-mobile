import React, { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import AppInfoItem from "../components/AppInfoItem";
import AppScreen from "../components/AppScreen";
import { getProductList } from "../store/product/action";
import _ from "lodash";
import { objectToArrayConvertor } from "../utils/objectToArrayConvert";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
import { ROUTE_KEY } from "../configs/routes";
import FAButton from "../components/FAButton";

const ProductList = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const { list, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (isFocused) dispatch(getProductList());
  }, [dispatch, isFocused]);

  const handleChangeNavigation = () => {
    navigation.navigate(ROUTE_KEY.ProductCreate);
  };

  if (loading) return <AppSpinnerOverlay loading={loading} />;
  else {
    return (
      <>
        <AppScreen>
          {list.map((product) => (
            <AppInfoItem
              key={product._id}
              imageName={product.featuredImg}
              displayFields={objectToArrayConvertor(
                _.pick(product, ["name", "price", "categories"])
              )}
              isActive={product.isActive}
            />
          ))}
        </AppScreen>
        <FAButton icon="add" onPress={handleChangeNavigation} />
      </>
    );
  }
};

export default ProductList;
