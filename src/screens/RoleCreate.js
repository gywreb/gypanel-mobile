import React from "react";
import * as Yup from "yup";
import { View, StyleSheet } from "react-native";
import AppCard from "../components/AppCard";

import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import AppFormButton from "../components/AppFormButton";
import { METHODS, PERMISSION_ROUTE } from "../configs/routes";
import { Formik } from "formik";
import AppCheckBoxGroup from "../components/AppCheckBoxGroup";
import { appColor } from "../configs/styles";
import { useDispatch } from "react-redux";
import { CreateRole } from "../store/role/action";
import { useNavigation } from "@react-navigation/core";

const initialValues = {
  name: "",
  permissions: [],
  methods: [],
};

const ValidationSchemas = Yup.object({
  name: Yup.string().min(3).required().label("Name"),
  permissions: Yup.array().min(1).label("Permissions"),
  methods: Yup.array().min(1).label("Methods"),
});

const RoleCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const onSubmit = (values, { resetForm }) => {
    dispatch(CreateRole(values, navigate));
    resetForm(initialValues);
  };

  return (
    <>
      <AppScreen>
        <AppCard
          bodyStyle={{
            paddingVertical: 25,
            paddingHorizontal: 20,
            height: 700,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchemas}
            onSubmit={onSubmit}
          >
            {() => {
              return (
                <>
                  <AppTextInput
                    name="name"
                    placeholder="Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <AppCheckBoxGroup
                    title="Permissions"
                    list={Object.values(PERMISSION_ROUTE)}
                    name="permissions"
                  />
                  <AppCheckBoxGroup
                    title="Methods"
                    list={Object.keys(METHODS)}
                    name="methods"
                  />
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <AppFormButton
                      title="Create role"
                      bgColor={appColor.darkBlue}
                    />
                  </View>
                </>
              );
            }}
          </Formik>
        </AppCard>
      </AppScreen>
    </>
  );
};

export default RoleCreate;
