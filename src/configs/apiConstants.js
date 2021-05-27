export const CateogryEndpoint = {
  CREATE_AND_GET: "/category",
  TOGGLE: (id) => `/category/${id}`,
};

export const RoleEndpoint = {
  CREATE_AND_GET: "/role",
  GET_ROLE_ID: (id) => `/role/${id}`,
  TOGGLE: (id) => `/role/${id}`,
};

export const StaffEndpoint = {
  CREATE_AND_GET: "/staff",
  GET_STAFF_BY_ID: (id) => `/staff/${id}`,
  TOGGLE: (id) => `/staff/${id}`,
  UPDATE: (id) => `/staff/updateOne/${id}`,
};
