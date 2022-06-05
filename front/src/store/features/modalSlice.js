import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  isModal: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    onModalOpen: (state, action) => {
      state.value.isModal = action.payload;
    },
    onModalClose: (state) => {
      state.value.isModal = undefined;
    },
  },
});

export const { onModalOpen, onModalClose } = modalSlice.actions;

export default modalSlice.reducer;
