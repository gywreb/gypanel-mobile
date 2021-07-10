import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AppError from "../components/AppError";

import AppRadio from "./AppRadio";

const AppRadioGroup = ({ data, name, styles, reset }) => {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const [radioOptions, setRadioOptions] = useState([
    ...data?.map((item) => {
      return { ...item, checked: false };
    }),
  ]);

  const onPress = (value) => {
    const index = radioOptions.findIndex((item) => item.value === value);
    const newRadioOptions = radioOptions.map((item) => ({
      ...item,
      checked: false,
    }));
    newRadioOptions[index].checked = true;
    setRadioOptions(newRadioOptions);
    setFieldValue(name, value);
  };
  useEffect(() => {
    if (reset) {
      setRadioOptions([
        ...radioOptions?.map((item) => {
          return { ...item, checked: false };
        }),
      ]);
    }
    if (values[name].length) {
      const index = radioOptions.findIndex(
        (item) => item.value === values[name]
      );
      const newRadioOptions = radioOptions.map((item) => ({
        ...item,
        checked: false,
      }));
      newRadioOptions[index].checked = true;
      setRadioOptions(newRadioOptions);
    }
  }, [reset, values[name]]);
  return (
    <>
      <View
        style={[
          { width: "100%", flexDirection: "row", marginBottom: 15 },
          styles,
        ]}
      >
        {radioOptions?.map((ele, index) => (
          <AppRadio
            key={index}
            name={name}
            label={ele.label}
            value={ele.value}
            checked={ele.checked}
            onPress={() => onPress(ele.value)}
          />
        ))}
      </View>
      {touched[name] && errors[name] && (
        <AppError text={errors[name]} textStyle={{ marginLeft: 20 }} />
      )}
    </>
  );
};

export default AppRadioGroup;
