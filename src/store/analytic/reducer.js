import * as analyticActions from "./action";

const initialState = {
  loading: false,
  total: null,
  error: false,
};

export default function analyticReducer(state = initialState, action) {
  switch (action.type) {
    case analyticActions.ANALYTIC_REQUEST: {
      return { ...state, loading: true };
    }
    case analyticActions.GET_TOTAL: {
      return { ...state, loading: false, error: false, total: action.payload };
    }
    case analyticActions.ANALYTIC_FAILURE: {
      return { ...state, loading: false, error: true, total: null };
    }
    default: {
      return state;
    }
  }
}
