import { apiGet, apiPost, apiPut } from "../axios";
import * as actionTypes from "../ActionTypes";
import { generatePopup } from "../../utility/popup";

export const createTask = (payload, dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_TASK_INIT,
    });

    try {
      const response = await apiPost("tasks/add", payload);
      if (response.status === 201) {
        dispatch({
          type: actionTypes.ADD_TASK_SUCCESS,
          payload: response.data,
        });
        generatePopup("success", response?.data?.message);
        return response.data;
      } else {
        dispatch({
          type: actionTypes.ADD_TASK_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      if (error?.status === 404) {
        dispatch({
          type: actionTypes.ADD_TASK_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 403) {
        dispatch({
          type: actionTypes.ADD_TASK_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 400) {
        dispatch({
          type: actionTypes.ADD_TASK_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};

export const GetTask = (payload, dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_TASK_INIT,
    });

    try {
      const response = await apiGet("tasks");
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_TASK_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.GET_TASK_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      if (error?.status === 401) {
        dispatch({
          type: actionTypes.GET_TASK_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};

export const UpdateSaleTask = (payload, dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_TASK_INIT,
    });

    try {
      const response = await apiPut(
        `tasks/${payload?.id}`,
        payload?.data,
      );
      if (response.status === 200) {
        dispatch({
          type: actionTypes.UPDATE_TASK_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.UPDATE_TASK_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      if (error?.status === 404) {
        dispatch({
          type: actionTypes.UPDATE_TASK_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 401) {
        dispatch({
          type: actionTypes.UPDATE_TASK_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};

export const createTimeLog = (payload, dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_TIME_LOG_INIT,
    });

    try {
      const response = await apiPost("timelogs/add", payload);
      if (response.status === 201) {
        dispatch({
          type: actionTypes.ADD_TIME_LOG_SUCCESS,
          payload: response.data,
        });
        generatePopup("success", response?.data?.message);
        return response.data;
      } else {
        dispatch({
          type: actionTypes.ADD_TIME_LOG_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      if (error?.status === 404) {
        dispatch({
          type: actionTypes.ADD_TIME_LOG_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 403) {
        dispatch({
          type: actionTypes.ADD_TIME_LOG_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 400) {
        dispatch({
          type: actionTypes.ADD_TIME_LOG_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};