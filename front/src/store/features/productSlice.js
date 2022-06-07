import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { info: { name: '', brand: '', price: 0 }, review: { score: 0, content: '' } };

export const saleSlice = createSlice({
  name: 'sale',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    commaToPrice: (state, action) => {
      if (state.value.price < 1000) return state.value.price;
      return state.value.price.toLocaleString();
    },
    onChangeTextArea: (state, action) => {
      const { review } = state.value.review;
      state.value.review = { ...review, content: action.payload };
    },
    onChangeScore: (state, action) => {
      const { review } = state.value.review;
      state.value.review = { ...review, score: action.payload };
    },
  },
});

export const { commaToPrice, onChangeTextArea, onChangeScore } = saleSlice.actions;

export default saleSlice.reducer;
