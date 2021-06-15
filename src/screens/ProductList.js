import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppInfoItem from "../components/AppInfoItem";
import AppScreen from "../components/AppScreen";
import { getProductList, toggleProductActive } from "../store/product/action";
import _ from "lodash";
import { objectToArrayConvertor } from "../utils/objectToArrayConvert";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";

import * as Animatable from "react-native-animatable";
import { SCREEN_HEIGHT } from "../configs/constants";
import { SwipeablePanel } from "rn-swipeable-panel";
import AppModalItemDetail from "../components/AppModalItemDetail";
import { convertToDisplayDetails } from "../utils/convertToDisplayDetails";
import AppFloatButton from "../components/AppFloatButton";
import { ROUTE_KEY } from "../configs/routes";

const ProductList = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { list, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (isFocused) {
      dispatch(getProductList());
    }
  }, [dispatch, isFocused]);

  const handleActive = async (id) => {
    await dispatch(toggleProductActive(id));
  };

  const handleToUpdate = () => {
    const updatingProduct = list.find(
      (product) => product._id === currentProduct._id
    );
    setIsPanelActive(false);
    navigation.navigate(ROUTE_KEY.ProductCreate, {
      isUpdating: true,
      updatingProduct: _.omit(updatingProduct, [
        "__v",
        "updatedAt",
        "createdAt",
        "isActive",
        "images",
      ]),
    });
  };

  const openPanel = (id) => {
    const product = list.find((product) => product._id === id);
    setCurrentProduct(product);
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  if (loading) return <AppSpinnerOverlay loading={loading} />;
  else {
    return (
      <>
        <AppScreen>
          <Animatable.View animation="bounceInDown" duration={500}>
            {list?.map((product) => (
              <AppInfoItem
                onOpenDetail={() => openPanel(product._id)}
                id={product._id}
                key={product._id}
                imageName={product.featuredImg}
                displayFields={objectToArrayConvertor(
                  _.pick(product, ["name", "price", "categories"])
                )}
                isActive={product.isActive}
                handleActive={handleActive}
              />
            ))}
          </Animatable.View>
        </AppScreen>
        <SwipeablePanel
          {...panelProps}
          isActive={isPanelActive}
          closeOnTouchOutside={true}
          showCloseButton={false}
        >
          <AppModalItemDetail
            displayFields={convertToDisplayDetails(
              _.omit(currentProduct, ["categories", "images", "featuredImg"])
            )}
            image={currentProduct?.featuredImg}
          />
        </SwipeablePanel>
        {isPanelActive && currentProduct.isActive && (
          <AppFloatButton
            icon="edit"
            positionStyle={{ right: "18%" }}
            onPress={handleToUpdate}
          />
        )}
      </>
    );
  }
};

export default ProductList;
