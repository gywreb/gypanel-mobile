import { StaffTypes } from "./action";

const initialState = {
  loading: false,
  list: [],
  error: null,
  selected: null,
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
    case StaffTypes.SELECTED_STAFF: {
      const index = state.list?.findIndex(
        (item) => item._id === action.payload.staffID
      );
      return { ...state, selected: { ...state.list[index] } };
    }
    case StaffTypes.TOGGLE_STAFF_ACTIVE: {
      const newList = state.list.map((staff) =>
        staff._id === action.payload.id
          ? { ...staff, isActive: !staff.isActive }
          : staff
      );
      return { ...state, list: [...newList] };
    }
    case StaffTypes.UPDATING_STAFF: {
      return { ...state, loading: true };
    }
    case StaffTypes.UPDATING_STAFF_SUCCESS: {
      return { ...state, loading: false };
    }
    case StaffTypes.UPDATING_STAFF_FAILURE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
}
