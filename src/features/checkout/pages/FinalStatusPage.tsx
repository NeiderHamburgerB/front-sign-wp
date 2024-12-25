import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { checkPaymentStatus } from '../actions/checkoutActions';
import { resetCheckout } from '../reducers/checkoutSlice';

export const FinalStatusPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, paymentStatus, loading, error } = useAppSelector((state) => state.checkout);

  useEffect(() => {
    if (!id) {
      navigate('/');
    } else {
      dispatch(checkPaymentStatus(id));
    }
  }, [id, dispatch, navigate]);

  useEffect(() => {
    if (paymentStatus) {
      const timer = setTimeout(() => {
        dispatch(resetCheckout()); 
        navigate('/'); 
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [paymentStatus, dispatch, navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  if (!id) return null;

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Estado Final del Pago</h2>
      {loading && <p className="mb-2">Consultando estado...</p>}
      {error && <p className="text-red-300 mb-2">{error}</p>}

      {paymentStatus && (
        <p className="mb-4">
          El estado de tu pago es: <strong>{paymentStatus}</strong>
        </p>
      )}

      <button 
        onClick={handleGoHome}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Volver a Productos
      </button>
    </div>
  );
};
