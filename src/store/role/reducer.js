const { RoleTypes } = require("./action");

const initialState = {
  loading: false,
  list: [],
  error: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case RoleTypes.CREATE_ROLE:
      return { ...state, loading: true };
    case RoleTypes.CREATE_ROLE_SUCCESS: {
      const newList = state.list.push(action.payload.role);
      return { ...state, loading: false, list: [...newList] };
    }
    case RoleTypes.CREATE_ROLE_FAILED: {
      return { ...state, loading: false, error: { ...action.payload.error } };
    }
    case RoleTypes.GET_ROLE_LIST: {
      return { ...state, loading: false };
    }
    case RoleTypes.GET_ROLE_LIST_SUCCESS: {
      return { ...state, loading: false, list: [...action.payload.list] };
    }
    case RoleTypes.GET_ROLE_LIST_FAILED: {
      return { ...state, loading: false, error: { ...action.payload.error } };
    }
    default:
      return state;
  }
};

export default roleReducer;
