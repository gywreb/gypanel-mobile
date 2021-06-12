import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
import { confirmInvoice, getInvoices } from "../store/invoice/actions";
import * as Animatable from "react-native-animatable";
import AppInvoiceItem from "../components/AppInvoiceItem";
import { SwipeablePanel } from "rn-swipeable-panel";
import AppModalItemDetail from "../components/AppModalItemDetail";
import { convertToDisplayDetails } from "../utils/convertToDisplayDetails";
import { Button, Icon } from "react-native-elements";
import { View } from "react-native";
import { appColor } from "../configs/styles";
import { Dimensions } from "react-native";

const InvoiceList = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });

  const [isPanelActive, setIsPanelActive] = useState(false);
  const [currentPressInvoice, setCurrentPressInvoice] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const openPanel = (id) => {
    const currentInvoice = list.find((invoice) => invoice._id === id);
    setCurrentPressInvoice(currentInvoice);
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { list, loading, isConfirming } = useSelector((state) => state.invoice);

  useEffect(() => {
    if (isFocused) {
      dispatch(getInvoices());
    }
  }, [dispatch, isFocused]);

  const onRefresh = () => {
    dispatch(getInvoices());
    setRefreshing(false);
  };

  const handleConfirm = () => {
    dispatch(confirmInvoice(currentPressInvoice?._id, closePanel));
  };

  if (loading) return <AppSpinnerOverlay loading={loading} />;
  else
    return (
      <>
        <AppScreen
          needRefresh
          refreshing={refreshing}
          onRefresh={onRefresh}
          isLastestUpdate
        >
          <Animatable.View
            style={{ marginTop: 20 }}
            animation="bounceInDown"
            duration={500}
          >
            {list?.map((invoice) => (
              <AppInvoiceItem
                onPress={() => openPanel(invoice._id)}
                key={invoice._id}
                fromStaff={
                  invoice.fromStaff?.firstname + invoice.fromStaff?.lastname
                }
                clientInfo={invoice.clientInfo?.fullname}
                total={invoice.total}
                isConfirm={invoice.isConfirm}
              />
            ))}
          </Animatable.View>
        </AppScreen>
        <SwipeablePanel
          {...panelProps}
          isActive={isPanelActive}
          closeOnTouchOutside={true}
          showCloseButton={false}
        >
          <AppModalItemDetail
            displayFields={convertToDisplayDetails(currentPressInvoice)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingBottom: 20,
              marginTop: -5,
            }}
          >
            <Button
              onPress={currentPressInvoice?.isConfirm ? null : handleConfirm}
              loading={isConfirming}
              disabled={currentPressInvoice?.isConfirm ? true : false}
              buttonStyle={{
                width: 70,
                height: 70,
                backgroundColor: appColor.active,
                paddingVertical: 5,
                borderRadius: 35,
              }}
              containerStyle={{
                elevation: 5,
                width: 70,
                height: 70,
                borderRadius: 35,
              }}
              icon={
                <Icon
                  type="material-community"
                  name={currentPressInvoice?.isConfirm ? "check-all" : "check"}
                  size={50}
                  color="white"
                />
              }
            />
          </View>
        </SwipeablePanel>
      </>
    );
};

export default InvoiceList;
