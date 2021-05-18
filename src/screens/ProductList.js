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
import * as Animatable from "react-native-animatable";

const ProductList = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { list, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (isFocused) dispatch(getProductList());
  }, [dispatch, isFocused]);

  if (loading) return <AppSpinnerOverlay loading={loading} />;
  else {
    return (
      <>
        <AppScreen>
          <Animatable.View animation="bounceInDown" duration={500}>
            {list?.map((product) => (
              <AppInfoItem
                key={product._id}
                imageName={product.featuredImg}
                displayFields={objectToArrayConvertor(
                  _.pick(product, ["name", "price", "categories"])
                )}
                isActive={product.isActive}
              />
            ))}
          </Animatable.View>
        </AppScreen>
      </>
    );
  }
};

export default ProductList;
