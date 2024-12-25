import React, { useEffect } from "react";
import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError,
  setPage,
} from "../actions/productsActions";

import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectError,
  selectLoading,
  selectPagination,
  selectProducts,
} from "../selectors/productsSelectors";
import { Menu } from "../../../shared/components/menu";

export const API_URL = import.meta.env.VITE_API_MAIN || 'http://localhost:3000/api/main';

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const { page, take, hasNextPage, hasPreviousPage } =
    useAppSelector(selectPagination);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(fetchProductsPending());
        const response = await fetch(
          `${API_URL}/products?page=${page}&take=${take}`
        );
        const data = await response.json();
        dispatch(
          fetchProductsSuccess({
            products: data.data,
            hasNextPage: data.meta.hasNextPage,
            hasPreviousPage: data.meta.hasPreviousPage,
            total: data.meta.total,
          })
        );
      } catch (err) {
        dispatch(fetchProductsError("Error al cargar productos"));
      }
    };

    fetchProducts();
  }, [dispatch, page, take]);

  const handlePrevious = () => {
    if (hasPreviousPage) dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    if (hasNextPage) dispatch(setPage(page + 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <div className="flex-grow max-w-md mx-auto p-4 flex flex-col items-center">
        {loading && <p className="text-center mt-4">Cargando productos...</p>}
        {error && <p className="text-center mt-4 text-red-300">{error}</p>}
        {!loading && !error && (
          <>
            <h2>Productos Disponibles</h2>
            <div className="grid grid-cols-1 gap-4 w-full">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </>
        )}
      </div>
    </div>
  );
};
