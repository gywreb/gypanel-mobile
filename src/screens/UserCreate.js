import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
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
import { HEIGHT_SCALE_RATIO, SCREEN_HEIGHT } from "../configs/constants";
import { createUser, updateUser } from "../store/user/action";
import { useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import AppRadioGroup from "../components/AppRadioGroup";
import AppImagePicker from "../components/AppImagePicker";
import _ from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const initialValues = {
  fullname: "",
  email: "",
  role: undefined,
  password: "",
  gender: "",
  avatar: null,
  phone: "",
};

const data = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const updateValidationSchema = Yup.object({
  fullname: Yup.string().required().label("Fullname"),
  email: Yup.string().required().email().label("Email"),
  role: Yup.object().required("Please choose a role").label("Role"),
  gender: Yup.string().required().label("Gender"),
  phone: Yup.number().typeError("Phone must specify a number").label("Phone"),
});

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
  const route = useRoute();
  const [resetRadioGroup, setResetRadioGroup] = useState(false);
  const resetRadios = () => {
    setResetRadioGroup(true);
  };
  const [isFormModalActive, setFormModalActive] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
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
    resetForm(initialValues);
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getRoleList());
      if (route.params?.updatingUser) {
        const { updatingUser } = route.params;
        setFormValues({
          ...initialValues,
          fullname: updatingUser.fullname,
          email: updatingUser.email,
          gender: updatingUser.gender || "",
          phone: updatingUser.phone || "",
          role: updatingUser.role || "",
        });
      }
    } else {
      resetRadios();
      setFormValues(initialValues);
      navigation.setParams({ updatingUser: null });
    }
  }, [isFocused, dispatch]);

  const handleUpdate = async (values, { resetForm, setFieldValue }) => {
    const toUpdateUser = new FormData();
    values = _.omit(values, ["password", "confirmPassword"]);
    for (let key in values) {
      switch (key) {
        case "avatar": {
          values[key] !== null ? toUpdateUser.append(key, values[key]) : null;
          break;
        }
        case "role": {
          toUpdateUser.append(key, values[key].value);
          break;
        }
        default: {
          toUpdateUser.append(key, values[key]);
          break;
        }
      }
    }
    dispatch(
      updateUser(
        route.params?.updatingUser?._id,
        toUpdateUser,
        navigation,
        resetRadios,
        resetForm,
        setFieldValue
      )
    );
  };

  if (roleListRequest && !roleList) {
    return <AppSpinnerOverlay loading={roleListRequest} />;
  } else
    return (
      <>
        <KeyboardAwareScrollView>
          <AppScreen customContainer={{ minHeight: SCREEN_HEIGHT * 0.83 }}>
            <View
              style={
                !route.params?.updateUser
                  ? { height: 620 * HEIGHT_SCALE_RATIO }
                  : isFormModalActive
                  ? { height: 600 * HEIGHT_SCALE_RATIO }
                  : null
              }
            >
              <Formik
                enableReinitialize
                initialValues={formValues}
                validationSchema={
                  route.params?.updatingUser
                    ? updateValidationSchema
                    : validationSchema
                }
                onSubmit={
                  route.params?.updatingUser ? handleUpdate : handleCreate
                }
              >
                {() => {
                  return (
                    <View style={styles.container}>
                      {route.params?.updatingUser && (
                        <AppImagePicker
                          name="avatar"
                          hasImage={
                            route.params?.updatingUser &&
                            route.params?.updatingUser?.avatar
                              ? route.params?.updatingUser?.avatar
                              : null
                          }
                        />
                      )}
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
                      {route.params?.updatingUser && (
                        <Text style={styles.warning}>
                          *If show "Select role" you might need to choose new
                          role for this user
                        </Text>
                      )}
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
                        setFormModalActive={() => setFormModalActive(true)}
                        setFormModalClose={() => setFormModalActive(false)}
                      />
                      {route.params?.updatingUser ? (
                        <>
                          <AppRadioGroup
                            name="gender"
                            data={data}
                            reset={resetRadioGroup}
                          />
                          <AppTextInput
                            name="phone"
                            hasIcon
                            icon="phone"
                            placeholder="Phone"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            onTypeValidate
                          />
                        </>
                      ) : null}
                      {!route.params?.updatingUser ? (
                        <>
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
                        </>
                      ) : null}
                      <AppFormButton
                        title={route.params?.updatingUser ? "Update" : "Create"}
                        bgColor={appColor.darkBlue}
                        loading={loading}
                        loadingProps={{ color: appColor.white }}
                      />
                    </View>
                  );
                }}
              </Formik>
            </View>
          </AppScreen>
        </KeyboardAwareScrollView>
      </>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  warning: {
    marginTop: -15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    color: appColor.warning,
    fontWeight: "bold",
  },
});

export default UserCreate;
