import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { isLogin: false };

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    onLogIn: (state) => {
      state.value.isLogin = true;
    },
    onLogOut: (state) => {
      state.value.isLogin = false;
    },
  },
});

export const { onLogIn, onLogOut } = pageSlice.actions;

export default pageSlice.reducer;
