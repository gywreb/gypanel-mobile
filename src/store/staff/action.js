import { capitalize } from "lodash";
import { showMessage } from "react-native-flash-message";
import apiClient from "../../configs/apiClient";
import { StaffEndpoint } from "../../configs/apiConstants";
import { ROUTE_KEY } from "../../configs/routes";
export const StaffTypes = {
  GET_STAFF_LIST: "staff/GET_STAFF_LIST",
  GET_STAFF_LIST_SUCCESS: "staff/GET_STAFF_LIST_SUCCESS",
  GET_STAFF_LIST_FAILED: "staff/GET_STAFF_LIST_FAILED",
  CREATE_STAFF: "staff/CREATE_STAFF",
  CREATE_STAFF_SUCCESS: "staff/CREATE_STAFF_SUCCESS",
  CREATE_STAFF_FAILED: "staff/CREATE_STAFF_FAILED",
  SELECTED_STAFF: "staff/SELECTED_STAFF",
  TOGGLE_STAFF_ACTIVE: "staff/TOGGLE_STAFF_ACTIVE",
  UPDATING_STAFF: "staff/UPDATING_STAFF",
  UPDATING_STAFF_SUCCESS: "staff/UPDATING_STAFF_SUCCESS",
  UPDATING_STAFF_FAILURE: "staff/UPDATING_STAFF_FAILURE",
};

export const updateStaff = (
  id,
  updateParams,
  navigation,
  resetRadios,
  resetForm,
  setFieldValue
) => async (dispatch) => {
  dispatch({ type: StaffTypes.UPDATING_STAFF });
  try {
    const {
      data: {
        data: { updatedStaff },
      },
    } = await apiClient.patch(`staff/updateOne/${id}`, updateParams);
    console.log(updatedStaff);
    dispatch({
      type: StaffTypes.UPDATING_STAFF_SUCCESS,
      payload: {
        data: updatedStaff,
      },
    });
    resetRadios();
    resetForm();
    setFieldValue("avatar", null);
    navigation.navigate(ROUTE_KEY.StaffList);
    showMessage({
      message: "Update staff successfully",
      duration: 3000,
      type: "success",
    });
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    showMessage({
      message: capitalize(
        error?.response?.data?.message?.contactEmail ||
          error?.response?.data?.message ||
          "ERROR"
      ),
      description: `Error code: ${error?.response?.data?.code}`,
      type: "danger",
      duration: 3000,
    });
    dispatch({
      type: StaffTypes.UPDATING_STAFF_FAILURE,
      payload: {
        error: error?.response?.data?.message,
      },
    });
  }
};

export const GetStaffList = () => async (dispatch) => {
  try {
    dispatch({
      type: StaffTypes.GET_STAFF_LIST,
    });
    const {
      data: {
        data: { staffs },
      },
    } = await apiClient.get(`${StaffEndpoint.CREATE_AND_GET}`);
    console.log("data-->", staffs);
    dispatch({
      type: StaffTypes.GET_STAFF_LIST_SUCCESS,
      payload: {
        list: staffs,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: StaffTypes.GET_STAFF_LIST_FAILED,
      payload: {
        error,
      },
    });
  }
};

export const CreateStaff = (
  staffData,
  reset,
  resetForm,
  setFieldValue,
  navigation
) => async (dispatch) => {
  dispatch({
    type: StaffTypes.CREATE_STAFF,
  });
  try {
    const {
      data: {
        data: { newStaff },
      },
    } = await apiClient.post(StaffEndpoint.CREATE_AND_GET, staffData);
    dispatch({
      type: StaffTypes.CREATE_STAFF_SUCCESS,
      payload: {
        newStaff,
      },
    });
    showMessage({ message: "success", type: "success" });
    reset();
    resetForm();
    setFieldValue("avatar", null);
    navigation.navigate(ROUTE_KEY.StaffList);
  } catch (error) {
    console.log(error.response.data);
    showMessage({
      message: capitalize(
        error?.response?.data?.message?.contactEmail ||
          error?.response?.data?.message ||
          "ERROR"
      ),
      description: `Error code: ${error?.response?.data?.code}`,
      type: "danger",
      duration: 3000,
    });
    dispatch({
      type: StaffTypes.CREATE_STAFF_FAILED,
      payload: {
        error,
      },
    });
  }
};

export const SelectedStaff = (id) => ({
  type: StaffTypes.SELECTED_STAFF,
  payload: {
    staffID: id,
  },
});

export const toggleStaffActive = (id) => async (dispatch) => {
  try {
    await apiClient.patch(`/staff/${id}`, null);
    dispatch({
      type: StaffTypes.TOGGLE_STAFF_ACTIVE,
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
