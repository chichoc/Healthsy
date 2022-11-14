import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedNav: { nutrient: [], brand: [], func: [] },
  sort: 'latest',
  countUnit: 9,
};

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
    onSelectCountUnit: (state, action) => {
      state.countUnit = action.payload;
    },
    onSelectSort: (state, action) => {
      state.sort = action.payload;
    },
    },
    },
  },
});

export const { onSelectNav, onSelectAllNav, onSelectCountUnit, onSelectSort } = saleSlice.actions;

export default saleSlice.reducer;
