import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartBar.css';

export default function CartBar() {
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  return (
    <div className="cart-bar">
      <div className="cart-bar__info">
        <span>⚡ {totalItems} item{totalItems !== 1 ? 's' : ''}</span>
        <span className="cart-bar__sep">·</span>
        <span className="cart-bar__price">${totalPrice.toFixed(2)}</span>
      </div>
      <button className="cart-bar__btn" onClick={() => navigate('/checkout')}>
        View Cart →
      </button>
    </div>
  );
}
