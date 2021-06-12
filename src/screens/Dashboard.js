import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import AppBezierLineChart from "../components/AppBezierLineChart";
import AppHBarChart from "../components/AppHBarChart";
import AppPieChart from "../components/AppPieChart";
import AppModalPicker from "../components/AppModalPicker";
import AppScreen from "../components/AppScreen";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
import { appColor } from "../configs/styles";
import {
  getMonthlyRevenue,
  getRankProduct,
  getRankStaff,
  resetAnalytic,
} from "../store/analytic/action";
import * as Animatable from "react-native-animatable";
import { LANDSCAPE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/constants";
import { useOrientation } from "../hooks/useOrientation";

const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = () => {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  // const [scrollPos, setScrollPos] = useState(0);
  // const [isStaffVisible, setIsStaffVisible] = useState(false);
  // const [isProductVisible, setIsProductVisible] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const onSelect = (e, selected) => {
    console.log(selected);
    setSelectedYear(selected);
    dispatch(getMonthlyRevenue(parseInt(selected)));
  };

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isLanscape = useOrientation().includes(LANDSCAPE);
  const { revenueData, rankStaff, rankProduct, totalMake } = useSelector(
    (state) => state.analytic
  );

  const onActivateStaffChart = () => {
    dispatch(getRankStaff());
  };

  const onActivateProductChart = () => {
    dispatch(getRankProduct());
  };

  useEffect(() => {
    return () => dispatch(resetAnalytic());
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(resetAnalytic());
    }
  }, [isFocused, dispatch]);

  return (
    <>
      <AppScreen>
        <Animatable.View
          style={{
            minHeight: isLanscape ? SCREEN_WIDTH * 5 : SCREEN_HEIGHT * 1.2,
          }}
          animation="bounceInDown"
          duration={500}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={styles.title}>Revenue</Text>
            <Button
              onPress={() => openPanel()}
              buttonStyle={{ backgroundColor: appColor.darkBlue, padding: 10 }}
              icon={
                <Icon
                  name="calendar"
                  type="material-community"
                  size={20}
                  color="white"
                  style={{ paddingRight: 5 }}
                />
              }
              title={selectedYear ? selectedYear : "Choose a year"}
            />
          </View>
          <AppBezierLineChart
            renderData={revenueData.map((value, index) => {
              if (value > 10000 * 1000000) value /= 10;
              return { month: labels[index], revenue: value };
            })}
            data={revenueData.map((value) => {
              if (value > 10000 * 1000000) value /= 10;
              return value;
            })}
            labels={labels}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            <Text style={styles.title}>Top 5 Staffs By Revenue</Text>
          </View>
          <AppHBarChart
            handleLoadData={onActivateStaffChart}
            data={rankStaff}
            renderData={
              rankStaff.length
                ? rankStaff
                    .map((value, index) => {
                      return {
                        x: rankStaff.length - index,
                        y: value.revenueMake,
                      };
                    })
                    .slice(0, 5)
                : []
            }
            labels={rankStaff
              .map((value) => {
                let label;
                if (value.firstname.length > 6)
                  label = value.firstname.slice(0, 6);
                else label = value.firstname;
                return label;
              })
              .sort((a, b) => (b.revenueMake > a.revenueMake ? 1 : -1))}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            <Text style={styles.title}>Top Selling Products</Text>
          </View>
          <AppPieChart
            handleLoadData={onActivateProductChart}
            renderData={
              rankProduct.length
                ? rankProduct
                    ?.map((product) => {
                      return {
                        x: product.name,
                        y: product.value,
                        label: `${(
                          Math.round(
                            ((product.value / totalMake) * 100 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        ).toString()}%`,
                      };
                    })
                    .slice(0, 5)
                : []
            }
            legends={rankProduct?.map((product) => ({
              name: product.name,
            }))}
          />
        </Animatable.View>
      </AppScreen>
      <AppModalPicker
        isAcive={isPanelActive}
        closePanel={closePanel}
        renderData={years}
        selectHandler={onSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: appColor.white,
    fontWeight: "bold",
  },
});

export default Dashboard;
