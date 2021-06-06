import React from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
} from "victory-native";
import { appColor } from "../configs/styles";
import * as Animatable from "react-native-animatable";
import { LANDSCAPE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/constants";
import { useOrientation } from "../hooks/useOrientation";

const AppBezierLineChart = ({ data = [], labels = [], renderData }) => {
  const isLanscape = useOrientation().includes(LANDSCAPE);

  return (
    <View
      style={{
        backgroundColor: appColor.white,
        borderRadius: 10,
        elevation: 5,
      }}
    >
      <VictoryChart
        padding={{
          top: isLanscape ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.12,
          bottom: SCREEN_HEIGHT * 0.08,
          left: isLanscape ? SCREEN_WIDTH * 0.15 : SCREEN_WIDTH * 0.12,
          right: SCREEN_WIDTH * 0.1,
        }}
        maxDomain={{
          y: data?.length ? Math.max(...data) * 1.2 : 0,
        }}
        height={isLanscape ? SCREEN_HEIGHT * 0.45 : SCREEN_HEIGHT * 0.4}
        width={isLanscape ? SCREEN_HEIGHT * 0.95 : SCREEN_WIDTH * 0.98}
        style={{
          parent: {
            marginTop: "-14%",
            marginLeft: "-5%",
          },
        }}
      >
        <VictoryLine
          style={{
            data: {
              stroke: appColor.darkBlue,
              strokeWidth: 3,
              transform: "translate(0, -25)",
            },
          }}
          categories={{ x: labels }}
          animate={{
            onLoad: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
              after: (datum) => ({
                opacity: 1,
                _y: datum._y,
                labels: datum.labels,
              }),
            },
            onExit: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
            },
            onEnter: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
              after: (datum) => ({
                opacity: 1,
                _y: datum._y,
                labels: datum.labels,
              }),
            },
          }}
          interpolation="natural"
          data={renderData}
          x="month"
          y="revenue"
        />
        <VictoryScatter
          style={{
            data: {
              stroke: appColor.darkBlue,
              strokeWidth: 5,
              transform: "translate(-2, -25)",
            },
            labels: {
              fontSize: 10,
              transform: "translate(-2, -12)",
              stroke: appColor.mainBlue,
            },
          }}
          animate={{
            onLoad: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
              after: (datum) => ({
                opacity: 1,
                _y: datum._y,
                labels: datum.labels,
              }),
            },
            onExit: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
            },
            onEnter: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
              after: (datum) => ({
                opacity: 1,
                _y: datum._y,
                labels: datum.labels,
              }),
            },
          }}
          labels={({ datum }) => {
            return datum.revenue > 0
              ? `${(datum.revenue / 10000000).toString().split(".")[0]}M`
              : null;
          }}
          data={renderData}
          x="month"
          y="revenue"
        />
        <VictoryAxis
          domainPadding={{ x: [0.1, 5] }}
          style={{
            axis: {
              transform: "translate(0, 10)",
              strokeWidth: 2,
              stroke: appColor.midBlue,
            },
            ticks: { stroke: "transparent" },
            tickLabels: {
              angle: 35,
              fontSize: 11,
              transform: "translate(5, 5)",
              stroke: appColor.midBlue,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default AppBezierLineChart;
