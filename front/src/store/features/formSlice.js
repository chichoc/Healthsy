import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusedInputName: {},
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    showInputLabel: (state, action) => {
      const { focusedInputName } = state;
      state.focusedInputName = { ...focusedInputName, [action.payload]: true };
    },
    hideInputLabel: (state, action) => {
      const { focusedInputName } = state;
      state.focusedInputName = { ...focusedInputName, [action.payload]: false };
    },
  },
});

export const { showInputLabel, hideInputLabel } = formSlice.actions;

export default formSlice.reducer;
