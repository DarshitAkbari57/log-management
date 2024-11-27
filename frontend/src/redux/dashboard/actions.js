import { generatePopup } from "../../utility/popup";
import * as actionTypes from "../ActionTypes";
import { apiGet } from "../axios";

export const Getdashboard = (dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ANALYTICS_INIT,
    });

    try {
      const response = await apiGet(`dashboard/analytics`);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_ANALYTICS_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.GET_ANALYTICS_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      if (error?.status === 401) {
        dispatch({
          type: actionTypes.GET_ANALYTICS_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};
