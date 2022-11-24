import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "./recordReducer";
import testingReducer from "./testingReducer";
import messageReducer from "./messageReducer";


export default configureStore({
  reducer: {
    recordReducer,
    testingReducer,
    messageReducer,
  },
});