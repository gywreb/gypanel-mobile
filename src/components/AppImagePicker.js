import { useFormikContext } from "formik";
import React, { useState } from "react";
import { Platform } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import { imgUri } from "../configs/apiClient";

import { appColor } from "../configs/styles";

const AppImagePicker = ({ name, iconSize = 64, iconColor, hasImage }) => {
  const { setFieldValue, setFieldTouched, values } = useFormikContext();
  const [isKeepOldImage, setIsKeepOldImage] = useState(hasImage);

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        setIsKeepOldImage(null);
        launchImageLibrary({ title: "Select Photo" }, (response) => {
          if (response.uri) {
            const file = {
              name: response.fileName,
              uri:
                Platform.OS === "android"
                  ? response.uri
                  : response.uri.replace("file://", ""),
              type: response.type,
            };
            setFieldValue(name, file);
          }
          setFieldTouched(name, true);
        });
      }}
    >
      <View style={styles.iconContainer}>
        {values[name]?.uri || isKeepOldImage ? (
          <Image
            style={styles.image}
            source={{
              uri: isKeepOldImage ? imgUri(hasImage) : values[name]?.uri,
            }}
          />
        ) : (
          <Icon
            name="camera"
            type="material-community"
            size={iconSize}
            color={iconColor || appColor.gray8}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: appColor.white,
    marginBottom: 40,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: appColor.gray4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appColor.white,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
});

export default AppImagePicker;
