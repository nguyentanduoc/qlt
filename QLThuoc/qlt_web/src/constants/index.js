import api from './api';
import actionType from './actionType';
export const API = api;
export const ACTION_TYPES = actionType;

const BASE_URI = "http://localhost:8090";

export const LOCAL_STORAGE = {
  ACCESS_KEY: "ACCESS_KEY",
  IS_LOGIN: "IS_LOGIN"
}

export const ROLES = {
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_DIRECTOR: "ROLE_DIRECTOR",
  ROLE_LEADER: "ROLE_LEADER",
  ROLE_EMPLOYEE_IMPORT: "ROLE_EMPLOYEE_IMPORT",
  ROLE_EMPLOYEE_EXPORT: "ROLE_EMPLOYEE_EXPORT",
  ROLE_MARKETING: "ROLE_MARKETING",
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
