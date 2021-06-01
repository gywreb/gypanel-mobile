import { InvoiceTypes } from "./actions";

const initialState = {
  loading: false,
  list: null,
  error: false,
  isConfirming: false,
};

export default function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case InvoiceTypes.GET_INVOICES: {
      return { ...state, loading: true };
    }
    case InvoiceTypes.GET_INVOICES_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: action.payload.data,
      };
    }
    case InvoiceTypes.CONFIRM_INVOICE_REQUEST: {
      return { ...state, isConfirming: true };
    }
    case InvoiceTypes.CONFIRM_INVOICE: {
      const { id, confirmDate } = action.payload;
      const newList = state.list.map((invoice) => {
        if (invoice._id === id) {
          invoice.isConfirm = true;
          invoice.confirmDate = confirmDate;
          return invoice;
        } else return invoice;
      });
      return { ...state, list: newList, isConfirming: false };
    }
    case InvoiceTypes.CONFIRM_INVOICE_ERROR: {
      return { ...state, list: null, error: true, isConfirming: false };
    }
    default:
      return state;
  }
}
