import * as actionTypes from "../ActionTypes";
import { apiGet, apiPost } from "../axios";

// export const LoginAPI = (payload, dispatch) => {
//   const token = localStorage.getItem("token");
//   return async (dispatch) => {
//     dispatch({
//       type: actionTypes.LOGIN_INIT,
//     });

//     try {
//       const response = await apiPost("login", payload, null);
//       if (response.status === 200) {
//         dispatch({
//           type: actionTypes.LOGIN_SUCCESS,
//           payload: response.data,
//         });
//         generatePopup("success", response?.data?.message);
//         return response.data;
//       } else {
//         dispatch({
//           type: actionTypes.LOGIN_FAIL,
//           payload: response?.data?.message,
//         });
//         return response.data;
//       }
//     } catch (error) {
//       console.log("error", error);
//       if (error?.status === 404) {
//         dispatch({
//           type: actionTypes.LOGIN_FAIL,
//           payload: error?.data?.message,
//         });
//         generatePopup("error", error?.data?.message);
//       } else if (error?.status === 403) {
//         dispatch({
//           type: actionTypes.LOGIN_FAIL,
//           payload: error?.data?.message,
//         });
//         generatePopup("error", error?.data?.message);
//       } else if (error?.status === 400) {
//         dispatch({
//           type: actionTypes.LOGIN_FAIL,
//           payload: error?.data?.message,
//         });
//         generatePopup("error", error?.data?.message);
//       }
//       return error;
//     }
//   };
// };

export const GetUsers = (dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_USER_INIT,
    });

    try {
      const response = await apiGet(`users`);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_USER_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.GET_USER_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      if (error?.status === 401) {
        dispatch({
          type: actionTypes.GET_USER_FAIL,
          payload: error?.data?.message,
        });
      }
      return error;
    }
  };
};
