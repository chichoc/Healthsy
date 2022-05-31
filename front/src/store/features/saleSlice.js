import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  selectedNav: { nutrient: [], brand: [], func: [] },
  fetchApi: { data: [], startIdx: '', endIdx: '' },
  showApi: { data: [], countUnit: 9, pageNum: 1 },
};

export const saleSlice = createSlice({
  name: 'sale',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    onSelectNav: (state, action) => {
      const { navName, category } = action.payload;
      const { selectedNav } = state.value;

      const removeOrAddNavName = selectedNav[category].includes(navName)
        ? selectedNav[category].filter((name) => name !== navName)
        : selectedNav[category].length < 4
        ? [...selectedNav[category], navName]
        : [...selectedNav[category]];

      state.value.selectedNav[category] = removeOrAddNavName;
    },
    onSelectAllNav: (state, action) => {
      const { category } = action.payload;
      const { selectedNav } = state.value;
      selectedNav[category].length !== 0 && (state.value.selectedNav[category] = []);
    },
    addFetchApi: (state, action) => {
      state.value.fetchApi.data = [...action.payload];
    },
    addShowApi: (state, action) => {
      const showApiData = state.value.showApi.data;
      const fetchApiData = state.value.fetchApi.data;
      for (let i of action.payload) {
        state.value.showApi.data = [...showApiData, fetchApiData[i]];
      }
    },
    addPageNum: (state) => {
      const pageNum = state.value.showApi.pageNum;
      state.value.showApi.pageNum = pageNum + 1;
    },
  },
});

export const { onSelectNav, onSelectAllNav, addFetchApi, addShowApi, addPageNum } = saleSlice.actions;

const range = (start, stop, step) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
};

export const showApiData = () => async (dispatch, getState) => {
  const { countUnit, pageNum } = getState().sale.value.showApi;
  const showStartIdx = countUnit * (pageNum - 1);
  const showEndIdx = countUnit * pageNum - 1;
  const rangeArray = range(showStartIdx, showEndIdx, 1);
  dispatch(addShowApi(rangeArray));
};

export default saleSlice.reducer;
