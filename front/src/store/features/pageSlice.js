import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLogin: false, userId: '', userName: '' };

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    onLogIn: (state, action) => {
      const { userId, userName } = action.payload;
      state = { isLogin: true, userId: userId, userName: userName };
    },
    onLogOut: (state) => {
      state.isLogin = false;
    },
  },
});

export const { onLogIn, onLogOut } = pageSlice.actions;

export default pageSlice.reducer;
