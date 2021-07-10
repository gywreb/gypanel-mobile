import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";
import {
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from "victory-native";
import { appColor } from "../configs/styles";
import * as Animatable from "react-native-animatable";
import { LANDSCAPE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/constants";
import { useOrientation } from "../hooks/useOrientation";
import { Button } from "react-native-elements";

const AppHBarChart = ({ renderData, labels, handleLoadData }) => {
  const isLanscape = useOrientation().includes(LANDSCAPE);

  return (
    <View
      style={{
        backgroundColor: appColor.white,
        borderRadius: 10,
        elevation: 5,
        height: isLanscape ? SCREEN_HEIGHT * 0.32 : SCREEN_HEIGHT * 0.35,
      }}
    >
      {renderData.length && labels.length ? (
        <VictoryChart
          padding={{
            top: isLanscape ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.12,
            bottom: SCREEN_HEIGHT * 0.05,
            left: isLanscape ? SCREEN_WIDTH * 0.15 : SCREEN_WIDTH * 0.16,
            right: isLanscape ? SCREEN_WIDTH * 0.3 : SCREEN_WIDTH * 0.2,
          }}
          // maxDomain={{
          //   y: data?.length ? Math.max(...data) * 1.2 : 0,
          // }}
          height={isLanscape ? SCREEN_HEIGHT * 0.45 : SCREEN_HEIGHT * 0.4}
          width={isLanscape ? SCREEN_HEIGHT * 0.95 : SCREEN_WIDTH * 0.98}
          style={{
            parent: {
              marginTop: "-14%",
              marginLeft: "5%",
            },
          }}
        >
          <VictoryBar
            horizontal
            style={{
              data: {
                fill: appColor.darkBlue,
              },
              labels: { fill: appColor.white, fontWeight: "bold" },
            }}
            categories={{ x: labels }}
            labels={({ datum }) => {
              return datum.y > 0
                ? `${(datum.y / 10000000).toString().split(".")[0]}M`
                : null;
            }}
            labelComponent={<VictoryLabel dy={0} dx={SCREEN_WIDTH * -0.1} />}
            animate={{
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
            data={renderData}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              tickLabels: {
                fontWeight: "bold",
                fill: appColor.midBlue,
              },
            }}
          />
        </VictoryChart>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            title="View"
            onPress={handleLoadData}
            buttonStyle={{
              backgroundColor: appColor.darkBlue,
              width: SCREEN_WIDTH * 0.5,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default AppHBarChart;
