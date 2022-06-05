import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './features/pageSlice';
import formReducer from './features/formSlice';
import modalReducer from './features/modalSlice';
import saleReducer from './features/saleSlice';

export default configureStore({
  reducer: {
    page: pageReducer,
    form: formReducer,
    modal: modalReducer,
    sale: saleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['form/onChangeInput'],
      },
    }),
});
