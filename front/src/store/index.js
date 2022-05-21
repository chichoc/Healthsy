import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './features/page';
import joinReducer from './features/join';

export default configureStore({
  reducer: {
    page: pageReducer,
    join: joinReducer,
  },
});
