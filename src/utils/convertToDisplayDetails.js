import _ from "lodash";

const tableArrayView = (array) => {
  const tableHead = Object.keys(
    _.omit({ name: array[0].name, ...array[0] }, [
      "_id",
      "id",
      "updatedAt",
      "__v",
      "createdAt",
    ])
  );
  const tableData = array.map((item) => {
    return Object.values(
      _.omit({ name: item.name, ...item }, [
        "_id",
        "id",
        "updatedAt",
        "__v",
        "createdAt",
      ])
    );
  });
  return { tableHead, tableData };
};

const tableObjectView = (object) => {
  const formatedObject = {};
  for (let key in object) {
    if (object[key] !== null) {
      if (typeof object[key] === "boolean")
        formatedObject[key] = object[key] ? "true" : "false";
      else if (typeof object[key] !== "object") {
        formatedObject[key] = object[key];
      }
    }
  }
  const tableTitle = Object.keys(
    _.omit(formatedObject, ["__v", "_id", "updatedAt", "__v", "createdAt"])
  );
  const tableData = Object.values(
    _.omit(formatedObject, ["__v", "_id", "updatedAt", "__v", "createdAt"])
  ).map((data) => [data]);
  return { tableTitle, tableData };
};

export const convertToDisplayDetails = (object) => {
  let result = [];
  const formatedObject = _.omit(object, [
    "__v",
    "_id",
    "createdAt",
    "updatedAt",
  ]);
  for (let key in formatedObject) {
    if (object[key] !== null) {
      if (
        typeof object[key] === "string" ||
        typeof object[key] === "number" ||
        typeof object[key] === "boolean"
      ) {
        result.push({
          label: key,
          value: object[key],
          type: typeof object[key],
        });
      } else {
        if (Array.from(object[key]).length) {
          result.push({
            label: key,
            value: tableArrayView([...object[key]]),
            type: "array",
          });
        } else {
          result.push({
            label: key,
            value: tableObjectView(object[key]),
            type: "object",
          });
        }
      }
    }
  }
  return result;
};
