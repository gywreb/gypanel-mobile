import { analyticTotalIcons } from "../configs/constants";

export const analyticTotalConvertor = (object) => {
  let result = [];
  for (let key in object) {
    result.push({
      label: key,
      value: object[key],
      icon: analyticTotalIcons[key].name,
      color: analyticTotalIcons[key].color,
      leftLabel: analyticTotalIcons[key].activeLabel,
      rightLabel: analyticTotalIcons[key].inActiveLabel,
    });
  }
  return result;
};
