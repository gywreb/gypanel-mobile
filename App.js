/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./AppNavigation";
import { persistor, store } from "./src/store/store";
import navigationTheme from "./src/configs/navigationTheme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage from "react-native-flash-message";

import { navigationRef } from "./RootNavigator";

// store.subscribe(() => console.log(store.getState()));

console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={navigationTheme} ref={navigationRef}>
          <AppNavigation />
          <FlashMessage position="top" floating={true} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
