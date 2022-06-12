import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModal: { joinTerm: undefined, productReview: false },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    onModalOpen: (state, action) => {
      const { component, isModal } = action.payload;
      state.isModal[component] = isModal;
    },
    onModalClose: (state) => {
      const isModal = { ...state.isModal };
      const openModalName = Object.keys(isModal).find((key) => {
        return !!isModal[key];
      });
      state.isModal[openModalName] = undefined;
    },
  },
});

export const { onModalOpen, onModalClose } = modalSlice.actions;

export default modalSlice.reducer;
