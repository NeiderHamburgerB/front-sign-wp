import { Product } from "../types/Product";


export const FETCH_PRODUCTS_PENDING = "FETCH_PRODUCTS_PENDING";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const SET_PAGE = 'SET_PAGE';
export const fetchProductsPending = () => ({
  type: FETCH_PRODUCTS_PENDING,
});

export const fetchProductsSuccess = (payload: {
  products: Product[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  total: number;
}) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload,
});

export const fetchProductsError = (error: string) => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error,
});

export const setPage = (page: number) => ({
  type: SET_PAGE,
  payload: page,
});
