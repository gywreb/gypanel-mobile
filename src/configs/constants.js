import { Dimensions } from "react-native";

export const BASICAUTH_USER = "futureitmafia";
export const BASICAUTH_PASSWORD = "whothehellru";

export const PORTRAIT = "PORTRAIT";
export const LANDSCAPE = "LANDSCAPE";

export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;

export const analyticTotalIcons = {
  product: {
    name: "shopping",
    color: "#FFC107",
    activeLabel: "Active",
    inActiveLabel: "Inactive",
  },
  invoice: {
    name: "receipt",
    color: "#673AB7",
    activeLabel: "Confirmed",
    inActiveLabel: "Unconfirm",
  },
  staff: {
    name: "account-supervisor",
    color: "#607D8B",
    activeLabel: "Active",
    inActiveLabel: "Inactive",
  },
  user: {
    name: "account-tie",
    color: "#3F51B5",
    activeLabel: "Active",
    inActiveLabel: "Inactive",
  },
};
