import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createPayment } from '../actions/checkoutActions';
import { Menu } from '../../../shared/components/menu';

export const SummaryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, cardData, deliveryData } = useAppSelector((state) => state.checkout);
  const { selectedProduct } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!selectedProduct || !cardData) {
      navigate('/');
    }
  }, [selectedProduct, cardData, navigate]);

  const handlePay = async () => {
    await dispatch(createPayment()).unwrap();
    navigate('/final-status');
  };

  if (!selectedProduct || !cardData) return null;

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col items-center">
      
      <Menu />

      <h2 className="text-xl font-bold mb-4">Resumen de la compra</h2>
      {error && <p className="text-red-300 mb-2">{error}</p>}
      {loading && <p className="mb-2">Procesando...</p>}

      <div className="bg-white text-gray-800 w-full p-4 rounded mb-4">
        <h4 className="font-bold">Producto</h4>
        <p>{selectedProduct.name}</p>
        <p className="mb-2">
          Precio Total: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
            (Number(selectedProduct?.price) || 0) * (Number(selectedProduct?.quantity) || 1)
          )}
        </p>
      </div>

      <div className="bg-white text-gray-800 w-full p-4 rounded mb-4">
        <h4 className="font-bold">Entrega</h4>
        <p>Dirección: {deliveryData?.address}</p>
        <p>Ciudad: {deliveryData?.city}</p>
        <p>Teléfono: {deliveryData?.phone}</p>
      </div>

      <div className="bg-white text-gray-800 w-full p-4 rounded mb-4">
        <h4 className="font-bold">Tarjeta</h4>
        <p>Número: **** **** **** {cardData.number.slice(-4)}</p>
        <p>CardHolder: {cardData.card_holder}</p>
      </div>

      <button 
        onClick={handlePay}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        {loading ? 'Procesando pago...' : 'Pagar'}
      </button>
    </div>
  );
};
