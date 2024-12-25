import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsPage } from './features/products/pages/ProductsPage';
import { CreditCardPage } from './features/checkout/pages/CreditCardPage';
import { FinalStatusPage } from './features/checkout/pages/FinalStatusPage';
import { SummaryPage } from './features/checkout/pages/SummaryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />

        <Route path="/checkout" element={<CreditCardPage />} />

        <Route path="/summary" element={<SummaryPage />} />

        <Route path="/final-status" element={<FinalStatusPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
