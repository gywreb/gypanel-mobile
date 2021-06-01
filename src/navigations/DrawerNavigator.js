import React from "react";
import Home from "../screens/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { PERMISSION_ROUTE, ROUTE_KEY } from "../configs/routes";
import { drawerItems } from "../configs/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import CategoryCreate from "../screens/CategoryCreate";
import CategoryList from "../screens/CategoryList";
import ProductList from "../screens/ProductList";
import ProductCreate from "../screens/ProductCreate";
import { useSelector } from "react-redux";
import RoleList from "../screens/RoleList";
import RoleCreate from "../screens/RoleCreate";
import InvoiceList from "../screens/InvoiceList";
import StaffList from "../screens/StaffList";
import StaffCreate from "../screens/StaffCreate";
import UserProfile from "../screens/UserProfile";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { roleDrawerItems } = useSelector((state) => state.navigation);

  return (
    <Drawer.Navigator
      initialRouteName={ROUTE_KEY.Home}
      drawerContent={(props) => (
        <CustomDrawerContent
          drawerItems={roleDrawerItems.length ? roleDrawerItems : drawerItems}
          {...props}
        />
      )}
      drawerStyle={{ position: "absolute", zIndex: 999 }}
    >
      <Drawer.Screen name={ROUTE_KEY.Home} component={Home} />
      <Drawer.Screen
        name={ROUTE_KEY.CategoryCreate}
        component={CategoryCreate}
      />
      <Drawer.Screen name={ROUTE_KEY.UserProfile} component={UserProfile} />
      <Drawer.Screen name={ROUTE_KEY.CategoryList} component={CategoryList} />
      <Drawer.Screen name={ROUTE_KEY.ProductList} component={ProductList} />
      <Drawer.Screen name={ROUTE_KEY.ProductCreate} component={ProductCreate} />
      <Drawer.Screen name={ROUTE_KEY.RoleList} component={RoleList} />
      <Drawer.Screen name={ROUTE_KEY.RoleCreate} component={RoleCreate} />
      <Drawer.Screen name={ROUTE_KEY.InvoiceList} component={InvoiceList} />
      <Drawer.Screen name={ROUTE_KEY.StaffList} component={StaffList} />
      <Drawer.Screen name={ROUTE_KEY.StaffCreate} component={StaffCreate} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
