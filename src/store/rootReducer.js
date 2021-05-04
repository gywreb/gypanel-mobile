import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import navigationReducer from "./navigation/reducer";
import categoryReducer from "./category/reducer";
const reducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
  category: categoryReducer,
});

export default reducer;
