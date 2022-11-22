import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { helperReadRecord, helperUpdateRecord } from "../database/DatabaseHelper";
import { serializePoints, _serializePowerPoints } from "../database/db_funcs";


const initialState = {
  is_updated: false,
  record: {}
};
const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    writePoints: (state, action) => {
      console.warn("recordSlice updating points", state.record, action);
      let serilized = serializePoints(action.payload.state_name, action.payload.state_value)
      state.record = {...state.record, [action.payload.state_name]: serilized};
      // new_record[action.payload.state_name] = serilized;
      // delete new_record.rawdata;
      // console.warn("New Record %o", new_record);
      // state.record[action.payload.state_name] = serilized;
      // writeRecord(new_record);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(readRecord.fulfilled,  (state, action) => 
        { state.record = action.payload })
      .addCase(writeRecord.fulfilled, (state, action) => 
        { state.is_updated = state.is_updated ^ action.payload})
  }
});

export const readRecord = createAsyncThunk(
  'record/load',
  async(rec_id) => await helperReadRecord(rec_id)
);
export const writeRecord = createAsyncThunk(
  'record/write',
  async(record) => await helperUpdateRecord(record)
);
export const { writePoints } = recordSlice.actions;
export default recordSlice.reducer;