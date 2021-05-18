export const objectToArrayConvertor = (object) => {
  let result = [];
  for (let key in object) {
    if (typeof object[key] === "object") {
      result.push({
        label: key,
        value: [...object[key]],
        type: "array",
      });
    } else
      result.push({
        label: key,
        value: object[key],
        type: typeof object[key],
      });
  }
  return result;
};
