import React, { useState } from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { View } from "react-native";
import { Badge } from "react-native-elements";
import { Chip } from "react-native-elements/dist/buttons/Chip";
import { imgUri } from "../configs/apiClient";
import { appColor } from "../configs/styles";
import AppInfoItemTag from "./AppInfoItemTag";
import capitalize from "../utils/capitalize";
import { CountUp } from "use-count-up";
import AppActiveRoleButton from "./AppActiveRoleButton";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/constants";

const AppInfoItem = ({
  isActive = true,
  imageName,
  displayFields = [],
  isStaff,
  onOpenDetail,
  handleActive,
  id,
  activeStyles,
}) => {
  const [loading, setLoading] = useState(false);

  const onToggle = async () => {
    setLoading(true);
    await handleActive(id);
    setLoading(false);
  };

  return (
    <View>
      <TouchableWithoutFeedback
        style={{ paddingTop: 40 }}
        onPress={onOpenDetail}
      >
        <View style={styles.container}>
          <View style={styles.cardBody}>
            <View style={styles.cardContent}>
              {displayFields.length
                ? displayFields.map((item) => {
                    // console.log(item);
                    return (
                      <View style={styles.contentLine}>
                        <Text style={styles.contentTitle}>{`${capitalize(
                          item.label
                        )}:`}</Text>
                        {item.type !== "array" ? (
                          <Text style={styles.contentValue} numberOfLines={1}>
                            {item.label === "price" ? (
                              <CountUp
                                isCounting
                                end={item.value}
                                suffix=" VND"
                                thousandsSeparator=","
                              />
                            ) : (
                              item.value
                            )}
                          </Text>
                        ) : (
                          <View style={styles.tagsContainer}>
                            {item.value.map((content) => (
                              <AppInfoItemTag title={content?.name || ""} />
                            ))}
                          </View>
                        )}
                      </View>
                    );
                  })
                : null}
            </View>
          </View>
        </View>
        <View style={styles.cardAvatarContainer}>
          <Image
            source={
              isStaff
                ? imageName
                  ? { uri: imgUri(imageName) }
                  : require("../assets/images/profile.jpg")
                : imageName
                ? { uri: imgUri(imageName) }
                : require("../assets/images/nopic.png")
            }
            style={styles.cardAvatar}
          />
        </View>
      </TouchableWithoutFeedback>
      <AppActiveRoleButton
        isActive={isActive}
        loading={loading}
        onPress={onToggle}
        positionStyles={
          activeStyles || {
            maxWidth: SCREEN_WIDTH * 0.25,
            left: "3%",
            bottom: SCREEN_HEIGHT * 0.04,
            zIndex: 99,
          }
        }
        // noAbsolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.white,
    paddingHorizontal: 15,
    borderRadius: 8,
    paddingBottom: (SCREEN_HEIGHT / SCREEN_WIDTH) * 0.1,
  },
  cardBody: {
    minHeight: SCREEN_HEIGHT * 0.18,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
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
  },
  cardAvatar: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  cardContent: {
    position: "relative",
    left: 90,
  },
  cardRightContent: {
    flexDirection: "row",
  },
  contentLine: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  contentTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contentValue: {
    marginLeft: 5,
    fontSize: 16,
    maxWidth: "87%",
    paddingRight: 100,
    maxWidth: SCREEN_WIDTH * 0.6,
  },
  tagsContainer: {
    marginVertical: -10,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "59%",
  },
});

export default AppInfoItem;
