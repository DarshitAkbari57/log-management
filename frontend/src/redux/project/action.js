import { apiGet, apiPost } from "../axios";
import * as actionTypes from "../ActionTypes";
import { generatePopup } from "../../utility/popup";

export const createProject = (payload, dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_PROJECT_INIT,
    });

    try {
      const response = await apiPost("projects/add", payload);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.ADD_PROJECT_SUCCESS,
          payload: response.data,
        });
        generatePopup("success", response?.data?.message);
        return response.data;
      } else {
        dispatch({
          type: actionTypes.ADD_PROJECT_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      if (error?.status === 400) {
        dispatch({
          type: actionTypes.ADD_PROJECT_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 401) {
        dispatch({
          type: actionTypes.ADD_PROJECT_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};

export const getProject = (payload, dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_PROJECT_INIT,
    });

    try {
      const response = await apiGet("projects");
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_PROJECT_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.GET_PROJECT_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      if (error?.status === 401) {
        dispatch({
          type: actionTypes.GET_PROJECT_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};
