import { showMessage } from "react-native-flash-message";
import apiClient from "../../configs/apiClient";
import { RoleEndpoint } from "../../configs/apiConstants";
import { ROUTE_KEY } from "../../configs/routes";
import capitalize from "../../utils/capitalize";

export const RoleTypes = {
  CREATE_ROLE: "role/CREATE_ROLE",
  CREATE_ROLE_SUCCESS: "role/CREATE_ROLE_SUCCESS",
  CREATE_ROLE_FAILED: "role/CREATE_ROLE_FAILED",
  GET_ROLE_LIST: "role/GET_ROLE_LIST",
  GET_ROLE_LIST_SUCCESS: "role/GET_ROLE_LIST_SUCCESS",
  GET_ROLE_LIST_FAILED: "role/GET_ROLE_LIST_FAILED",
  TOGGLE_ROLE: "role/TOGGLE_ROLE",
};

export const CreateRole = (payloadRole, Navigation, resetForm) => async (
  dispatch
) => {
  try {
    dispatch({
      type: RoleTypes.CREATE_ROLE,
    });
    const {
      data: {
        data: { newRole },
      },
    } = await apiClient.post(RoleEndpoint.CREATE_AND_GET, payloadRole);

    dispatch({
      type: RoleTypes.CREATE_ROLE_SUCCESS,
      payload: {
        newRole,
      },
    });
    showMessage({
      message: "Create role success",
      type: "success",
      duration: 3000,
    });
    resetForm();
    Navigation.navigate(ROUTE_KEY.RoleList);
  } catch (error) {
    console.log(error);
    // const { data } = error.response;
    showMessage({
      message: capitalize(error?.response?.data?.message || "ERROR"),
      description: `Error code: ${error?.response?.data?.code}`,
      type: "danger",
      duration: 5000,
    });

    dispatch({
      type: RoleTypes.CREATE_ROLE_FAILED,
      payload: {
        error: "Error",
      },
    });
  }
};

export const getRoleList = () => async (dispatch) => {
  try {
    dispatch({
      type: RoleTypes.GET_ROLE_LIST,
    });
    const {
      data: {
        data: { roles },
      },
    } = await apiClient.get(RoleEndpoint.CREATE_AND_GET);
    dispatch({
      type: RoleTypes.GET_ROLE_LIST_SUCCESS,
      payload: {
        list: roles,
      },
    });
  } catch (error) {
    dispatch({
      type: RoleTypes.GET_ROLE_LIST_FAILED,
      payload: {
        error,
      },
    });
  }
};

export const ToggleRole = (roleId) => async (dispatch) => {
  try {
    await apiClient.patch(RoleEndpoint.TOGGLE(roleId));
    dispatch({
      type: RoleTypes.TOGGLE_ROLE,
      payload: {
        roleId,
      },
    });
  } catch (error) {}
};
