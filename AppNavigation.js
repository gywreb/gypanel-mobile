import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import DrawerNavigator from "./src/navigations/DrawerNavigator";
import { ROUTE_KEY } from "./src/configs/routes";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "./src/store/auth/action";
import * as RootNavigator from "./RootNavigator";
import SplashScreen from "react-native-splash-screen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCurrent(RootNavigator));
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={ROUTE_KEY.Home}
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name={ROUTE_KEY.Login} component={Login} />
      <Stack.Screen name={ROUTE_KEY.Home} component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
