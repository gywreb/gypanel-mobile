import { showMessage } from "react-native-flash-message";
import apiClient from "../../configs/apiClient";
import capitalize from "../../utils/capitalize";
import { ROUTE_KEY } from "../../configs/routes";
import base64 from "react-native-base64";
import { BASICAUTH_PASSWORD, BASICAUTH_USER } from "../../configs/constants";

export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const TOGGLE_USER_ACTIVE = "TOGGLE_USER_ACTIVE";

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS });
  try {
    const {
      data: {
        data: { users },
      },
    } = await apiClient.get("/user");
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: { data: users },
    });
  } catch (error) {
    console.log(error);
    // console.log(error.response.data);
    showMessage({
      message: capitalize(error?.response?.data?.message || "ERROR"),
      description: `Error code: ${error?.response?.data?.code}`,
      type: "danger",
      duration: 3000,
    });
  }
};

export const createUser = (user, navigation) => async (dispatch) => {
  dispatch({ type: CREATE_USER });
  try {
    const {
      data: {
        data: { newUser },
      },
    } = await apiClient.post("/auth/register", user, {
      headers: {
        Authorization:
          `Basic ` + base64.encode(`${BASICAUTH_USER}:${BASICAUTH_PASSWORD}`),
      },
    });

    navigation.navigate(ROUTE_KEY.UserList);

    showMessage({
      message: "Create new user successfully",
      duration: 3000,
      type: "success",
    });

    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: {
        data: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    // console.log(error.response.data);
    console.log(error.response.data);
    showMessage({
      message: capitalize(
        error?.response?.data?.message?.password ||
          error?.response?.data?.message?.email ||
          error?.response?.data?.message ||
          "ERROR"
      ),
      description: `Error code: ${error?.response?.data?.code || 500}`,
      type: "danger",
      duration: 3000,
    });
    dispatch({
      type: CREATE_USER_FAILURE,
      payload: {
        error: error?.response?.data?.message,
      },
    });
  }
};

export const toggleUserActive = (id) => async (dispatch) => {
  try {
    await apiClient.patch(`/user/${id}`, null);
    dispatch({
      type: TOGGLE_USER_ACTIVE,
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
