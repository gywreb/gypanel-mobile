import { showMessage } from "react-native-flash-message";
import apiClient from "../../configs/apiClient";
import capitalize from "../../utils/capitalize";
import { analyticTotalConvertor } from "../../utils/analyticTotalConvertor";
import asyncStorageController from "../../utils/asyncStorage";

export const ANALYTIC_REQUEST = "@ANALYTIC/ANALYTIC_REQUEST";
export const ANALYTIC_FAILURE = "@ANALYTIC/ANALYTIC_FAILURE";
export const GET_TOTAL = "@ANALYTIC/GET_TOTAL";
export const GET_MONTHLY_REVENUE = "@ANALYTIC/GET_MONTHLY_REVENUE";
export const GET_RANK_STAFF = "@ANALYTIC/GET_RANK_STAFF";
export const GET_RANK_PRODUCT = "@ANALYTIC/GET_RANK_PRODUCT";
export const RESET_ANALYTIC = "@ANALYTIC/RESET_ANALYTIC";

export const resetAnalytic = () => (dispatch) => {
  return dispatch({ type: RESET_ANALYTIC });
};

export const getRankProduct = () => async (dispatch) => {
  dispatch({ type: ANALYTIC_REQUEST });
  try {
    const token = await asyncStorageController.getItem("token");
    const { data } = await apiClient.get(`/analytic/rankProduct`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const totalMake = data?.data?.resRankedProduct.reduce(
      (acc, product) => (acc += product.value),
      0
    );

    dispatch({
      type: GET_RANK_PRODUCT,
      payload: { list: data?.data?.resRankedProduct, totalMake },
    });
  } catch (error) {
    console.log(error);
    const { message, code } = error?.response?.data;
    dispatch({ type: ANALYTIC_FAILURE });
    showMessage({
      message: capitalize(message) || "Error",
      description: `Error code: ${code}`,
      duration: 4000,
      type: "danger",
    });
  }
};

export const getRankStaff = () => async (dispatch) => {
  dispatch({ type: ANALYTIC_REQUEST });
  try {
    const token = await asyncStorageController.getItem("token");
    const { data } = await apiClient.get(`/analytic/rankStaff`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(data);
    dispatch({ type: GET_RANK_STAFF, payload: data?.data?.rankedList });
  } catch (error) {
    console.log(error);
    const { message, code } = error?.response?.data;
    dispatch({ type: ANALYTIC_FAILURE });
    showMessage({
      message: capitalize(message) || "Error",
      description: `Error code: ${code}`,
      duration: 4000,
      type: "danger",
    });
  }
};

export const getMonthlyRevenue = (year) => async (dispatch) => {
  dispatch({ type: ANALYTIC_REQUEST });
  try {
    const token = await asyncStorageController.getItem("token");
    const { data } = await apiClient.get(`/analytic/revenue/${year}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const revenueData = Object.values(data?.data?.monthRevenue);
    dispatch({ type: GET_MONTHLY_REVENUE, payload: revenueData });
  } catch (error) {
    console.log(error);
    const { message, code } = error?.response?.data;
    dispatch({ type: ANALYTIC_FAILURE });
    showMessage({
      message: capitalize(message) || "Error",
      description: `Error code: ${code}`,
      duration: 4000,
      type: "danger",
    });
  }
};

export const getTotal = () => async (dispatch, getState) => {
  dispatch({ type: ANALYTIC_REQUEST });
  try {
    const permissions = [
      ...getState().navigation.permissions.map((permission) =>
        capitalize(permission)
      ),
    ];
    const token = await asyncStorageController.getItem("token");
    const { data } = await apiClient.get("/analytic/total", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const total = analyticTotalConvertor(data.data);
    const totalWithPermission = permissions.includes("All")
      ? total
      : total.filter((item) => permissions.includes(capitalize(item.label)));

    dispatch({ type: GET_TOTAL, payload: totalWithPermission });
  } catch (error) {
    // console.log(error);
    const { message, code } = error?.response?.data;
    dispatch({ type: ANALYTIC_FAILURE });
    showMessage({
      message: capitalize(message) || "Error",
      description: `Error code: ${code}`,
      duration: 4000,
      type: "danger",
    });
  }
};
