import * as actionTypes from "../ActionTypes";

const initialState = {
  timelog: [],
};

const timelogReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TIME_LOG_INIT:
      return {
        ...state,
      };
    case actionTypes.GET_TIME_LOG_SUCCESS:
      return {
        ...state,
        timelog: action.payload,
      };
    case actionTypes.GET_TIME_LOG_FAIL:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default timelogReducer;
