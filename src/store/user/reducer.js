import {
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  GET_USERS,
  GET_USERS_SUCCESS,
  TOGGLE_USER_ACTIVE,
} from "./action";

const initialState = {
  loading: false,
  list: [],
  error: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER: {
      return { ...state, loading: true };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        list: [...state.list, action.payload.data],
      };
    }
    case CREATE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case GET_USERS: {
      return { ...state, loading: true };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        list: [...action.payload.data],
      };
    }
    case TOGGLE_USER_ACTIVE: {
      const newList = state.list.map((user) =>
        user._id === action.payload.id
          ? { ...user, isActive: !user.isActive }
          : user
      );
      return { ...state, list: [...newList] };
    }
    default:
      return state;
  }
}
