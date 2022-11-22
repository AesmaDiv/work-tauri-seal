import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "./recordReducer";
import testingReducer from "./testingReducer";
import pointsReducer from "./pointsReducer";


export default configureStore({
  reducer: {
    recordReducer,
    testingReducer,
    pointsReducer,
  },
});