import { CategoryTypes } from "./actions";

const initialState = {
  loading: false,

  error: null,
  list: null,
  delete: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CategoryTypes.CREATE_CATEGORY:
      return { ...state, loading: true };
    case CategoryTypes.CREATE_CATEGORY_SUCCESS:
      const newList = state.list;

      newList.push(action.payload.data);
      return {
        ...state,
        loading: false,

        list: [...newList],
      };
    case CategoryTypes.CREATE_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    case CategoryTypes.GET_CATEGORIES:
      return { ...state, loading: true };
    case CategoryTypes.GET_CATEGORIES_SUCCESS:
      return { ...state, loading: false, list: [...action.payload.data] };
    case CategoryTypes.TOGGLE_CATEGORY: {
      //   const newList = state.list.map((role) =>
      //   role._id === action.payload.roleId
      //     ? { ...role, isActive: !role.isActive }
      //     : role
      // );

      const newList = state.list.map((cateogry) =>
        cateogry._id === action.payload.id
          ? { ...cateogry, isActive: !cateogry.isActive }
          : cateogry
      );
      return { ...state, list: [...newList] };
    }
    default:
      return { ...state };
  }
};

export default reducer;
