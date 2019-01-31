const BASE_URI = "http://localhost:8090";

export const ACTION_TYPES = {
  GET_ALL_USER: "GET_ALL_USER",
  GET_ALL_USER_SUCCESS: "GET_ALL_USER_SUCCESS",
  GET_ALL_USER_HAS_ERRORED: "GET_ALL_USER_HAS_ERRORED",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_HAS_ERRORED: "LOGIN_HAS_ERRORED"
}
export const LOCAL_STORAGE = {
  ACCESS_KEY : "ACCESS_KEY",
  IS_LOGIN : "IS_LOGIN"
}
export const API = {
  GET_ALL_USER: `${BASE_URI}/api/admin/users/getAll`,
  LOGIN: `${BASE_URI}/api/auth/signin`
}
export const BEARSER = "BEARSER "
