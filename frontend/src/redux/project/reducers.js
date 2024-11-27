import * as actionTypes from "../ActionTypes";

const initialState = {
  project: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROJECT_INIT:
      return {
        ...state,
      };
    case actionTypes.GET_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
      };
    case actionTypes.GET_PROJECT_FAIL:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default projectReducer;
