import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "../types/Product";
import { useAppDispatch } from "../../../app/hooks";
import { useImageLoader } from "../../../hooks/useImageLoader";
import { selectProduct } from "../reducers/productsSlice";


export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const imgUrl = product.image || "https://via.placeholder.com/150";

  const loaded = useImageLoader(imgUrl);
  const [quantity, setQuantity] = useState(1);
  const handleSelect = () => {
    dispatch(selectProduct({ ...product, quantity }));
    navigate("/checkout");
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), 1); 
    setQuantity(value);
  };

  return (
    <div className="bg-white text-gray-800 rounded p-4 shadow-md flex flex-col items-center">
      {!loaded ? (
        <div className="w-full h-32 bg-gray-200 animate-pulse mb-2" />
      ) : (
        <img src={imgUrl} alt={product.name} className="w-full h-auto mb-2" />
      )}

      <h4 className="font-bold">{product.name}</h4>
      <p className="mb-2">
      Precio: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(Number(product.price))}
      </p>
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="quantity" className="text-sm font-semibold">
          Cantidad:
        </label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 p-2 border border-gray-300 rounded text-center"
        />
      </div>
      <button
        onClick={handleSelect}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Comprar
      </button>
    </div>
  );
};
