import apiClient from "../../configs/apiClient";
import { BASICAUTH_USER, BASICAUTH_PASSWORD } from "@env";
import base64 from "react-native-base64";
import { showMessage } from "react-native-flash-message";
import capitalize from "../../utils/capitalize";
import { ROUTE_KEY } from "../../configs/routes";
import { SET_NAVIGATION } from "../navigation/action";
import asyncStorageController from "../../utils/asyncStorage";

export const LOGIN_REQUEST = "@AUTH/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@AUTH/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "@AUTH/LOGIN_FAILURE";
export const LOGOUT = "@AUTH/LOGIN";
export const GET_CURRENT_AUTH = "@AUTH/GET_CURRENT_AUTH";

export const getCurrent = (navigation) => async (dispatch, getState) => {
  try {
    const token = await asyncStorageController.getItem("token");
    console.log(token);
    const { data } = await apiClient.get("/user/getCurrent", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch({ type: GET_CURRENT_AUTH, payload: data.data });
    dispatch({
      type: SET_NAVIGATION,
      payload: { routes: data.data.routes, methods: data.data.methods },
    });
    navigation.navigate(ROUTE_KEY.Home);
  } catch (error) {
    // console.log(error.response.data);
    navigation.navigate(ROUTE_KEY.Login);
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const login = (payload, navigation) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await apiClient.post("/auth/login", payload, {
      headers: {
        Authorization:
          `Basic ` + base64.encode(`${BASICAUTH_USER}:${BASICAUTH_PASSWORD}`),
      },
    });
    dispatch({ type: LOGIN_SUCCESS, payload: data.data });
    asyncStorageController.setItem("token", data.data.token);
    apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.data.token}`;
    dispatch({
      type: SET_NAVIGATION,
      payload: { routes: data.data.routes, methods: data.data.methods },
    });
    navigation.navigate(ROUTE_KEY.Home);
  } catch (error) {
    const { message, code } = error?.response?.data;
    dispatch({ type: LOGIN_FAILURE });
    showMessage({
      message: capitalize(message) || "Error",
      description: `Error code: ${code}`,
      duration: 4000,
      type: "danger",
    });
  }
};

export const logout = (navigation) => async (dispatch) => {
  await asyncStorageController.removeItem("token");
  delete apiClient.defaults.headers.common["Authorization"];
  navigation.navigate(ROUTE_KEY.Login);
  dispatch({ type: LOGOUT });
};
