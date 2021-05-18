import { drawerItems } from "../../configs/drawer";
import * as navigationActions from "./action";

const initialState = {
  roleDrawerItems: [],
  permissions: [],
};

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case navigationActions.SET_NAVIGATION: {
      let thisRoledrawerItems = [];
      const { payload } = action;
      drawerItems.map((item) => {
        if (
          payload.routes.includes(item.key) ||
          payload.routes.includes("all")
        ) {
          let methodFeature = [];
          item.routes.map((menu) => {
            if (
              payload.methods.includes(menu.method) ||
              payload.methods.includes("ALL")
            )
              methodFeature.push(menu);
          });
          thisRoledrawerItems.push({
            key: item.key,
            ...item,
            routes: [...methodFeature],
          });
        }
      });
      return {
        ...state,
        roleDrawerItems: [...thisRoledrawerItems],
        permissions: [...payload.routes],
      };
    }
    default:
      return state;
  }
}
