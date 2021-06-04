import { showMessage } from "react-native-flash-message";
import apiClient from "../../configs/apiClient";
import capitalize from "../../utils/capitalize";
import { analyticTotalConvertor } from "../../utils/analyticTotalConvertor";
import asyncStorageController from "../../utils/asyncStorage";

export const ANALYTIC_REQUEST = "@ANALYTIC/ANALYTIC_REQUEST";
export const ANALYTIC_FAILURE = "@ANALYTIC/ANALYTIC_FAILURE";
export const GET_TOTAL = "@ANALYTIC/GET_TOTAL";
export const GET_MONTHLY_REVENUE = "@ANALYTIC/GET_MONTHLY_REVENUE";

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
    // const { message, code } = error?.response?.data;
    dispatch({ type: ANALYTIC_FAILURE });
    // showMessage({
    //   message: capitalize(message) || "Error",
    //   description: `Error code: ${code}`,
    //   duration: 4000,
    //   type: "danger",
    // });
  }
};

export const getTotal = () => async (dispatch, getState) => {
  dispatch({ type: ANALYTIC_REQUEST });
  try {
    const permissions = getState().navigation.permissions;
    const token = await asyncStorageController.getItem("token");
    const { data } = await apiClient.get("/analytic/total", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const total = analyticTotalConvertor(data.data);
    const totalWithPermission = permissions.includes("all")
      ? total
      : total.filter((item) => permissions.includes(item.label));

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
