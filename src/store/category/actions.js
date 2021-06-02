import { showMessage } from "react-native-flash-message";
import apiClient from "../../configs/apiClient";
import { CateogryEndpoint } from "../../configs/apiConstants";
import { ROUTE_KEY } from "../../configs/routes";
import asyncStorageController from "../../utils/asyncStorage";
import capitalize from "../../utils/capitalize";
export const CategoryTypes = {
  CREATE_CATEGORY: "CREATE_CATEGORY",
  CREATE_CATEGORY_SUCCESS: "CREATE_CATEGORY_SUCCESS",
  CREATE_CATEGORY_ERROR: "CREATE_CATEGORY_ERROR",
  GET_CATEGORIES: "GET_CATEGORIES",
  GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
  TOGGLE_CATEGORY: "TOGGLE_CATEGORY",
};

export const GetListCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: CategoryTypes.GET_CATEGORIES,
    });
    const token = await asyncStorageController.getItem("token");
    const {
      data: {
        data: { categories },
      },
    } = await apiClient({
      url: CateogryEndpoint.CREATE_AND_GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: CategoryTypes.GET_CATEGORIES_SUCCESS,
      payload: {
        data: categories,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const CreateCategory = (category, Navigation) => async (dispatch) => {
  try {
    dispatch({
      type: CategoryTypes.CREATE_CATEGORY,
    });
    const token = await asyncStorageController.getItem("token");

    const {
      data: {
        data: { newCategory },
      },
    } = await apiClient({
      method: "POST",
      url: CateogryEndpoint.CREATE_AND_GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: category,
    });

    showMessage({
      message: "Success",
      type: "success",
    });

    dispatch({
      type: CategoryTypes.CREATE_CATEGORY_SUCCESS,
      payload: {
        data: newCategory,
      },
    });
    Navigation.navigate(ROUTE_KEY.CategoryList);
  } catch (error) {
    const { message } = error.response.data;

    showMessage({
      message: capitalize(message?.name) || capitalize(message) || "ERROR",
      type: "danger",
      duration: 3000,
    });
    dispatch({
      type: CategoryTypes.CREATE_CATEGORY_ERROR,
      payload: {
        error: message,
      },
    });
  }
};

export const ToggleCategory = (id) => async (dispatch) => {
  try {
    console.log(CateogryEndpoint.TOGGLE(id));
    const token = await asyncStorageController.getItem("token");
    await apiClient.patch(CateogryEndpoint.TOGGLE(id), null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: CategoryTypes.TOGGLE_CATEGORY,
      payload: {
        id,
      },
    });
  } catch (error) {
    const {
      response: { data },
    } = error;
    console.log(data);
    showMessage({
      message: data.message,
    });
  }
};
