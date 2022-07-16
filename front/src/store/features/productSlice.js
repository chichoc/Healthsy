import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  info: {},
  reviews: [],
  // {
  //   id: '',
  //   user: '',
  //   score:'',
  //   content: '',
  //   photo:'',
  //   date: '',
  //   thumbsUp: 0,
  //   thumbsDown: 0,
  // },
  fetch: { sort: '', type: '' },
  count: { reviews: undefined, score: 0 },
  status: { product: 'idle', reviews: 'idle', count: 'idle' },
  error: null,
};
export const fetchProduct = createAsyncThunk('products/fetchProduct', async (productId) => {
  const response = await axios.post('http://localhost:8888/product/fetchProduct', {
    productId,
  });
  return response.data[0];
});

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
    return response.data;
  }
);

export const countReviews = createAsyncThunk('products/countReviews', async (productId) => {
  const response = await axios.post('http://localhost:8888/product/countReviews', {
    productId,
  });
  return response.data.result;
});

export const addReviewThumbs = createAsyncThunk('products/addReviewThumbs', async ({ reviewId, thumbs, sign }) => {
  const response = await axios.post('http://localhost:8888/product/addReviewThumbs', {
    reviewId,
    thumbs,
    sign,
  });
  return response.data.rows;
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state, action) => {
        state.status.reviews = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status.reviews = 'succeeded';
        state.reviews = [...action.payload];
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status.reviews = 'failed';
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
      })
      .addCase(addReviewThumbs.fulfilled, (state, action) => {
        if (action.payload[0]) {
          const { id, thumbsUp } = action.payload[0];
          const updateIndex = state.reviews.findIndex((review) => review.id === id);
          state.reviews[updateIndex].thumbsUp = thumbsUp;
        }
      })
      .addCase(fetchProduct.pending, (state, action) => {
        state.status.product = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status.product = 'succeeded';
        state.info = { ...action.payload };
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status.product = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
