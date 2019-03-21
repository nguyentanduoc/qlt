const BASE_URI = "http://localhost:8090";

export const ACTION_TYPES = {
  GET_ALL_USER: "GET_ALL_USER",
  GET_ALL_USER_SUCCESS: "GET_ALL_USER_SUCCESS",
  GET_ALL_USER_HAS_ERRORED: "GET_ALL_USER_HAS_ERRORED",
  SHOW_USER: "SHOW_USER",
  GET_ALL_ROLE: "GET_ALL_ROLE",
  GET_ALL_ROLE_SUCCESS: "GET_ALL_ROLE_SUCCESS",
  GET_ALL_ROLE_FAIL: "GET_ALL_ROLE_FAIL",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAIL: "UPDATE_USER_FAIL",
  USER_DETAIL_FOR_ROLE: "USER_DETAIL_FOR_ROLE",
  OPEN_LIST_ROLE_OF_USER: "OPEN_LIST_ROLE_OF_USER",
  SET_ROLE_USER: "SET_ROLE_USER",
  SET_CLOSE_ALERT: "SET_CLOSE_ALERT",
  REMOVE_USER_DETAIL_FOR_ROLE: "REMOVE_USER_DETAIL_FOR_ROLE",
  HAS_ERROR: "HAS_ERROR",
  RESET_ERROR: "RESET_ERROR",
  AUTH: {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGOUT: "LOGOUT",
    SET_BRANCH: "AUTH_SET_BRANCH"
  },
  USER: {
    SEARCH_SUCCESS: "USER_SEARCH_SUCCESS",
    GET_USERS_SUCCESS: "GET_USERS_SUCCESS",
    SET_USER_DETAIL: "SET_USER_DETAIL",
    RESET_USER_DETAIL: "RESET_USER_DETAIL"
  },
  PAGINATION: {
    SET_PAGINATION: "SET_PAGINATION",
    RESET_PAGINATION: "RESET_PAGINATION",
    CLICKED: "CLICKED",
    RESET_CLICKED: "RESET_CLICKED"
  },
  APP_SETTING: {
    DELETE_MULTIPLE: "DELETE_MULTIPLE"
  },
  BRANCH: {
    SAVE: "BRANCH_SAVE",
    RESET_ALL : "BRANCH_RESET_ALL",
    GET_SUCCESS: "BRANCH_GET_SUCCESS",
    SET_BRANCH: "BRANCH_SET_BRANCH",
    RESET_BRANCH: "BRANCH_RESET_BRANCH",
    GET_ALL_SHOP: "BRANCH_GET_ALL_SHOP",
    GET_BRANCH_OF_DIRECTOR:"GET_BRANCH_OF_DIRECTOR",
    BRANCH_FOR_SELECTION: "BRANCH_FOR_SELECTION"
  },
  SHOP: {
    GET_SUCCESS: "SHOP_GET_SUCCESS",
    SET_DETAIL: "SHOP_SET_DETAIL",
    RESET: "SHOP_RESET",
    RESET_FLG_DETAIL: "SHOP_RESET_FLG_DETAIL",
    DELETE_SUCCESS: "SHOP_DELETE_SUCCESS",
    SAVE_SUCCESS: "SHOP_SAVE_SUCCESS",
    RESET_SAVE_SUCCESS:"SHOP_RESET_SAVE_SUCCESS",
    TOGGLE_MODAL: "SHOP_TOGGLE_MODAL"
  },
  EMPLOYEE: {
    INIT: "EMPLOYEE_INIT"
  },
  IMPORT: {
    INIT: "IMPORT_INIT",
    SET_SPEC_SELECTION: "IMPORT_SET_SPEC_SELECTION",
    SAVE_SUCCESS: "IMPORT_SAVE_SUCCESS",
    RESET_SAVE_SUCCESS: "IMPORT_RESET_SAVE_SUCCESS"
  },
  PRODUCT: {
    INIT_SUCCESS: "PRODUCT_INIT_SUCCESS"
  }
}
export const LOCAL_STORAGE = {
  ACCESS_KEY: "ACCESS_KEY",
  IS_LOGIN: "IS_LOGIN"
}
export const API = {
  GET_ALL_USER: `${BASE_URI}/api/admin/users/get-all`,
  LOGIN: `${BASE_URI}/api/auth/signin`,
  UPDATE_USER_ROLE: `${BASE_URI}/api/admin/users/update-role`,
  ROLE: {
    GET_ALL_ROLE: `${BASE_URI}/api/admin/roles/get-all`,
    GET_ROLE_FOR_ADMIN: `${BASE_URI}/api/admin/roles/get-role-for-admin`,
    GET_ROLES_BY_ROLES:  `${BASE_URI}/api/admin/roles/get-roles-by-roles`,
  },
  USER: {
    SEARCH_USER: `${BASE_URI}/api/admin/users/search`,
    CREATE_ACCOUNT: `${BASE_URI}/api/admin/users/create`,
    GET_USER_LIMIT: `${BASE_URI}/api/admin/users/get-user-limit`,
    DELETE_USER: `${BASE_URI}/api/admin/users/delete`,
  },
  BRANCH:{
    SAVE: `${BASE_URI}/api/branch/save`,
    DELETE: `${BASE_URI}/api/branch/delete`,
    SELECT: `${BASE_URI}/api/branch/select`,
    SELECT_BRANCH_OF_DIRECTOR:`${BASE_URI}/api/branch/select-branch-by-director`,
  },
  SHOP: {
    SAVE: `${BASE_URI}/api/shop/save`,
    DELETE: `${BASE_URI}/api/shop/delete`,
    SELECT: `${BASE_URI}/api/shop/select`,
    SELECT_ALL: `${BASE_URI}/api/shop/select-all`,
  },
  EMPLOYEE: {
    INIT:`${BASE_URI}/api/employee/init`,
    SAVE: `${BASE_URI}/api/employee/save`,
    DELETE: `${BASE_URI}/api/employee/delete`,
    SELECT: `${BASE_URI}/api/employee/select`,
    SELECT_ALL: `${BASE_URI}/api/employee/select-all`,
  },
  PRODUCT: {
    INIT: `${BASE_URI}/api/product/init`,
    SAVE: `${BASE_URI}/api/product/save`,
    GET_SPEC_UNIT: `${BASE_URI}/api/product/get-spec-unit`,
    GET_PRODUCT_FOR_REQUEST: `${BASE_URI}/api/product/get-product-for-request`,
  },
  IMPORT: {
    INIT: `${BASE_URI}/api/import-product/init`,
    SAVE: `${BASE_URI}/api/import-product/save`,
  }
}

export const ROLES = {
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_DIRECTOR: "ROLE_DIRECTOR",
  ROLE_LEADER: "ROLE_LEADER",
  ROLE_EMPLOYEE: "ROLE_EMPLOYEE",
  ROLE_USER: "ROLE_USER"
}

export const NAV_ACTION_TYPE = {
  GET_ALL_NAV_SUCCESS: "GET_ALL_NAV_SUCCESS",
  GET_ALL_SUB_NAV: "GET_ALL_SUB_NAV",
  SET_ROLE_FOR_NAV: "SET_ROLE_FOR_NAV",
  SET_NAV: "SET_NAV",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  RESET_ALL: "RESET_ALL_NAV"
}
export const NAV_API = {
  GET_ALL_NAV: `${BASE_URI}/api/admin/nav/get-all`,
  GET_ALL_SUB_NAV: `${BASE_URI}/api/admin/nav/get-sub-nav`,
  UPDATE_NAV: `${BASE_URI}/api/admin/nav/update-nav`,
}
export const ALERT_ACTIONS = {
  IS_SUCCESS: "IS_SUCCESS",
  IS_ERRORED: "IS_ERRORED",
  RESET_ALERT: "RESET_ALERT"
}
export const USER_API = {
  SEARCH_USER: `${BASE_URI}/api/admin/users/updateRole`,
}
