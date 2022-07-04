import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  info: { name: '', brand: '', price: 0 },
  newReview: { score: 0, content: '' },
  reviews: [],
  // {
  //   id: '',
  //   score:'',
  //   content: '',
  //   user: '',
  //   date: '',
  //   reactions: {
  //     thumbsUp: 0,
  //     thumbsDown: 0,
  //   },
  // },
  fetch: { sort: '', type: '' },
  count: { reviews: undefined, score: 0 },
  status: { fetch: 'idle', count: 'idle' },
  error: null,
};

export const fetchReviews = createAsyncThunk(
  'products/fetchReviews',
  async ({ productId, currentPage, pageNumDiffer }, { getState }) => {
    let cursorIdx = '';
    if (currentPage !== 1) {
      cursorIdx = pageNumDiffer > 0 ? getState().product.reviews[9].id : getState().product.reviews[0].id;
    }
    const response = await axios.post('http://localhost:8888/product/fetchReviews', {
      productId,
      cursorIdx,
      pageNumDiffer,
    });
    return response.data.result;
  }
);

export const countReviews = createAsyncThunk('products/countReviews', async (productId) => {
  const response = await axios.post('http://localhost:8888/product/countReviews', {
    productId,
  });
  return response.data.result;
});

export const addReviewsThumbs = createAsyncThunk('products/addReviewsThumbs', async (reviewId, thumbs) => {
  const response = await axios.post('http://localhost:8888/product/addReviewsThumbs', {
    reviewId,
    thumbs,
  });
  return response.data.result;
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
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
        state.status.fetch = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status.fetch = 'succeeded';
        state.reviews = [...action.payload];
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status.fetch = 'failed';
        state.error = action.error.message;
      })
      .addCase(countReviews.pending, (state, action) => {
        state.status.count = 'loading';
      })
      .addCase(countReviews.fulfilled, (state, action) => {
        const { reviews, score } = action.payload[0];
        state.status.count = 'succeeded';
        state.count.reviews = reviews;
        state.count.score = score;
      })
      .addCase(countReviews.rejected, (state, action) => {
        state.status.count = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { commaToPrice, onChangeTextArea, onChangeScore } = productSlice.actions;

export default productSlice.reducer;
