import axios from "axios";
import {
  ADD_SUBTASKS_FAILURE,
  ADD_SUBTASKS_REQUEST,
  ADD_SUBTASKS_SUCCESS,
  DELETE_SUBTASKS_FAILURE,
  DELETE_SUBTASKS_REQUEST,
  DELETE_SUBTASKS_SUCCESS,
  GET_TASKS_FAILURE,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  UPDATE_TASKS_FAILURE,
  UPDATE_TASKS_REQUEST,
  UPDATE_TASKS_SUCCESS,
} from "./actionTypes";

export const getTasks = () => (dispatch) => {
  dispatch({ type: GET_TASKS_REQUEST });
  return axios
    .get(`http://localhost:8081/tasks`)
    .then((r) => {
      dispatch({ type: GET_TASKS_SUCCESS, payload: r.data });
      return GET_TASKS_SUCCESS;
    })
    .catch((err) => {
      dispatch({ type: GET_TASKS_FAILURE, payload: err });
      return GET_TASKS_FAILURE;
    });
};

export const updateTasks = (id, payload) => (dispatch) => {
  dispatch({ type: UPDATE_TASKS_REQUEST });
  return axios
    .patch(`http://localhost:8081/tasks/${id}`, payload)
    .then((r) => {
      dispatch({ type: UPDATE_TASKS_SUCCESS, payload: r.data });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_TASKS_FAILURE, payload: err });
    });
};

export const addSubTasks = (id, payload) => (dispatch) => {
  dispatch({ type: ADD_SUBTASKS_REQUEST });

  return axios
    .patch(`http://localhost:8081/tasks/${id}`, payload)
    .then((r) => {
      dispatch({ type: ADD_SUBTASKS_SUCCESS, payload: r.data });
    })
    .catch((err) => dispatch({ type: ADD_SUBTASKS_FAILURE, payload: err }));
};

export const deleteSubtasks = (id, payload) => (dispatch) => {
  dispatch({ type: DELETE_SUBTASKS_REQUEST });
  return axios
    .patch(`http://localhost:8081/tasks/${id}`, payload)
    .then((r) => dispatch({ type: DELETE_SUBTASKS_SUCCESS, payload: r.data }))
    .catch((err) => dispatch({ type: DELETE_SUBTASKS_FAILURE, payload: err }));
};
