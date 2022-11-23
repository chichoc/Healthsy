import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  info: {},
  // id: '',
  // brand: '',
  // price: '',
  // raw_material: '',
  // stock: '',
  // LCNS_NO: '',
  // BSSH_NM: '',
  // PRDLST_REPORT_NO: '',
  // PRDLST_NM: '',
  // PRMS_DT: '',
  // POG_DAYCNT: '',
  // DISPOS: '',
  // NTK_MTHD: '',
  // PRIMARY_FNCLTY: '',
  // IFTKN_ATNT_MATR_CN: '',
  // CSTDY_MTHD: '',
  // STDR_STND: '',
  // CRAWMTRL_NM: '',
  // CRET_DTM: '',
  // LAST_UPDT_DTM: '',
  // PRDT_SHAP_CD_NM: '',
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
  fetch: { sortOfReviews: 'latest', typeOfReviews: '' },
  count: { numberOfReviews: 0, avgScoreOfReviews: 0 },
  status: { product: 'idle', reviews: 'idle' },
  error: null,
};
export const fetchProduct = createAsyncThunk('products/fetchProduct', async (productId) => {
  const { data } = await axios.post('http://localhost:8888/product/fetchProduct', {
    productId,
  });
  return data[0];
});

export const fetchReviews = createAsyncThunk(
  'products/fetchReviews',
  async ({ productId, currentPage, pageNumDiffer, sort }, { getState }) => {
    let cursorIdx = '';
    if (currentPage !== 1) {
      cursorIdx = pageNumDiffer > 0 ? getState().product.reviews[9].id : getState().product.reviews[0].id;
    }
    const { data } = await axios.post('http://localhost:8888/product/fetchReviews', {
      productId,
      cursorIdx,
      pageNumDiffer,
      sort,
    });
    return data;
  }
);

export const addReviewThumbs = createAsyncThunk(
  'products/addReviewThumbs',
  async ({ reviewId, typeOfThumbs, capitalizedTypeOfThumbs, sign }) => {
    const { data } = await axios.post('http://localhost:8888/product/addReviewThumbs', {
      reviewId,
      typeOfThumbs,
      capitalizedTypeOfThumbs,
      sign,
    });
    return { ...data[0], capitalizedTypeOfThumbs };
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    onSelectSort: (state, action) => {
      state.fetch.sortOfReviews = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.status.product = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status.product = 'succeeded';
        const { count, score } = action.payload;
        state.info = { ...action.payload };
        state.count = { numberOfReviews: count, avgScoreOfReviews: score };
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status.product = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchReviews.pending, (state, action) => {
        state.status.reviews = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status.reviews = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status.reviews = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReviewThumbs.fulfilled, (state, action) => {
        const { id, capitalizedTypeOfThumbs } = action.payload;
        const changedThumbsName = `thumbs${capitalizedTypeOfThumbs}`;
        const updateIndex = state.reviews.find((review) => review.id === id);
        updateIndex[changedThumbsName] = action.payload[changedThumbsName];
      });
  },
});

export const { onSelectSort } = productSlice.actions;

export default productSlice.reducer;
