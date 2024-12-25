import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchPaymentTokens } from '../actions/checkoutActions';
import { setAcceptedTerms } from '../reducers/checkoutSlice';
import { Props } from '../types/Checkout';


export const TokensModal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const { loading, permalinkA, permalinkB, acceptedTerms } = useAppSelector((state) => state.checkout);

  const [localCheck, setLocalCheck] = useState(false);

  useEffect(() => {
    dispatch(fetchPaymentTokens());
  }, [dispatch]);

  const handleChangeCheckbox = () => {
    const newValue = !localCheck;
    setLocalCheck(newValue);
    dispatch(setAcceptedTerms(newValue));
  };

  const handleContinue = () => {
    onClose();
  };
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white text-gray-800 rounded p-4 w-full max-w-sm">
        {loading && <p className="mb-2">Cargando...</p>}

        {!loading && (
          <>
            <h3 className="text-lg font-bold mb-2">Consulta nuestros Términos de Uso.</h3>
            
            <div className="flex flex-col gap-2 my-2 text-blue-700 underline">
              <a href={permalinkA || '#'} target="_blank" rel="noopener noreferrer">
                Ver reglamento Usuarios
              </a>
              <a href={permalinkB || '#'} target="_blank" rel="noopener noreferrer">
                Ver Autorización de Datos
              </a>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input 
                type="checkbox"
                checked={localCheck}
                onChange={handleChangeCheckbox}
                className="h-4 w-4"
              />
              <label>Acepto los términos</label>
            </div>

            <div className="flex justify-between mt-4">
              <button 
                onClick={handleCancel}
                className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button 
                onClick={handleContinue}
                disabled={!acceptedTerms}
                className="bg-blue-600 text-white rounded px-4 py-2 disabled:bg-gray-400 hover:bg-blue-700"
              >
                Continuar
              </button>
              </div>
          </>
        )}
      </div>
    </div>
  );
};
