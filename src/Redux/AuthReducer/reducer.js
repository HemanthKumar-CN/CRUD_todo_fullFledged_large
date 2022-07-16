import { del, getLocalData, saveData } from "../../utils/localStorage";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actionTypes";

const initState = {
  isAuth: getLocalData("token") ? true : false,
  token: getLocalData("token") || "",
  isLoading: false,
  isError: false,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      saveData("token", payload);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        token: "",
      };
    }
    case LOGOUT: {
      del("token");
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: "",
      };
    }
    default: {
      return state;
    }
  }
};
