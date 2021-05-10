import { CategoryTypes } from "./actions";

const initialState = {
  loading: false,
  success: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CategoryTypes.CREATE_CATEGORY:
      return { ...state, loading: true };
    case CategoryTypes.CREATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, success: action.payload.data };
    case CategoryTypes.CREATE_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default reducer;
