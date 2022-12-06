import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedNav: { nutrient: [], brand: [], func: [] },
  sort: 'latest',
  countUnit: 9,
  search: { bar: false, word: '' },
};

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    handleNav: (state, action) => {
      const { navName, category } = action.payload;
      const { selectedNav } = state;
      const navNamesChanged = selectedNav[category].includes(navName)
        ? selectedNav[category].filter((name) => name !== navName)
        : [...selectedNav[category], navName];

      selectedNav[category] = navNamesChanged;
    },
    removeNav: (state, action) => {
      state.selectedNav[action.payload] = [];
    },
    onSelectCountUnit: (state, action) => {
      state.countUnit = action.payload;
    },
    onSelectSort: (state, action) => {
      state.sort = action.payload;
    },
    handleSearchBar: (state, action) => {
      state.search.bar = !state.search.bar;
    },
    changeSearchWord: (state, action) => {
      state.search.word = action.payload;
    },
    },
  },
});

export const { handleNav, removeNav, onSelectCountUnit, onSelectSort, handleSearchBar, changeSearchWord } =
  saleSlice.actions;

export default saleSlice.reducer;
