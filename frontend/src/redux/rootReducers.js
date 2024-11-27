import { combineReducers } from "redux";
import userReducer from "./user/reducers";
import dashboardReducer from "./dashboard/reducers";
import projectReducer from "./project/reducers";
import taskReducer from "./task/reducers";
import timelogReducer from "./timeLog/reducers";

const rootReducer = combineReducers({
  User: userReducer,
  Dashboard: dashboardReducer,
  Project: projectReducer,
  Task: taskReducer,
  Timelog: timelogReducer,
});

export default rootReducer;
