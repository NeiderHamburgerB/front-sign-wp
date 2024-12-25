import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Menu } from '../../../shared/components/menu';
import { TokensModal } from '../components/TokensModal';
import { setCardData, setDeliveryData } from '../reducers/checkoutSlice';
import { requestCardToken } from '../actions/checkoutActions';

export const CreditCardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, cardData, deliveryData } = useAppSelector((state) => state.checkout);

  // Modal visibility
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (['number', 'cvc', 'exp_month', 'exp_year', 'card_holder', 'quotas', 'email'].includes(field)) {
      dispatch(setCardData({ ...cardData, [field]: value }));
    } else {
      dispatch(setDeliveryData({ ...deliveryData, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(requestCardToken(cardData)).unwrap();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/summary');
  };

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col items-center">
      <Menu />
      <h2 className="text-xl font-bold mb-4">Datos de Tarjeta y Entrega</h2>
      {error && <p className="text-red-300 mb-2">{error}</p>}
      {/* Tarjeta visual */}
      <div className="w-72 h-40 bg-gray-700 rounded mb-4 p-3 text-white">
        <div className="text-sm">{cardData.card_holder || 'Nombre'}</div>
        <div className="text-lg font-semibold tracking-wider">
          {cardData.number
            ? cardData.number.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()
            : '**** **** **** ****'}
        </div>
        <div className="flex justify-between text-sm">
          <span>{cardData.exp_month || 'MM'}/{cardData.exp_year || 'YY'}</span>
          <span>{cardData.cvc || 'CVC'}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block mb-1">Número de Tarjeta</label>
          <input
            className="w-full p-2 rounded text-gray-800"
            type="number"
            value={cardData.number || ''}
            onChange={(e) => handleInputChange('number', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">CVC</label>
          <input
            className="w-full p-2 rounded text-gray-800"
            type="number"
            value={cardData.cvc || ''}
            onChange={(e) => handleInputChange('cvc', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Cuotas</label>
          <input
            className="w-full p-2 rounded text-gray-800"
            type="number"
            value={cardData.quotas || ''}
            onChange={(e) => handleInputChange('quotas', e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2">
          <div>
            <label className="block mb-1">Exp Mes</label>
            <input
              className="w-full p-2 rounded text-gray-800"
              type="number"
              value={cardData.exp_month || ''}
              onChange={(e) => handleInputChange('exp_month', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Exp Año</label>
            <input
              className="w-full p-2 rounded text-gray-800"
              type="number"
              value={cardData.exp_year || ''}
              onChange={(e) => handleInputChange('exp_year', e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Nombre en la Tarjeta</label>
          <input
            className="w-full p-2 rounded text-gray-800"
            type="text"
            value={cardData.card_holder || ''}
            onChange={(e) => handleInputChange('card_holder', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            className="w-full p-2 rounded text-gray-800"
            type="email"
            value={cardData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Dirección</label>
          <input
            className="w-full p-2 rounded text-gray-800"
            type="text"
            value={deliveryData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Ciudad</label>
          <input
            className="w-full p-2 rounded text-gray-800"
            type="text"
            value={deliveryData.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Teléfono</label>
          <input
            className="w-full p-2 rounded text-gray-800"
            type="number"
            value={deliveryData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 rounded p-2 mt-2">
          {loading ? 'Procesando...' : 'Continuar'}
        </button>
      </form>
      {showModal && <TokensModal onClose={handleCloseModal} />}
    </div>
  );
};
