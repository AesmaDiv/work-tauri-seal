import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { refreshPressDB, refreshPressHW } from "../configs/cfg_press";
import { refreshPowerDB, refreshPowerHW } from "../configs/cfg_power";


const initialState = {
  is_updated: false,
  test_press: {
    press_top: [],
    press_btm: [],
  },
  test_power: {
    power:  [],
  }
};
const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    resetPoints: (state, action) => {
      console.warn("pointsSlice reseting points", action.payload);
      state[action.payload] = initialState[action.payload];
    },
    updatePress: (state, action) => {
      console.warn("pointsSlice updating PRESS", current(state).test_press);
      state.test_press = refreshPressHW(current(state).test_press, action.payload);
    },
    updatePower: (state, action) => {
      console.warn("pointsSlice updating POWER", state.test_power, action);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(readPress.fulfilled, (state, action) => 
        { state.test_press = action.payload })
      .addCase(readPower.fulfilled, (state, action) => 
        { state.test_power = action.payload})
      .addCase(readPoints.fulfilled, (state, action) =>
        { 
          state.test_press = action.payload.test_press
          state.test_power = action.payload.test_power
        })
  }
});

export const readPress = createAsyncThunk(
  'points/read_press',
  async(record) => await refreshPressDB(record)
);
export const readPower = createAsyncThunk(
  'points/read_power',
  async(record) => await refreshPowerDB(record)
);
export const readPoints = createAsyncThunk(
  'points/read_from_db',
  async(record) => {
    let test_press = await refreshPressDB(record);
    let test_power = await refreshPowerDB(record);

    return { test_press, test_power };
  }
)

export const { resetPoints, updatePress, updatePower } = pointsSlice.actions;
export default pointsSlice.reducer;