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
import OneSignal from "react-native-onesignal";
import { ONESIGNAL_APPID } from "./src/configs/constants";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCurrent(RootNavigator));
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);

    OneSignal.setLogLevel(6, 0);

    OneSignal.init(ONESIGNAL_APPID, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    OneSignal.addEventListener("received", onReceived);
    OneSignal.addEventListener("opened", onOpened);
    OneSignal.addEventListener("ids", onIds);

    return () => {
      OneSignal.removeEventListener("received", onReceived);
      OneSignal.removeEventListener("opened", onOpened);
      OneSignal.removeEventListener("ids", onIds);
    };
  }, []);

  const onReceived = (notification) => {
    console.log("Notification received: ", notification);
  };

  const onOpened = (openResult) => {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  };

  const onIds = (device) => {
    console.log("Device info: ", device);
  };

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
