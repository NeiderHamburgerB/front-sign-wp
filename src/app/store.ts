import { configureStore } from '@reduxjs/toolkit';
import checkoutReducer from '../features/checkout/reducers/checkoutSlice';
import productsReducer from '../features/products/reducers/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
