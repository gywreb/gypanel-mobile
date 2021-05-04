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
};

export const CreateCategory = (category, Navigation) => async (dispatch) => {
  try {
    dispatch({
      type: CategoryTypes.CREATE_CATEGORY,
    });
    const token = await asyncStorageController.getItem("token");

    const { data } = await apiClient({
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
        data,
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
