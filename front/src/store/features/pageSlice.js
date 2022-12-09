import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false, userId: '', userName: '' };

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    onLogIn: (state, action) => {
      return { isLoggedIn: true, ...action.payload };
    },
    onLogOut: () => initialState,
  },
});

export const { onLogIn, onLogOut } = pageSlice.actions;

export default pageSlice.reducer;
