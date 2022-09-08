import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusedInputName: {},
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    onFocusInput: (state, action) => {
      const { focusedInputName } = state;
      state.focusedInputName = { ...focusedInputName, [action.payload]: true };
    },
    onBlurInput: (state, action) => {
      const { focusedInputName } = state;
      state.focusedInputName = { ...focusedInputName, [action.payload]: false };
    },
  },
});

export const {
  onFocusInput,
  onBlurInput,
} = formSlice.actions;

export default formSlice.reducer;
