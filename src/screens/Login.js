import { Formik } from "formik";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../components/AppTextInput";
import * as Yup from "yup";
import AppFormButton from "../components/AppFormButton";
import { appColor } from "../configs/styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth/action";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FAButton from "../components/FAButton";
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const onSubmit = async (values) => {
    dispatch(login(values, navigation));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.form}>
        <Image
          source={require("../assets/images/Admin2.png")}
          style={{ width: 150, height: 150, marginBottom: 60 }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <>
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
              <AppFormButton
                title="LOGIN"
                type="raise"
                bgColor={appColor.darkBlue}
                loading={loading}
                loadingProps={{ color: appColor.white }}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: appColor.mainBlue, flex: 1 },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
