import moment from "moment";
import { showMessage } from "react-native-flash-message";
import apiClient from "../../configs/apiClient";

export const InvoiceTypes = {
  GET_INVOICES: "GET_INVOICES",
  GET_INVOICES_SUCCESS: "GET_INVOICES_SUCCESS",
  CONFIRM_INVOICE_REQUEST: "CONFIRM_INVOICE_REQUEST",
  CONFIRM_INVOICE: "CONFIRM_INVOICE",
  CONFIRM_INVOICE_ERROR: "CONFIRM_INVOICE_ERROR",
};

let months = ["01", "02", "03", "04", "06", "07", "08", "09", "10", "11"];

export const getInvoices = () => async (dispatch) => {
  dispatch({ type: InvoiceTypes.GET_INVOICES });
  try {
    const {
      data: {
        data: { invoices },
      },
    } = await apiClient("/invoice");
    dispatch({
      type: InvoiceTypes.GET_INVOICES_SUCCESS,
      payload: { data: invoices },
    });
  } catch (error) {}
};

export const confirmInvoice = (id, callback) => async (dispatch) => {
  dispatch({ type: InvoiceTypes.CONFIRM_INVOICE_REQUEST });
  let random = Math.floor(Math.random() * months.length);
  const confirmDate = moment(
    `2021/${months[random]}/${moment().date() - 2}`
  ).valueOf();
  try {
    const { data } = await apiClient.patch(`/invoice/confirm/${id}`, {
      confirmDate,
    });
    console.log(data);
    dispatch({
      type: InvoiceTypes.CONFIRM_INVOICE,
      payload: { id, confirmDate },
    });
    showMessage({
      message: "Successfully confirm invoice",
      duration: 3000,
      type: "success",
    });
    callback();
  } catch (error) {
    showMessage({
      message: capitalize(error?.response?.data?.message || "ERROR"),
      description: `Error code: ${error?.response?.data?.code}`,
      type: "danger",
      duration: 3000,
    });
    dispatch({
      type: InvoiceTypes.CONFIRM_INVOICE_ERROR,
      payload: {
        error: error?.response?.data?.message,
      },
    });
  }
};
