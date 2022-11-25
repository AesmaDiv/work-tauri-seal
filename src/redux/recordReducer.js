import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { helperReadRecord, helperUpdateRecord } from "../database/DatabaseHelper";
import { refreshPressHW } from "../configs/cfg_press";
import { refreshPowerHW } from "../configs/cfg_power";
import { getPointsFromRecord, serializePoints} from "../database/db_funcs";
import { POINTS_STRUCT } from "../database/db_models";

const initialState = {
  is_updated: false,
  record: {},
  points: POINTS_STRUCT
};
const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    writePoints: (state, action) => {
      console.warn("recordSlice updating points", state.record, action);
      const {state_name, state_value} = action.payload;
      let serilized = serializePoints(state_name, state_value)
      state.record[state_name] = serilized;
      _updatePoints(current(state).record);
    },
    resetPoints: (state, action) => {
      console.warn("pointsSlice reseting points", action.payload);
      state.points[action.payload] = initialState.points[action.payload];
    },
    updatePoints: (state, action) => {
      console.warn("pointsSlice updating points",action, current(state).points);
      const {state_name, state_value} = action.payload;
      const refreshFunc = {
        'test_press': refreshPressHW,
        'test_power': refreshPowerHW
      }[state_name]
      state.points[state_name] = refreshFunc(current(state).points[state_name], state_value);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(readRecord.fulfilled,  (state, action) => 
        {
          state.record = action.payload.record;
          state.points = action.payload.points;
        })
      .addCase(writeRecord.fulfilled, (state, action) => 
        {
          state.record = action.payload;
          state.is_updated = !state.is_updated;
        })
  }
});

export const readRecord = createAsyncThunk(
  'record/readRecord',
  async(rec_id) => {
    const record = await helperReadRecord(rec_id);
    const points = await getPointsFromRecord(record);

    return { record, points };
  }
);
export const writeRecord = createAsyncThunk(
  'record/writeRecord',
  async(record) => { 
    const recid = await helperUpdateRecord(record);
    console.warn("writeRecord ID >>", recid);
    record.id = recid;

    return record;
  }
);
export const { writePoints, resetPoints, updatePoints } = recordSlice.actions;
export default recordSlice.reducer;

const _updatePoints = (record) => {
  console.warn("_updatePoints");
  let new_rec = {
    id: record.id,
    test_press: record.test_press,
    test_power: record.test_power
  }
  helperUpdateRecord(new_rec);
}