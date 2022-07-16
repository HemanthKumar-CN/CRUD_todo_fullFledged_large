import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const register = (payload) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  console.log(payload);
  return axios
    .post(`http://localhost:8080/auth/register`, payload)
    .then((r) => {
      dispatch({ type: REGISTER_SUCCESS, payload: r.data });
      return REGISTER_SUCCESS;
    })

    .catch((err) => {
      dispatch({ type: REGISTER_FAILURE, payload: err });
      return REGISTER_FAILURE;
    });
};

export const login = (params) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post(`http://localhost:8080/auth/login`, params)
    .then((r) => {
      dispatch({ type: LOGIN_SUCCESS, payload: r.data.token });
      return LOGIN_SUCCESS;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE, payload: err });
      return LOGIN_FAILURE;
    });
};
