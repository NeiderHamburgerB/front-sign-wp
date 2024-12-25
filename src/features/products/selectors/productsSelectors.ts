import { RootState } from "../../../app/store";

export const selectProducts = (state: RootState) => state.products.items;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;
export const selectPagination = (state: RootState) => ({
  page: state.products.page,
  take: state.products.take,
  hasNextPage: state.products.hasNextPage,
  hasPreviousPage: state.products.hasPreviousPage,
});
