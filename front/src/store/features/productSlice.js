import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  info: { name: '', brand: '', price: 0 },
  newReview: { score: 0, content: '' },
  reviews: [],
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
  status: 'idle',
  error: null,
};

export const fetchReviews = createAsyncThunk('products/fetchReviews', async (productId) => {
  const response = await axios.post('http://localhost:8888/product/getReviews', {
    productId,
  });
  return response.data.result;
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
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
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = state.reviews.concat(action.payload);
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { commaToPrice, onChangeTextArea, onChangeScore, getReviews } = productSlice.actions;

export default productSlice.reducer;
