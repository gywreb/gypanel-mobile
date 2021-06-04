import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import AppBezierLineChart from "../components/AppBezierLineChart";
import AppModalPicker from "../components/AppModalPicker";
import AppScreen from "../components/AppScreen";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
import { appColor } from "../configs/styles";
import { getMonthlyRevenue } from "../store/analytic/action";

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
  const { revenueData } = useSelector((state) => state.analytic);

  useEffect(() => {
    return () => setSelectedYear(null);
  }, []);

  return (
    <>
      <AppScreen>
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
        <AppBezierLineChart data={revenueData} labels={labels} />
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
