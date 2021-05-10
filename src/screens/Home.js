import { DrawerActions, useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Icon } from "react-native-elements";
import AppHeader from "../components/AppHeader";
import AppScreen from "../components/AppScreen";

const Home = () => {
  return (
    <AppScreen>
      <Text>This is home screen</Text>
    </AppScreen>
  );
};

export default Home;
