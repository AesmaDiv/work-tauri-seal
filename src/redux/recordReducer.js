import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { helperReadRecord, helperUpdateRecord, helperDeleteRecord,
         helperReadSealTypes, helperReadDictionary } from "../database/DatabaseHelper";
import { refreshPressHW } from "../shared/cfg_press";
import { refreshPowerHW } from "../shared/cfg_power";
import { getPointsFromRecord, serializePoints} from "../database/db_funcs";
import { POINTS_STRUCT, SEALTYPE } from "../database/db_models";

const initialState = {
  is_updated: false,
  record: {},
  points: POINTS_STRUCT,

  sealtypes: [],
  // producers: [],
  current_type: SEALTYPE,
};
const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    resetRecord: (state) => {
      // console.warn("recordReducer >> reseting record");
      state.record = initialState.record;
      state.points = initialState.points;
      state.current_type = initialState.current_type;
    },
    setCurrentType: (state, action) => {
      // console.warn("recordReducer >> setting current type", action.payload);
      const current_type = current(state).sealtypes.find(el => el.id === action.payload);
      state.current_type = current_type;
    },
    writePoints: (state, action) => {
      // console.warn("recordReducer >> updating points", state.record, action);
      const points_name = action.payload;
      let serilized = serializePoints(points_name, current(state).points[points_name])
      state.record[points_name] = serilized;
      _updatePoints(current(state).record);
    },
    resetPoints: (state, action) => {
      // console.warn("recordReducer >> reseting points", action.payload);
      state.points[action.payload] = initialState.points[action.payload];
    },
    updatePoints: (state, action) => {
      // console.warn("recordReducer >> updating points",action, current(state).points);
      const {state_name, state_value} = action.payload;
      const refreshFunc = {
        'test_press': refreshPressHW,
        'test_power': refreshPowerHW
      }[state_name]
      state.points[state_name] = refreshFunc(current(state).points[state_name], state_value);
    },
  },
  extraReducers(builder) { builder
    .addCase(readDictionaries.fulfilled, (state, action) => {
      state.sealtypes = action.payload;
    })
    .addCase(readRecord.fulfilled, (state, action) => 
    {
      // console.warn("recordReducer >> reading record");
      state.record = action.payload.record;
      state.points = action.payload.points;
      state.current_type = state.sealtypes.find(el => el.id === state.record.sealtype) || SEALTYPE;
    })
    .addCase(writeRecord.fulfilled, (state, action) => 
    {
      state.record = action.payload;
      state.is_updated = !state.is_updated;
    })
    .addCase(deleteRecord.pending, (state) =>
    {
      state.record = initialState.record;
      state.points = initialState.points;
    })
  }
});

export const readDictionaries = createAsyncThunk(
  'record/readDictionaries',
  async() => await helperReadSealTypes()
);
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
export const deleteRecord = createAsyncThunk(
  'record/deleteRecord',
  async(record) => {
    await helperDeleteRecord(record);
    resetRecord();
  }
);
export const { resetRecord, setCurrentType, writePoints, resetPoints, updatePoints } = recordSlice.actions;
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