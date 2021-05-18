import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import navigationReducer from "./navigation/reducer";
import productReducer from "./product/reducer";
import categoryReducer from "./category/reducer";
import analyticReducer from "./analytic/reducer";

const reducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
  product: productReducer,
  category: categoryReducer,
  analytic: analyticReducer,
});

export default reducer;
