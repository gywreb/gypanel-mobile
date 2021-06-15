import React from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { View } from "react-native";
import { Badge, Icon } from "react-native-elements";
import { Chip } from "react-native-elements/dist/buttons/Chip";
import { imgUri } from "../configs/apiClient";
import { appColor } from "../configs/styles";
import { CountUp } from "use-count-up";
import capitalize from "../utils/capitalize";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/constants";

const AppAnalyticTotal = ({
  iconName,
  iconColor,
  size = 45,
  label,
  totalNumber,
  rightNumber,
  leftNumber,
  leftLabel,
  rightLabel,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback style={{ paddingTop: 40 }} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.cardBody}>
          <View style={styles.totalNumber}>
            <Text style={styles.labelText}>{capitalize(label)}</Text>
            <Text
              style={[styles.labelText, { color: iconColor, fontSize: 40 }]}
            >
              <CountUp isCounting end={totalNumber} />
            </Text>
          </View>
          <View style={styles.cardContent}>
            <LinearProgress
              variant="determinate"
              color={iconColor}
              value={leftNumber / totalNumber}
              style={{ height: 8, borderRadius: 8 }}
              trackColor={appColor.gray8}
            />
            <View style={styles.progressLabel}>
              <Text style={[styles.progressText, { color: iconColor }]}>
                {leftLabel}: {leftNumber}
              </Text>
              <Text style={[styles.progressText, { color: "#999" }]}>
                {rightLabel}: {rightNumber}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cardAvatarContainer}>
        <Icon
          name={iconName || "cancel"}
          type="material-community"
          size={size}
          color={appColor.white}
          style={[styles.cardAvatar, { backgroundColor: iconColor }]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.white,
    paddingHorizontal: 15,
    borderRadius: 8,
    paddingBottom: (SCREEN_HEIGHT / SCREEN_WIDTH) * 24,
  },
  cardBody: {
    padding: 10,
  },
  cardAvatarContainer: {
    position: "absolute",
    zIndex: 99,
    elevation: 10,
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: appColor.black,
    top: 15,
    left: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  cardAvatar: {
    width: 90,
    height: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    position: "relative",
    top: 25,
    marginRight: "-1%",
    left: "-2%",
  },
  totalNumber: {
    flexDirection: "row",
    left: 50,
    top: "1%",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  progressLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    top: "3%",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  labelText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cardRightContent: {
    flexDirection: "row",
  },
});

export default AppAnalyticTotal;
