import { showMessage } from "react-native-flash-message";
import { string } from "yup/lib/locale";
import apiClient from "../../configs/apiClient";
import { ROUTE_KEY } from "../../configs/routes";
import capitalize from "../../utils/capitalize";

export const ProductTypes = {
  CREATE_PRODUCT: "CREATE_PRODUCT",
  CREATE_PRODUCT_SUCCESS: "CREATE_PRODUCT_SUCCESS",
  CREATE_PRODUCT_ERROR: "CREATE_PRODUCT_ERROR",
  GET_PRODUCTS: "GET_PRODUCTS",
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
  TOGGLE_PRODUCT_ACTIVESTATE: "TOGGLE_PRODUCT_ACTIVESTATE",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",
  UPDATE_PRODUCT_FAILURE: "UPDATE_PRODUCT_FAILURE",
};

export const updateProduct = (id, updateParams, navigation) => async (
  dispatch
) => {
  dispatch({ type: ProductTypes.UPDATE_PRODUCT });
  try {
    console.log(updateParams);
    const {
      data: {
        data: { updatedProduct },
      },
    } = await apiClient.patch(`/product/updateOne/${id}`, updateParams);
    console.log(updatedProduct);
    navigation.navigate(ROUTE_KEY.ProductList);

    showMessage({
      message: "Update product successfully",
      duration: 3000,
      type: "success",
    });

    dispatch({
      type: ProductTypes.UPDATE_PRODUCT_SUCCESS,
      payload: {
        data: updatedProduct,
      },
    });
  } catch (error) {
    console.log(error);

    showMessage({
      message: capitalize(
        error?.response?.data?.message?.featuredImg ||
          error?.response?.data?.message ||
          "ERROR"
      ),
      description: `Error code: ${error?.response?.data?.code}`,
      type: "danger",
      duration: 3000,
    });
    dispatch({
      type: ProductTypes.UPDATE_PRODUCT_FAILURE,
      payload: {
        error: error?.response?.data?.message,
      },
    });
  }
};

export const toggleProductActive = (id) => async (dispatch) => {
  try {
    await apiClient.patch(`/product/${id}`, null);
    dispatch({
      type: ProductTypes.TOGGLE_PRODUCT_ACTIVESTATE,
      payload: {
        id,
      },
    });
  } catch (error) {
    showMessage({
      message: capitalize(error?.response?.data?.message || "ERROR"),
      type: "danger",
      duration: 4000,
    });
  }
};

export const getProductList = () => async (dispatch) => {
  try {
    dispatch({
      type: ProductTypes.GET_PRODUCTS,
    });
    const {
      data: {
        data: { products },
      },
    } = await apiClient("/product");
    dispatch({
      type: ProductTypes.GET_PRODUCTS_SUCCESS,
      payload: {
        data: products,
      },
    });
  } catch (error) {}
};

export const createProduct = (product, navigation) => async (dispatch) => {
  try {
    console.log(product);
    dispatch({
      type: ProductTypes.CREATE_PRODUCT,
    });

    const {
      data: {
        data: { newProduct },
      },
    } = await apiClient.post("/product", product);

    navigation.navigate(ROUTE_KEY.ProductList);

    showMessage({
      message: "Create new product successfully",
      duration: 3000,
      type: "success",
    });

    dispatch({
      type: ProductTypes.CREATE_PRODUCT_SUCCESS,
      payload: {
        data: newProduct,
      },
    });
  } catch (error) {
    console.log(error);

    // console.log(error.response.data);
    showMessage({
      message: capitalize(
        error?.response?.data?.message?.featuredImg ||
          error?.response?.data?.message ||
          "ERROR"
      ),
      description: `Error code: ${error?.response?.data?.code}`,
      type: "danger",
      duration: 3000,
    });
    dispatch({
      type: ProductTypes.CREATE_PRODUCT_ERROR,
      payload: {
        error: error?.response?.data?.message,
      },
    });
  }
};
