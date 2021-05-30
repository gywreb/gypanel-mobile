import { METHODS, PERMISSION_ROUTE, ROUTE_KEY } from "./routes";

export const compulsiveDrawerItemsTop = [
  {
    key: ROUTE_KEY.Home,
    title: "Home",
    icon: "home",
    routes: [
      {
        nav: ROUTE_KEY.Home,
        routeName: ROUTE_KEY.Home,
        title: "Home",
      },
    ],
  },
];

export const drawerItems = [
  {
    key: PERMISSION_ROUTE.Category,
    title: "Category",
    icon: "shape",
    routes: [
      {
        nav: ROUTE_KEY.CategoryList,
        routeName: ROUTE_KEY.CategoryList,
        title: "Category List",
        method: METHODS.GET,
      },
      {
        nav: ROUTE_KEY.CategoryCreate,
        routeName: ROUTE_KEY.CategoryCreate,
        title: "Create Category",
        method: METHODS.POST,
      },
    ],
  },
  {
    key: PERMISSION_ROUTE.Product,
    title: "Product",
    icon: "shopping",
    routes: [
      {
        nav: ROUTE_KEY.ProductList,
        routeName: ROUTE_KEY.ProductList,
        title: "Product List",
        method: METHODS.GET,
      },
      {
        nav: ROUTE_KEY.ProductCreate,
        routeName: ROUTE_KEY.ProductCreate,
        title: "Create Product",
        method: METHODS.POST,
      },
    ],
  },
  {
    key: PERMISSION_ROUTE.Invoice,
    title: "Invoice",
    icon: "receipt",
    routes: [
      {
        nav: ROUTE_KEY.InvoiceList,
        routeName: ROUTE_KEY.InvoiceList,
        title: "Invoice List",
        method: METHODS.GET,
      },
    ],
  },
  {
    key: PERMISSION_ROUTE.Role,
    title: "Role",
    icon: "account",
    routes: [
      {
        nav: ROUTE_KEY.RoleList,
        routeName: ROUTE_KEY.RoleList,
        title: "Role List",
        method: METHODS.GET,
      },
      {
        nav: ROUTE_KEY.RoleCreate,
        routeName: ROUTE_KEY.RoleCreate,
        title: "Create Role",
        method: METHODS.POST,
      },
    ],
  },
];
