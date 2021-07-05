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
    case ProductTypes.TOGGLE_PRODUCT_ACTIVESTATE: {
      const newList = state.list.map((product) =>
        product._id === action.payload.id
          ? { ...product, isActive: !product.isActive }
          : product
      );
      return { ...state, list: [...newList] };
    }
    case ProductTypes.UPDATE_PRODUCT: {
      return { ...state, loading: true };
    }
    case ProductTypes.UPDATE_PRODUCT_SUCCESS: {
      return { ...state, loading: false };
    }
    case ProductTypes.UPDATE_PRODUCT_FAILURE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
}
