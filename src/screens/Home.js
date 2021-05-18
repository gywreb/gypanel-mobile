import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
import { getTotal } from "../store/analytic/action";
import * as Animatable from "react-native-animatable";
import AppAnalyticTotal from "../components/AppAnalyticTotal";
import { drawerItems } from "../configs/drawer";
import { ROUTE_KEY } from "../configs/routes";

const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);
  const { loading, total } = useSelector((state) => state.analytic);

  useEffect(() => {
    if (token) {
      dispatch(getTotal());
    }
  }, [isFocused, token]);

  if (loading) return <AppSpinnerOverlay loading={loading} />;
  return (
    <AppScreen>
      <Animatable.View animation="bounceInDown" duration={500}>
        {total
          ? total.map((item) => {
              console.log(item);
              return (
                <AppAnalyticTotal
                  key={item.label}
                  iconName={item.icon}
                  label={item.label}
                  iconColor={item.color}
                  totalNumber={item.value.active + item.value.inActive}
                  leftNumber={item.value.active}
                  rightNumber={item.value.inActive}
                  leftLabel={item.leftLabel}
                  rightLabel={item.rightLabel}
                  onPress={() => {
                    const nav = drawerItems.find(
                      (nav) => nav.key === item.label
                    )?.routes[0]?.nav;
                    navigation.navigate(nav || ROUTE_KEY.Home, {
                      screen: nav,
                    });
                  }}
                />
              );
            })
          : null}
      </Animatable.View>
    </AppScreen>
  );
};

export default Home;
