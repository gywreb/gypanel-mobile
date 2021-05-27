import { StaffTypes } from "./action";

const initialState = {
  loading: false,
  list: [],
  error: null,
};

export default function StaffReducer(state = initialState, action) {
  switch (action.type) {
    case StaffTypes.GET_STAFF_LIST:
      return { ...state, loading: true };
    case StaffTypes.GET_STAFF_LIST_SUCCESS:
      return { ...state, loading: false, list: [...action.payload.list] };

    case StaffTypes.GET_STAFF_LIST_FAILED:
      return { ...state, loading: false, error: { ...action.payload.error } };
    case StaffTypes.CREATE_STAFF:
      return { ...state, loading: true };
    case StaffTypes.CREATE_STAFF_FAILED:
      return { ...state, loading: false };
    case StaffTypes.CREATE_STAFF_SUCCESS: {
      const newList = [...state.list];
      newList.push(action.payload.newStaff);
      return { ...state, loading: false, list: [...newList] };
    }
    default:
      return state;
  }
}
