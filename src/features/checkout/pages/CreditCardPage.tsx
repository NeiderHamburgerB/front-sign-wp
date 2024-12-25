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
  const { loading, error } = useAppSelector((state) => state.checkout);

  // Card info
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [quotas, setQuotas] = useState('');
  const [email, setEmail] = useState('');

  // Delivery info
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  // Modal visibility
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cardData = {
      number: cardNumber,
      cvc,
      exp_month: expMonth,
      exp_year: expYear,
      card_holder: cardHolder,
      quotas,
      email,
    };

    dispatch(setCardData(cardData));
    await dispatch(requestCardToken(cardData)).unwrap();
    dispatch(setDeliveryData({ address, city, phone }));
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
        <div className="text-sm">{cardHolder || 'Nombre'}</div>
        <div className="text-lg font-semibold tracking-wider">
          {cardNumber ? cardNumber.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() : '**** **** **** ****'}
        </div>
        <div className="flex justify-between text-sm">
          <span>{expMonth || 'MM'}/{expYear || 'YY'}</span>
          <span>{cvc || 'CVC'}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block mb-1">Número de Tarjeta</label>
          <input className="w-full p-2 rounded text-gray-800" type="number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
          {cardNumber.length > 0 && cardNumber.length < 16 && <p className="text-red-500 text-sm">El número debe tener 16 dígitos.</p>}
        </div>
        <div>
          <label className="block mb-1">CVC</label>
          <input className="w-full p-2 rounded text-gray-800" type="number" value={cvc} onChange={(e) => setCvc(e.target.value)} required />
          {cvc.length > 0 && cvc.length < 3 && <p className="text-red-500 text-sm">El CVC debe tener 3 dígitos.</p>}
        </div>
        <div>
          <label className="block mb-1">Cuotas</label>
          <input className="w-full p-2 rounded text-gray-800" type="number" value={quotas} onChange={(e) => setQuotas(e.target.value)} required />
        </div>
        <div className="flex gap-2">
          <div>
            <label className="block mb-1">Exp Mes</label>
            <input className="w-full p-2 rounded text-gray-800" type="number" value={expMonth} onChange={(e) => setExpMonth(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1">Exp Año</label>
            <input className="w-full p-2 rounded text-gray-800" type="number" value={expYear} onChange={(e) => setExpYear(e.target.value)} required />
          </div>
        </div>
        <div>
          <label className="block mb-1">Nombre en la Tarjeta</label>
          <input className="w-full p-2 rounded text-gray-800" type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input className="w-full p-2 rounded text-gray-800" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Dirección</label>
          <input className="w-full p-2 rounded text-gray-800" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Ciudad</label>
          <input className="w-full p-2 rounded text-gray-800" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Teléfono</label>
          <input className="w-full p-2 rounded text-gray-800" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 rounded p-2 mt-2">{loading ? 'Procesando...' : 'Continuar'}</button>
      </form>
      {showModal && <TokensModal onClose={handleCloseModal} />}
    </div>
  );
};
