import { createSlice } from '@reduxjs/toolkit';
import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR, SET_PAGE } from '../actions/productsActions';
import { ProductsState } from '../types/Product';

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  take: 1,
  hasNextPage: false,
  hasPreviousPage: false,
  total: 0,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_PRODUCTS_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_PRODUCTS_SUCCESS, (state, action: any) => {
        state.loading = false;
        state.items = action.payload.products;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
        state.total = action.payload.total;
      })
      .addCase(FETCH_PRODUCTS_ERROR, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(SET_PAGE, (state, action:any) => {
        state.page = action.payload;
      });
  },
});

export const { selectProduct } = productsSlice.actions;
export default productsSlice.reducer;
