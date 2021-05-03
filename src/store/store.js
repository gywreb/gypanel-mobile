import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import reducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  debug: true,
  timeout: null,
};

const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
