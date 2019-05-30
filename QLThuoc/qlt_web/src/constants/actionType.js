export default {
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
    SET_BRANCH: "AUTH_SET_BRANCH",
    SET_LOADING: "AUTH_SET_LOADING",
    CLEAR_ALL: "AUTH_CLEAR_ALL"
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
    RESET_ALL: "BRANCH_RESET_ALL",
    GET_SUCCESS: "BRANCH_GET_SUCCESS",
    SET_BRANCH: "BRANCH_SET_BRANCH",
    RESET_BRANCH: "BRANCH_RESET_BRANCH",
    GET_ALL_SHOP: "BRANCH_GET_ALL_SHOP",
    GET_BRANCH_OF_DIRECTOR: "GET_BRANCH_OF_DIRECTOR",
    BRANCH_FOR_SELECTION: "BRANCH_FOR_SELECTION",
    GET_SPEC_LEVEL_BRANCH_SUCCESS: "BRANCH_GET_SPEC_LEVEL_BRANCH_SUCCESS",
    GET_ADDRESS_SUCCESS: "BRANCH_GET_ADDRESS_SUCCESS",
    COUNT_MEMBER_SUCCESS: "COUNT_MEMBER_SUCCESS",
    GET_REPORT_SUCCESS: "BRANCH_GET_REPORT_SUCCESS"
  },
  SHOP: {
    GET_SUCCESS: "SHOP_GET_SUCCESS",
    SET_DETAIL: "SHOP_SET_DETAIL",
    RESET: "SHOP_RESET",
    RESET_FLG_DETAIL: "SHOP_RESET_FLG_DETAIL",
    DELETE_SUCCESS: "SHOP_DELETE_SUCCESS",
    SAVE_SUCCESS: "SHOP_SAVE_SUCCESS",
    RESET_SAVE_SUCCESS: "SHOP_RESET_SAVE_SUCCESS",
    TOGGLE_MODAL: "SHOP_TOGGLE_MODAL"
  },
  EMPLOYEE: {
    INIT: "EMPLOYEE_INIT",
    SAVE_SUCCESS: "EMPLOYEE_SAVE_SUCCESS",
    DELETE_SUCCESS: "EMPLOYEE_DELETE_SUCCESS",
    SHOW_INFO: "EMPLOYEE_SHOW_INFO",
    TOGGLE_MODAL: "EMPLOYEE_TOGGLE_MODAL",
    SET_ROLES_FOR_EMPLOYEE_INFO: "EMPLOYEE_SET_ROLES_FOR_EMPLOYEE_INFO",
    SET_BRANCHES_FOR_EMPLOYEE_INFO: "EMPLOYEE_SET_BRANCHES_FOR_EMPLOYEE_INFO"
  },
  IMPORT: {
    INIT: "IMPORT_INIT",
    SET_SPEC_SELECTION: "IMPORT_SET_SPEC_SELECTION",
    SAVE_SUCCESS: "IMPORT_SAVE_SUCCESS",
    RESET_SAVE_SUCCESS: "IMPORT_RESET_SAVE_SUCCESS",
    SEARCH_SUCCESS: "IMPORT_SEARCH_SUCCESS",
    GET_DETAIL_SUCCESS: "IMPORT_GET_DETAIL_SUCCESS",
    SET_SPEC_SELECTION_WITHOUT_PRODUCT: "IMPORT_SET_SPEC_SELECTION_WITHOUT_PRODUCT",
  },
  PRODUCT: {
    INIT_SUCCESS: "PRODUCT_INIT_SUCCESS",
    SEARCH_SUCCESS: "PRODUCT_SEARCH_SUCCESS",
    SET_PRODUCER: "PRODUCT_SET_PRODUCER",
    SEARCH_PRICE_PRODUCT_SUCCESS: "SEARCH_GET_PRICE_PRODUCT_SUCCESS",
    SEARCH_PRODUCT_ON_STORE_SUCCESS: "SEARCH_PRODUCT_ON_STORE_SUCCESS",
    GET_PRODUCT_BY_ID_SUCCESS: "PRODUCT_GET_PRODUCT_BY_ID_SUCCESS",
    SET_SPEC_UNIT:"PRODUCT_SET_SPEC_UNIT",
    SET_UNIT:"PRODUCT_SET_UNIT"
  },
  REQUEST: {
    SET_PRODUCT: "REQUEST_SET_PRODUCT",
    SET_UNIT: "REQUEST_SET_UNIT",
    SET_AMOUNT_PRODUCT: "REQUEST_SET_AMOUNT_PRODUCT",
    GET_AMOUNT_PRODUCT_SUCCESS: "REQUEST_GET_AMOUNT_PRODUCT_SUCCESS",
    SAVE_SUCCESS: "REQUEST_SAVE_SUCCESS",
    RESET_SAVE_SUCCESS: "REQUEST_RESET_SAVE_SUCCESS",
    SEARCH_SUCCESS: "REQUEST_SEARCH_SUCCESS",
    GET_DETAIL_SUCCESS: "REQUEST_GET_DETAIL_SUCCESS"
  },
  ACCEPT: {
    GET_ALL_BILL_SUCCESS: "ACCEPT_GET_ALL_BILL_SUCCESS",
    GET_DETAIL_SUCCESS: "ACCEPT_GET_DETAIL_SUCCESS",
    ACCEPT_SUCCESS: "ACCEPT_SUCCESS",
    RESULT_NOT_FOUND: "ACCEPT_RESULT_NOT_FOUND"
  },
  EXPORT: {
    GET_PRODUCT_SUCCESS: "EXPORT_GET_PRODUCT_SUCCESS",
    GET_SPEC_UNIT_SUCCESS: "EXPORT_GET_SPEC_UNIT_SUCCESS",
    SET_DETAIL_BILL: "EXPORT_SET_DETAIL_BILL",
    GET_INVENTORY: "EXPORT_GET_INVENTORY",
    DELETE: "DELETE_EXPORT",
    SET_IS_PRINT: "EXPORT_SET_IS_PRINT",
    CLEAR_DETAIL: "EXPORT_CLEAR_DETAIL",
    SEARCH_SUCCESS: "EXPORT_SEARCH_SUCCESS",
    GET_DETAIL_SUCCESS: "EXPORT_GET_DETAIL_SUCCESS"
  },
  SPEC_LEVEL_BRANCH: {
    SAVE_SUCCESS: "SPEC_LEVEL_BRANCH_SAVE_SUCCESS",
    GET_ALL_SUCCESS: "SPEC_LEVEL_BRANCH_GET_ALL_SUCCESS",
    DELETE_SUCCESS: "SPEC_LEVEL_BRANCH_DELETE_SUCCESS"
  },
  SHOP_OF_DIRECTOR: {
    GET_SHOP_SUCCESS: "SHOP_OF_DIRECTOR_GET_SHOP_SUCCESS",
    UPDATE_SUCCESS: "SHOP_OF_DIRECTOR_UPDATE_SUCCESS",
    GET_REPORT_SUCCESS: "SHOP_OF_DIRECTOR_GET_REPORT_SUCCESS"
  },
  EMPLOYEE_OF_BRANCH: {
    GET_ROLE_SUCCESS: "EMPLOYEE_OF_BRANCH_GET_ROLE_SUCCESS",
    SAVE_SUCCESS: "EMPLOYEE_OF_BRANCH_SAVE_SUCCESS",
    GET_ALL_EMPLOYEES_SUCCESS: "EMPLOYEE_OF_BRANCH_GET_ALL_EMPLOYEES_SUCCESS",
    SET_EMPLOYEE: "EMPLOYEE_OF_BRANCH_SET_EMPLOYEE",
    RESET_MODAL: "EMPLOYEE_OF_BRANCH_RESET_MODAL",
    SET_ROLE: "EMPLOYEE_OF_BRANCH_SET_ROLE",
    DELETE_SUCCESS: "EMPLOYEE_OF_BRANCH_DELETE_SUCCESS"
  },
  PRODUCER: {
    GET_ALL_SUCCESS: "PRODUCER_GET_ALL_SUCCESS",
    SAVE_SUCCESS: "PRODUCER_SAVE_SUCCESS"
  },
  SPEC_UNIT: {
    INIT_SUCCESS: "SPEC_UNIT_INIT_SUCCESS",
    SAVE_SUCCESS: "SPEC_UNIT_SAVE_SUCCESS",
    GET_ALL_UNIT: "SPEC_GET_ALL_UNIT",
    GET_ALL_UNIT_SUCCESS: "SPEC_UNIT_GET_ALL_UNIT_SUCCESS",
    SAVE_UNIT_SUCCESS: "SPEC_UNIT_SAVE_UNIT_SUCCESS"
  }
}
