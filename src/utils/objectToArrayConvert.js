import checkIcon from "./checkIcon";

export const objectToArrayConvertor = (object) => {
  let result = [];
  for (let key in object) {
    if (typeof object[key] === "object") {
      result.push({
        label: key,
        value: [...object[key]],
        type: "array",
        icon: checkIcon(key),
      });
    } else
      result.push({
        label: key,
        value: object[key],
        type: typeof object[key],
        icon: checkIcon(key),
      });
  }
  return result;
};
