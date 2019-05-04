const BASE_URI = "http://localhost:8090";
export default {
  GET_ALL_USER: `${BASE_URI}/api/admin/users/get-all`,
  LOGIN: `${BASE_URI}/api/auth/signin`,
  LOGOUT: `${BASE_URI}/api/auth/logout`,
  UPDATE_USER_ROLE: `${BASE_URI}/api/admin/users/update-role`,
  ROLE: {
    GET_ALL_ROLE: `${BASE_URI}/api/admin/roles/get-all`,
    GET_ROLE_FOR_ADMIN: `${BASE_URI}/api/admin/roles/get-role-for-admin`,
    GET_ROLES_BY_ROLES: `${BASE_URI}/api/admin/roles/get-roles-by-roles`,
  },
  USER: {
    SEARCH_USER: `${BASE_URI}/api/admin/users/search`,
    CREATE_ACCOUNT: `${BASE_URI}/api/admin/users/create`,
    GET_USER_LIMIT: `${BASE_URI}/api/admin/users/get-user-limit`,
    DELETE_USER: `${BASE_URI}/api/admin/users/delete`,
  },
  BRANCH: {
    SAVE: `${BASE_URI}/api/branch/save`,
    DELETE: `${BASE_URI}/api/branch/delete`,
    SELECT: `${BASE_URI}/api/branch/select`,
    SELECT_BRANCH_OF_DIRECTOR: `${BASE_URI}/api/branch/select-branch-by-director`,
    COUNT_MEMBER_OF_BRANCH: `${BASE_URI}/api/branch/count-member-of-branch`
  },
  SHOP: {
    SAVE: `${BASE_URI}/api/shop/save`,
    DELETE: `${BASE_URI}/api/shop/delete`,
    SELECT: `${BASE_URI}/api/shop/select`,
    SELECT_ALL: `${BASE_URI}/api/shop/select-all`,
  },
  EMPLOYEE: {
    INIT: `${BASE_URI}/api/employee/init`,
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
    GET_AMOUNT_PRODUCT: `${BASE_URI}/api/product/get-amount-product`,
    GET_UNIT_OF_PRODUCT: `${BASE_URI}/api/product/get-unit-of-product`,
    GET_ALL_PRODUCT_BY_BRANCH: `${BASE_URI}/api/product/get-all-product-by-branch`,
    SEARCH: `${BASE_URI}/api/product/search`,
    SEARCH_PRICE: `${BASE_URI}/api/product/search-price`,
    SEARCH_PRODUCT_ON_STORE:`${BASE_URI}/api/product/search-product-on-store`,
  },
  IMPORT: {
    INIT: `${BASE_URI}/api/import-product/init`,
    SAVE: `${BASE_URI}/api/import-product/save`,
    SEARCH: `${BASE_URI}/api/import-product/search`,
    GET_DETAIL: `${BASE_URI}/api/import-product/get-detail`
  },
  REQUEST: {
    SAVE: `${BASE_URI}/api/request/save`,
    GET_BILL_REQUEST: `${BASE_URI}/api/request/get-bill-request`,
    GET_DETAIL: `${BASE_URI}/api/request/get-detail`,
    ACCEPT: `${BASE_URI}/api/request/accept`,
    CANCEL: `${BASE_URI}/api/request/cancel`,
    SEARCH: `${BASE_URI}/api/request/search`,
  },
  EXPORT: {
    GET_SPEC_UNIT_AND_PRICE_AND_QUANLITY_IN_STORE: `${BASE_URI}/api/export/get-spec-and-unit-and-price-and-quantity-in-store`,
    SAVE: `${BASE_URI}/api/export/save`,
    GET_INVENTORY: `${BASE_URI}/api/export/get-inventory`,
    SEARCH: `${BASE_URI}/api/export/search`,
    GET_DETAIL: `${BASE_URI}/api/export/get-detail`,
  },
  SPEC_LEVEL_BRANCH: {
    SAVE: `${BASE_URI}/api/spec-level-branch/save`,
    GET_ALL: `${BASE_URI}/api/spec-level-branch/get-all`,
    GET_ALL_FOR_SELECTION: `${BASE_URI}/api/spec-level-branch/get-all-for-selection`,
  },
  SHOP_OF_DIRECTOR: {
    GET_SHOP_OF_DIRECTOR: `${BASE_URI}/api/shop/get-shop-of-director`,
    UPDATE_SHOP: `${BASE_URI}/api/shop/save-shop-director`,
    GET_REPORT: `${BASE_URI}/api/shop/get-report-director`,
  },
  EMPLOYEE_OF_BRANCH: {
    GET_ROLES_BY_LEADER: `${BASE_URI}/api/admin/roles/get-roles-for-leader`,
    SAVE_EMPLOYEE: `${BASE_URI}/api/employee/leader-save-employee`,
    GET_ALL_EMPLOYEES: `${BASE_URI}/api/employee/leader-get-all-employees`,
  },
  PRODUCER: {
    GET_ALL: `${BASE_URI}/api/producer/get-all`,
    SAVE: `${BASE_URI}/api/producer/save`,
  }
}
