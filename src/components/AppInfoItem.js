import React from "react";
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

const AppInfoItem = ({ isActive = true, imageName, displayFields = [] }) => {
  // console.log(displayFields);
  return (
    <TouchableWithoutFeedback style={{ paddingTop: 40 }}>
      <View style={styles.container}>
        <View style={styles.cardBody}>
          <View style={styles.cardContent}>
            {displayFields.length
              ? displayFields.map((item) => {
                  console.log(item);
                  return (
                    <View style={styles.contentLine}>
                      <Text style={styles.contentTitle}>{`${capitalize(
                        item.label
                      )}:`}</Text>
                      {item.type !== "array" ? (
                        <Text style={styles.contentValue}>
                          {item.label === "price"
                            ? `$${item.value}`
                            : item.value}
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
            imageName
              ? { uri: imgUri(imageName) }
              : require("../assets/images/nopic.png")
          }
          style={styles.cardAvatar}
        />
        <Chip
          title={isActive ? "Active" : "Unactive"}
          type="outline"
          titleStyle={{
            color: appColor.white,
            fontWeight: "bold",
            fontSize: 14,
          }}
          buttonStyle={{
            paddingVertical: 4,
            backgroundColor: isActive ? appColor.activeColor : appColor.error,
            borderRadius: 8,
          }}
          containerStyle={{ paddingTop: 20 }}
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
  },
  cardBody: {
    minHeight: 150,
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
