import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  message: {
    text: '',
    severity: 'success',
  }
};
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      console.warn("messageReducer", action.payload);
      state.message = action.payload;
    },
  },
})

export const { showMessage } = messageSlice.actions;
export default messageSlice.reducer;