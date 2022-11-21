import { combineReducers } from "redux";

import { recordReducer } from "./reducers/recordReducer";


export const rootReducer = combineReducers({
  record: recordReducer,
});