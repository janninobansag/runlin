import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Landing  from './pages/Landing';
import Menu     from './pages/Menu';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"         element={<Landing />} />
          <Route path="/menu"     element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*"         element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
