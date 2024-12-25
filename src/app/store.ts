import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import checkoutReducer from '../features/checkout/reducers/checkoutSlice';
import productsReducer from '../features/products/reducers/productsSlice';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root', 
  storage,
};

const rootReducer = combineReducers({
  products: productsReducer,
  checkout: checkoutReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
