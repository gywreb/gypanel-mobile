import { Dimensions } from "react-native";

export const BASICAUTH_USER = "futureitmafia";
export const BASICAUTH_PASSWORD = "whothehellru";

export const PORTRAIT = "PORTRAIT";
export const LANDSCAPE = "LANDSCAPE";

export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;

export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;
// Use iPhone6 as base size which is 375 x 667
const baseWidth = 398;
const baseHeight = 736;
export const WIDTH_SCALE_RATIO = WINDOW_WIDTH / baseWidth;
export const HEIGHT_SCALE_RATIO = WINDOW_HEIGHT / baseHeight;

export const ONESIGNAL_APPID = "e62d2be5-aec8-45c5-b6dd-d2303d1dd05b";

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
