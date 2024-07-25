import { combineReducers } from "redux";
import caseReducer from "./caseReducer";

const rootReducer = combineReducers({
  cases: caseReducer,
});

export default rootReducer;
