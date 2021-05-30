import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppScreen from "../components/AppScreen";
import AppSpinnerOverlay from "../components/AppSpinnerOverlay";
import { getInvoices } from "../store/invoice/actions";
import * as Animatable from "react-native-animatable";
import AppInvoiceItem from "../components/AppInvoiceItem";
import { SwipeablePanel } from "rn-swipeable-panel";
import AppModalItemDetail from "../components/AppModalItemDetail";
import { convertToDisplayDetails } from "../utils/convertToDisplayDetails";

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

  const { list, loading } = useSelector((state) => state.invoice);

  useEffect(() => {
    if (isFocused) dispatch(getInvoices());
  }, [dispatch, isFocused]);

  if (loading) return <AppSpinnerOverlay loading={loading} />;
  else
    return (
      <>
        <AppScreen>
          <Animatable.View animation="bounceInDown" duration={500}>
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
        >
          <AppModalItemDetail
            displayFields={convertToDisplayDetails(currentPressInvoice)}
          />
        </SwipeablePanel>
      </>
    );
};

export default InvoiceList;
