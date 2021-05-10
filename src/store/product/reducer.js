import { ProductTypes } from "./action";

const initialState = {
  loading: false,
  error: null,
  list: null,
  delete: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case ProductTypes.CREATE_PRODUCT:
      return { ...state, loading: true };
    case ProductTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload.data],
      };
    case ProductTypes.CREATE_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    case ProductTypes.GET_PRODUCTS:
      return { ...state, loading: true };
    case ProductTypes.GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, list: [...action.payload.data] };
    //   case ProductTypes.TOGGLE_CATEGORY: {
    //     const newList = state.list.filter(
    //       (cateogry) => cateogry._id !== action.payload.id
    //     );
    //     return { ...state, list: [...newList] };
    //   }
    default:
      return state;
  }
}
