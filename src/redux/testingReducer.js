import { createSlice } from "@reduxjs/toolkit";


const initialState = { 
  is_reading: false,
  test_press: false,
  test_power: false
};
const testingSlice = createSlice({
  name: 'testing',
  initialState,
  reducers: {
    switchReading: (state, action) => {
      state.is_reading = action.payload;
    },
    switchTesting:   (state, action) => {
      state[action.payload.state_name] = action.payload.state_value;
    },
  },
})

export const { switchReading, switchTesting } = testingSlice.actions;
export default testingSlice.reducer;