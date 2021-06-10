import { Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import AppFormButton from "../components/AppFormButton";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import { appColor } from "../configs/styles";
import * as Yup from "yup";
import AppCard from "../components/AppCard";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { getRoleList } from "../store/role/action";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
import AppFormModalPicker from "../components/AppFormModalPicker";
import { SCREEN_HEIGHT } from "../configs/constants";
import { createUser } from "../store/user/action";

const inittialValues = {
  fullname: "",
  email: "",
  role: undefined,
  password: "",
};
8;
const validationSchema = Yup.object({
  fullname: Yup.string().required().label("Fullname"),
  email: Yup.string().required().email().label("Email"),
  role: Yup.object().required("Please choose a role").label("Role"),
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Confirm password is not match"
  ),
});

const UserCreate = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { list: roleList, loading: roleListRequest } = useSelector(
    (state) => state.role
  );
  const { loading } = useSelector((state) => state.user);

  const handleCreate = (values, { resetForm }) => {
    const {
      fullname,
      email,
      password,
      role: { value: roleId },
    } = values;
    const user = { fullname, email, password, role: roleId };
    dispatch(createUser(user, navigation));
    resetForm(inittialValues);
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getRoleList());
    }
  }, [isFocused, dispatch]);

  if (roleListRequest && !roleList) {
    return <AppSpinnerOverlay loading={roleListRequest} />;
  } else
    return (
      <>
        <AppScreen customContainer={{ minHeight: SCREEN_HEIGHT * 0.83 }}>
          <AppCard bodyStyle={{ height: 550 }}>
            <Formik
              initialValues={inittialValues}
              validationSchema={validationSchema}
              onSubmit={handleCreate}
            >
              {() => {
                return (
                  <View style={styles.container}>
                    <AppTextInput
                      hasIcon
                      icon="account-tie"
                      autoCorrect={false}
                      name="fullname"
                      placeholder="Fullname"
                    />
                    <AppTextInput
                      name="email"
                      icon="email"
                      placeholder="Email"
                      hasIcon
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                    />
                    <AppFormModalPicker
                      name="role"
                      placeholder="Select role"
                      hasIcon
                      icon="account"
                      renderData={roleList
                        ?.filter((role) => role.isActive)
                        .map((role) => ({
                          label: role.name,
                          value: role._id,
                        }))}
                    />
                    <AppTextInput
                      name="password"
                      icon="lock"
                      placeholder="Password"
                      hasIcon
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      secureTextEntry={true}
                    />
                    <AppTextInput
                      name="confirmPassword"
                      icon="lock"
                      placeholder="Confirm Password"
                      hasIcon
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      secureTextEntry={true}
                    />
                    <AppFormButton
                      title="Create User"
                      bgColor={appColor.darkBlue}
                      loading={loading}
                      loadingProps={{ color: appColor.white }}
                    />
                  </View>
                );
              }}
            </Formik>
          </AppCard>
        </AppScreen>
      </>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default UserCreate;
