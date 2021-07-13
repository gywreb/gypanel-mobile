import { capitalize } from "lodash";
import moment from "moment";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountUp } from "use-count-up";
import { appColor } from "../configs/styles";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Col,
} from "react-native-table-component";
import { Image } from "react-native";
import { imgUri } from "../configs/apiClient";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/constants";

const imageWidth = SCREEN_WIDTH * 0.4;
const imageHeight = SCREEN_HEIGHT * 0.4;

const AppModalItemDetail = ({ displayFields, image, isPerson }) => {
  return (
    <View style={styles.container}>
      {image !== undefined ? (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={
                image
                  ? { uri: imgUri(image) }
                  : isPerson
                  ? require("../assets/images/profile.jpg")
                  : require("../assets/images/nopic.png")
              }
              style={styles.avatar}
            />
          </View>
        </View>
      ) : null}
      {displayFields.map((field) => {
        field.type === "object" ? console.log(field.value.tableData) : null;
        return (
          <View
            style={
              field.type === "array" || field.type === "object"
                ? { paddingVertical: 10 }
                : styles.subList
            }
          >
            <Text style={styles.subTitle}>{capitalize(field.label)}: </Text>
            {field.type === "string" ? (
              <Text style={styles.subText}>
                {field.label === "confirmDate"
                  ? moment(field.value).format("DD/MM/yyyy")
                  : field.value}
              </Text>
            ) : field.type === "number" ? (
              <Text style={styles.subText}>
                <CountUp
                  start={field.value}
                  suffix={field.label === "price" ? " VND" : ""}
                  thousandsSeparator=","
                />
              </Text>
            ) : field.type === "boolean" ? (
              <Text style={styles.subText}>
                {field.value ? "true" : "false"}
              </Text>
            ) : field.type === "array" ? (
              <View style={styles.table}>
                <Table
                  style={{ marginTop: 10 }}
                  borderStyle={{
                    borderWidth: 1,
                    borderColor: appColor.darkBlue,
                  }}
                >
                  <Row
                    flexArr={[
                      2,
                      ...field.value.tableData.slice(1).map((item) => 1),
                    ]}
                    data={field.value.tableHead.map((title) =>
                      capitalize(title)
                    )}
                    style={styles.tableHead}
                    textStyle={{
                      color: appColor.white,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  />
                  <Rows
                    flexArr={[
                      2,
                      ...field.value.tableData.slice(1).map((item) => 1),
                    ]}
                    data={field.value.tableData}
                    textStyle={styles.tableText}
                  />
                </Table>
              </View>
            ) : field.type === "object" ? (
              <View style={styles.table}>
                <Table
                  style={{ marginTop: 10 }}
                  borderStyle={{
                    borderWidth: 1,
                    borderColor: appColor.darkBlue,
                  }}
                >
                  <TableWrapper style={{ flexDirection: "row" }}>
                    <Col
                      data={field.value.tableTitle.map((text) =>
                        capitalize(text)
                      )}
                      //   heightArr={[28, 28]}
                      style={styles.tableTitle}
                      textStyle={{
                        color: appColor.white,
                        fontWeight: "bold",
                        marginLeft: 6,
                        fontSize: 14,
                      }}
                    />
                    <Rows
                      flexArr={[1, 1]}
                      data={field.value.tableData}
                      textStyle={styles.tableText}
                    />
                  </TableWrapper>
                </Table>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    elevation: 10,
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 2,
    backgroundColor: appColor.black,
    marginBottom: 20,
  },
  avatar: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 2,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    // alignItems: "center",
  },
  box: {
    height: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "space-around",
    borderRadius: 8,
  },
  isActiveCollar: {
    position: "absolute",
    height: "100%",
    width: 7,
    top: 0,
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  Active: {
    backgroundColor: appColor.active,
  },
  inActive: {
    backgroundColor: appColor.inActive,
  },
  subList: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
  subItemBox: {
    backgroundColor: appColor.gray4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginHorizontal: 3,
  },
  subItemText: {
    fontWeight: "bold",
    color: "#696969",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: appColor.darkBlue,
  },
  subText: {
    fontSize: 18,
  },
  table: {
    marginBottom: 10,
    width: "100%",
  },
  tableHead: {
    minHeight: 40,
    backgroundColor: appColor.midBlue,
  },
  tableTitle: {
    flex: 1,
    backgroundColor: appColor.midBlue,
  },
  tableText: { margin: 6 },
});

export default AppModalItemDetail;
