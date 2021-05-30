import apiClient from "../../configs/apiClient";

export const InvoiceTypes = {
  GET_INVOICES: "GET_INVOICES",
  GET_INVOICES_SUCCESS: "GET_INVOICES_SUCCESS",
  CONFIRM_INVOICE_REQUEST: "CONFIRM_INVOICE_REQUEST",
  CONFIRM_INVOICE: "CONFIRM_INVOICE",
  CONFIRM_INVOICE_ERROR: "CONFIRM_INVOICE_ERROR",
};

export const getInvoices = () => async (dispatch) => {
  // dispatch({ type: InvoiceTypes.GET_INVOICES });
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
  } catch (error) {
    console.log(error);
  }
};

export const confirmInvoice = (id, confirmDate) => async (dispatch) => {
  dispatch({ type: InvoiceTypes.CONFIRM_INVOICE_REQUEST });
  try {
    const { data } = await apiClient.patch(`/invoice/confirm/${id}`);
    console.log(data);
    dispatch({
      type: InvoiceTypes.CONFIRM_INVOICE,
      payload: { id, confirmDate },
    });
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
