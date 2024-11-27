import * as actionTypes from "../ActionTypes";

const initialState = {
  task: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASK_INIT:
      return {
        ...state,
      };
    case actionTypes.GET_TASK_SUCCESS:
      return {
        ...state,
        task: action.payload,
      };
    case actionTypes.GET_TASK_FAIL:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default taskReducer;
