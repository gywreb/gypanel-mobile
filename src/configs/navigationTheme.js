import { DefaultTheme } from "@react-navigation/native";
import { appColor } from "./styles";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: appColor.mainBlue,
  },
};
