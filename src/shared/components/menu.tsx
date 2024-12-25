import React from 'react';
import { useImageLoader } from '../../hooks/useImageLoader';

const LOGO_URL = 'https://wompi.com/assets/img/home/logo-wompi-mobile.svg';

export const Menu: React.FC = () => {
  const loaded = useImageLoader(LOGO_URL);

  return (
    <header className="w-full flex justify-center items-center p-4">
      {!loaded ? (
        <div className="animate-pulse bg-gray-300 rounded w-32 h-8" />
      ) : (
        <img
          src={LOGO_URL}
          alt="Wompi Logo"
          className="h-8 object-contain"
          style={{ width: '7rem', height: '2rem', color: 'white', backgroundColor: 'white', borderRadius: '0.5rem', padding: '0.5rem', boxShadow: '0 0 0.5rem rgba(0,0,0,0.1)' }}
        />
      )}
    </header>
  );
};
