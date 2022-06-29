import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  selectedNav: { nutrient: [], brand: [], func: [] },
  fetchApi: { data: [], countUnit: 20, startIdx: 1 },
  showApi: { data: [], countUnit: 9, pageNum: 0 },
  status: 'idle',
};

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (productId) => {
  const response = await axios.post('http://localhost:8888/product/fetchProduct', {
    productId,
  });
  return response.data;
});

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    onSelectNav: (state, action) => {
      const { navName, category } = action.payload;
      const { selectedNav } = state;

      const removeOrAddNavName = selectedNav[category].includes(navName)
        ? selectedNav[category].filter((name) => name !== navName)
        : selectedNav[category].length < 4
        ? [...selectedNav[category], navName]
        : [...selectedNav[category]];

      state.selectedNav[category] = removeOrAddNavName;
    },
    onSelectAllNav: (state, action) => {
      const { category } = action.payload;
      const { selectedNav } = state;
      selectedNav[category].length !== 0 && (state.selectedNav[category] = []);
    },
    resetFetchApi: (state, action) => {
      state.fetchApi.data = [...action.payload];
    },
    addFetchApi: (state, action) => {
      const { data } = state.fetchApi;
      state.fetchApi.data = [...data, ...action.payload];
      state.fetchApi.startIdx += 20;
    },
    addShowApi: (state, action) => {
      const { showStartIdx, showEndIdx } = action.payload;
      const showApiData = state.showApi.data;
      const fetchApiData = state.fetchApi.data;
      state.showApi.data = [...showApiData, ...fetchApiData.slice(showStartIdx, showEndIdx + 1)];
    },
    addPageNum: (state) => {
      const pageNum = state.showApi.pageNum;
      state.showApi.pageNum = pageNum + 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.showApi.data = [...action.payload];
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { onSelectNav, onSelectAllNav, resetFetchApi, addFetchApi, addShowApi, addPageNum } = saleSlice.actions;

export const showApiData = () => (dispatch, getState) => {
  const { countUnit, pageNum } = getState().sale.showApi;
  const showStartIdx = countUnit * (pageNum - 1);
  const showEndIdx = countUnit * pageNum - 1;
  dispatch(addShowApi({ showStartIdx, showEndIdx }));
};

export default saleSlice.reducer;
