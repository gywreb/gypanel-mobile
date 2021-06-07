import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryPie,
} from "victory-native";
import { appColor } from "../configs/styles";
import * as Animatable from "react-native-animatable";
import { LANDSCAPE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/constants";
import { useOrientation } from "../hooks/useOrientation";
import { Button } from "react-native-elements";

const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

const AppPieChart = ({ renderData, legends, handleLoadData }) => {
  const isLanscape = useOrientation().includes(LANDSCAPE);

  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    if (renderData.length) setGraphicData(renderData); // Setting the data that we want to display
    return () => setGraphicData(defaultGraphicData);
  }, [renderData]);

  return (
    <View
      style={{
        backgroundColor: appColor.white,
        borderRadius: 10,
        elevation: 5,
        height: isLanscape ? SCREEN_HEIGHT * 0.45 : SCREEN_HEIGHT * 0.55,
      }}
    >
      {renderData.length ? (
        <VictoryChart
          padding={{
            top: isLanscape ? SCREEN_HEIGHT * 0.22 : SCREEN_HEIGHT * 0.12,
            bottom: isLanscape ? SCREEN_HEIGHT * 0.035 : SCREEN_HEIGHT * 0.2,
            left: isLanscape ? SCREEN_WIDTH * 0.15 : SCREEN_WIDTH * 0.1,
            right: isLanscape ? SCREEN_WIDTH * 1.2 : SCREEN_WIDTH * 0.2,
          }}
          height={isLanscape ? SCREEN_HEIGHT * 0.6 : SCREEN_HEIGHT * 0.65}
          width={isLanscape ? SCREEN_HEIGHT * 0.95 : SCREEN_WIDTH * 0.98}
          style={{
            parent: {
              marginTop: "-20%",
              // marginLeft: "2%",
            },
          }}
        >
          <VictoryPie
            //   style={{ labels: { fill: appColor.midBlue, fontWeight: "bold" } }}
            style={{ labels: { fill: "transparent" } }}
            colorScale={[
              appColor.mainBlue,
              appColor.danger,
              appColor.active,
              appColor.warning,
              appColor.blackBlue,
            ]}
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
            data={graphicData}
          />
          <VictoryLegend
            colorScale={[
              appColor.mainBlue,
              appColor.danger,
              appColor.active,
              appColor.warning,
              appColor.blackBlue,
            ]}
            width={isLanscape ? SCREEN_HEIGHT * 0.95 : SCREEN_WIDTH * 0.5}
            x={isLanscape ? SCREEN_HEIGHT * 0.5 : SCREEN_WIDTH * 0.08}
            y={isLanscape ? SCREEN_WIDTH * 0.65 : SCREEN_HEIGHT * 0.5}
            orientation="horizontal"
            itemsPerRow={2}
            gutter={20}
            style={{ border: { stroke: appColor.darkBlue } }}
            data={legends}
          />
          <VictoryAxis
            style={{
              ticks: { stroke: "transparent" },
              axis: { stroke: "transparent" },
              tickLabels: {
                fill: "transparent",
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

export default AppPieChart;
