import { apiGet, apiPost } from "../axios";
import * as actionTypes from "../ActionTypes";
import { generatePopup } from "../../utility/popup";

export const GetTimeLog = (payload, dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_TIME_LOG_INIT,
    });

    try {
      const response = await apiGet("timelogs");
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_TIME_LOG_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.GET_TIME_LOG_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      if (error?.status === 401) {
        dispatch({
          type: actionTypes.GET_TIME_LOG_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};
