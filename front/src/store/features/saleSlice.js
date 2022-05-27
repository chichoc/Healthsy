import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  selectedNav: { nutrient: [], brand: [], func: [] },
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
  },
});

export const { onSelectNav, onSelectAllNav } = saleSlice.actions;

export default saleSlice.reducer;
