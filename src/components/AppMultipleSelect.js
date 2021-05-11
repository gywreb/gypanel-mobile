import { useFormikContext } from "formik";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { appColor } from "../configs/styles";

const AppMultipleSelect = ({ name, items }) => {
  const multiSelect = useRef();
  const { setFieldValue, values, errors } = useFormikContext();

  return (
    <View style={{ width: "93%", marginBottom: 20 }}>
      <MultiSelect
        hideTags
        items={items}
        uniqueKey="_id"
        ref={multiSelect}
        onSelectedItemsChange={(selectedItems) =>
          setFieldValue(name, selectedItems)
        }
        selectedItems={values[name]}
        selectText="Choose categories"
        searchInputPlaceholderText="Search category..."
        onChangeInput={(text) => console.log(text)}
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
        styleMainWrapper={{
          backgroundColor: appColor.white,
          overflow: "hidden",
          borderRadius: 40,
          marginBottom: 20,
        }}
        styleDropdownMenuSubsection={{
          paddingBottom: 0,
          borderRadius: 40,
          borderBottomWidth: 0,
          paddingHorizontal: 10,
          marginLeft: 16,
        }}
        styleSelectorContainer={{
          elevation: 0,
          marginBottom: 0,
          paddingBottom: 10,
        }}
        styleInputGroup={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        styleItemsContainer={{
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
        styleTextDropdown={{ color: appColor.gray }}
        selectedItemTextColor={appColor.mainBlue}
        selectedItemIconColor={appColor.mainBlue}
        tagBorderColor={appColor.darkBlue}
        tagContainerStyle={{ backgroundColor: appColor.white }}
        tagTextColor={appColor.mainBlue}
        tagRemoveIconColor={appColor.mainBlue}
        hideDropdown
        hideSubmitButton
      />
      <View>{multiSelect?.current?.getSelectedItemsExt(values[name])}</View>
      <Text style={styles.error}>{errors[name] ? errors[name] : null}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 15,
    marginLeft: 14,
    marginTop: -8,
    color: appColor.error,
    fontWeight: "500",
  },
});

export default AppMultipleSelect;
