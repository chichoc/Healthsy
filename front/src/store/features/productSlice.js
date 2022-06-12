import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: { name: '', brand: '', price: 0 },
  newReview: { score: 0, content: '' },
  reviews: [
    // {
    //   id: '',
    //   content: '',
    //   user: '',
    //   date: '',
    //   reactions: {
    //     thumbsUp: 0,
    //     thumbsDown: 0,
    //   },
    // },
  ],
};

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    getReviews: (state, action) => {
      console.log(action.payload);
      state.reviews = [...action.payload];
    },
    commaToPrice: (state, action) => {
      if (state.price < 1000) return state.price;
      return state.price.toLocaleString();
    },
    onChangeTextArea: (state, action) => {
      const { newReview } = state;
      state.newReview = { ...newReview, content: action.payload };
    },
    onChangeScore: (state, action) => {
      const { newReview } = state;
      state.newReview = { ...newReview, score: action.payload };
    },
  },
});

export const { commaToPrice, onChangeTextArea, onChangeScore, getReviews } = saleSlice.actions;

export default saleSlice.reducer;
