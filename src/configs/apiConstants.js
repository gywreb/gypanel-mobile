export const CateogryEndpoint = {
  CREATE_AND_GET: "/category",
  TOGGLE: (id) => `/category/${id}`,
};

export const RoleEndpoint = {
  CREATE_AND_GET: "/role",
  GET_ROLE_ID: (id) => `/role/${id}`,
  TOGGLE: (id) => `/role/${id}`,
};
