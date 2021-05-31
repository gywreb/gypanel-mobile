import React, { useState } from "react";
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
import { CreateStaff } from "../store/staff/action";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
// import AppRadio from "../components/AppRadio";
const initialValues = {
  lastname: "",
  firstname: "",
  gender: "",
  phone: "",
  address: "",
  company: "",
  contactEmail: "",
  avatar: "",
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
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.staff);
  const [resetRadioGroup, setResetRadioGroup] = useState(false);
  const resetRadios = () => {
    setResetRadioGroup(true);
  };
  const handleCreate = (values, { resetForm }) => {
    dispatch(CreateStaff(values, resetRadios, navigate));
    console.log(values);
    resetForm(initialValues);
  };
  return (
    <>
      <AppScreen>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {() => (
            <View style={styles.container}>
              <AppImagePicker name="avatar" />
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
                title="Create"
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
