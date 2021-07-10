import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AppScreen from "../components/AppScreen";
import * as Yup from "yup";
import AppTextInput from "../components/AppTextInput";
import { Formik } from "formik";
import AppImagePicker from "../components/AppImagePicker";
import AppFormButton from "../components/AppFormButton";
import { StyleSheet } from "react-native";
import { appColor } from "../configs/styles";
import AppRadioGroup from "../components/AppRadioGroup";
import { useDispatch } from "react-redux";
import { CreateStaff, updateStaff } from "../store/staff/action";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { useIsFocused, useRoute } from "@react-navigation/native";
// import AppRadio from "../components/AppRadio";
const initialValues = {
  lastname: "",
  firstname: "",
  gender: "",
  phone: "",
  address: "",
  company: "",
  contactEmail: "",
  avatar: null,
};

const validationSchema = Yup.object({
  lastname: Yup.string().required().label("Last name"),
  firstname: Yup.string().required().label("First name"),
  gender: Yup.string().required().label("Gender"),
  contactEmail: Yup.string().email("Invalid Email").required().label("Email"),
});
const data = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const StaffCreate = () => {
  const navigate = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { loading } = useSelector((state) => state.staff);
  const [resetRadioGroup, setResetRadioGroup] = useState(false);
  const resetRadios = () => {
    setResetRadioGroup(true);
  };
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (isFocused) {
      if (route.params?.updatingStaff) {
        const { updatingStaff } = route.params;
        setFormValues({
          ...initialValues,
          lastname: updatingStaff.lastname,
          firstname: updatingStaff.firstname,
          gender: updatingStaff.gender,
          phone: updatingStaff.phone || "",
          address: updatingStaff.address || "",
          company: updatingStaff.company || "",
          contactEmail: updatingStaff.contactEmail,
        });
      }
    } else {
      resetRadios();
      setFormValues(initialValues);
      navigate.setParams({ updatingStaff: null });
    }
  }, [isFocused, dispatch]);

  const handleCreate = (values, { resetForm, setFieldValue }) => {
    const staff = new FormData();
    for (let key in values) {
      staff.append(key, values[key]);
    }
    dispatch(
      CreateStaff(staff, resetRadios, resetForm, setFieldValue, navigate)
    );
  };

  const handleUpdate = async (values, { resetForm, setFieldValue }) => {
    const toUpdateStaff = new FormData();
    for (let key in values) {
      switch (key) {
        case "avatar": {
          values[key] !== null ? toUpdateStaff.append(key, values[key]) : null;
          break;
        }
        default: {
          toUpdateStaff.append(key, values[key]);
          break;
        }
      }
    }
    dispatch(
      updateStaff(
        route.params?.updatingStaff?._id,
        toUpdateStaff,
        navigate,
        resetRadios,
        resetForm,
        setFieldValue
      )
    );
  };

  return (
    <>
      <AppScreen>
        <Formik
          enableReinitialize
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={route.params?.updatingStaff ? handleUpdate : handleCreate}
        >
          {() => (
            <View style={styles.container}>
              <AppImagePicker
                name="avatar"
                hasImage={
                  route.params?.updatingStaff &&
                  route.params?.updatingStaff?.avatar
                    ? route.params?.updatingStaff?.avatar
                    : null
                }
              />
              <AppTextInput
                name="firstname"
                placeholder="First name"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <AppTextInput
                name="lastname"
                placeholder="Last name"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <AppTextInput
                name="contactEmail"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <AppRadioGroup
                name="gender"
                data={data}
                reset={resetRadioGroup}
              />
              <AppTextInput
                name="phone"
                placeholder="Phone"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <AppTextInput
                name="address"
                placeholder="Address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <AppTextInput
                name="company"
                placeholder="Company"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <AppFormButton
                title={route.params?.updatingStaff ? "Update" : "Create"}
                bgColor={appColor.darkBlue}
                loadingProps={{ color: appColor.white }}
                loading={loading}
              />
            </View>
          )}
        </Formik>
      </AppScreen>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StaffCreate;
