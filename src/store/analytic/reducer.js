import * as analyticActions from "./action";

const initialState = {
  loading: false,
  total: null,
  error: false,
  revenueData: [],
  rankStaff: [],
  rankProduct: [],
  totalMake: 0,
};

export default function analyticReducer(state = initialState, action) {
  switch (action.type) {
    case analyticActions.ANALYTIC_REQUEST: {
      return { ...state, loading: true, revenueData: [] };
    }
    case analyticActions.GET_TOTAL: {
      return { ...state, loading: false, error: false, total: action.payload };
    }
    case analyticActions.GET_MONTHLY_REVENUE: {
      return {
        ...state,
        loading: false,
        error: false,
        revenueData: action.payload,
      };
    }
    case analyticActions.GET_RANK_STAFF: {
      return {
        ...state,
        loading: false,
        error: false,
        rankStaff: action.payload || [],
      };
    }
    case analyticActions.GET_RANK_PRODUCT: {
      return {
        ...state,
        loading: false,
        error: false,
        rankProduct: action.payload.list || [],
        totalMake: action.payload.totalMake,
      };
    }
    case analyticActions.RESET_ANALYTIC: {
      return { ...initialState };
    }
    case analyticActions.ANALYTIC_FAILURE: {
      return { ...state, loading: false, error: true, total: null };
    }
    default: {
      return state;
    }
  }
}
