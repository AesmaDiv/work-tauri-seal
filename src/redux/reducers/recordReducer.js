import { READ_RECORD, WRITE_RECOCR } from "../types";


const initialState = {
  record: {}
}

export const recordReducer = (state = initialState, action) => {
  switch (action) {
    case READ_RECORD: {
      console.log("recordReducer READ");
      return state;
    }
    case WRITE_RECOCR: {
      console.log("recordReducer WRITE");
      return state;
    }
    default:
      return state;
  }
};