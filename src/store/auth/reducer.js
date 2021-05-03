import * as authActions from "./action";

const initialState = {
  loading: false,
  token: null,
  error: false,
  userInfo: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
        token: null,
        userInfo: null,
      };
    }
    case authActions.LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
        userInfo: action.payload.userInfo,
        error: false,
        loading: false,
      };
    }
    case authActions.LOGIN_FAILURE: {
      return {
        ...state,
        error: true,
        token: null,
        userInfo: null,
        loading: false,
      };
    }
    case authActions.GET_CURRENT_AUTH: {
      return {
        ...state,
        error: true,
        userInfo: action.payload.userInfo,
        loading: false,
      };
    }
    case authActions.LOGOUT: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
