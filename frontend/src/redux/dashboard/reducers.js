import * as actionTypes from "../ActionTypes";

const initialState = {
    dashboard: [],
};

const store = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ANALYTICS_INIT:
            return {
                ...state,
            };
        case actionTypes.GET_ANALYTICS_SUCCESS:
            return {
                ...state,
                dashboard: action.payload,
            };
        case actionTypes.GET_ANALYTICS_FAIL:
            return {
                ...state,
                error: "",
            };

        default:
            return state;
    }
};

export default store;
