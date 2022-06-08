import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { isLogin: false, userId: '', userName: '' };

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    onLogIn: (state, action) => {
      const { userId, userName } = action.payload;
      state.value = { isLogin: true, userId: userId, userName: userName };
    },
    onLogOut: (state) => {
      state.value.isLogin = false;
    },
  },
});

export const { onLogIn, onLogOut } = pageSlice.actions;

export default pageSlice.reducer;
