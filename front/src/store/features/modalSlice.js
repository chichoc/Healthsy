import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  isModal: { joinTerm: undefined, productReview: false },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    onModalOpen: (state, action) => {
      const { component, isModal } = action.payload;
      state.value.isModal[component] = isModal;
    },
    onModalClose: (state) => {
      const isModal = { ...state.value.isModal };
      const openModalName = Object.keys(isModal).filter((key) => {
        return !!isModal[key];
      });
      state.value.isModal[openModalName[0]] = undefined;
    },
  },
});

export const { onModalOpen, onModalClose } = modalSlice.actions;

export default modalSlice.reducer;
