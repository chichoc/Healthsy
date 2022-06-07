import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './features/pageSlice';
import formReducer from './features/formSlice';
import modalReducer from './features/modalSlice';
import saleReducer from './features/saleSlice';
import productReducer from './features/productSlice';

export default configureStore({
  reducer: {
    page: pageReducer,
    form: formReducer,
    modal: modalReducer,
    sale: saleReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['form/onChangeInput'],
      },
    }),
});
