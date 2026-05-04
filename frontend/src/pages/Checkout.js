import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchProducts, placeOrder } from '../api';
import ProductCard from '../components/ProductCard';
import './Checkout.css';

export default function Checkout() {
  const { items, increment, decrement, removeItem, clearCart, totalItems, totalPrice, addItem } = useCart();
  const navigate = useNavigate();
  const [showAddMore, setShowAddMore]   = useState(false);
  const [moreProducts, setMoreProducts] = useState([]);
  const [moreLoading, setMoreLoading]   = useState(false);
  const [addedId, setAddedId]           = useState(null);
  const [placing, setPlacing]           = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [orderError, setOrderError]     = useState(null);

  const TAX_RATE   = 0.08;
  const tax        = totalPrice * TAX_RATE;
  const grandTotal = totalPrice + tax;

  const handleLoadMore = async () => {
    setShowAddMore(true);
    if (moreProducts.length) return;
    setMoreLoading(true);
    try { const res = await fetchProducts(); setMoreProducts(res.data.data); } catch {}
    finally { setMoreLoading(false); }
  };

  const handleAddFromMore = (product) => {
    addItem(product); setAddedId(product._id);
    setTimeout(() => setAddedId(null), 800);
  };

  const handlePlaceOrder = async () => {
    if (!items.length) return;
    setPlacing(true); setOrderError(null);
    try {
      const res = await placeOrder({ items: items.map(i => ({ productId: i._id, quantity: i.quantity })) });
      setOrderSuccess(res.data.data); clearCart();
    } catch (err) {
      setOrderError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally { setPlacing(false); }
  };

  if (orderSuccess) return (
    <div className="checkout-success">
      <div className="checkout-success__icon">⚡</div>
      <h1 className="checkout-success__title">ORDER PLACED!</h1>
      <p className="checkout-success__num">Order #{orderSuccess.orderNumber}</p>
      <p className="checkout-success__msg">Your Pokémon TCG order is confirmed! Pack it up, Trainer — your cards are on the way.</p>
      <div className="checkout-success__total">Total Paid: ${orderSuccess.total.toFixed(2)}</div>
      <button className="checkout-success__btn" onClick={() => navigate('/')}>Back to Home</button>
      <button className="checkout-success__btn checkout-success__btn--outline" onClick={() => navigate('/menu')}>Shop More Cards</button>
    </div>
  );

  if (!items.length) return (
    <div className="checkout-empty">
      <span>🎴</span>
      <h2>YOUR CART IS EMPTY</h2>
      <p>Add some Pokémon cards to get started!</p>
      <button onClick={() => navigate('/menu')}>Browse Cards</button>
    </div>
  );

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <button className="checkout-header__back" onClick={() => navigate('/menu')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          MENU
        </button>
        <span className="checkout-header__title">YOUR ORDER</span>
        <span className="checkout-header__count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
      </header>

      <div className="checkout-layout">
        <div className="checkout-left">
          <h2 className="checkout-section-title">Cart Items</h2>
          <div className="checkout-items">
            {items.map(item => (
              <div key={item._id} className="checkout-item">
                <img className="checkout-item__img" src={item.image} alt={item.name}
                  onError={e => { e.target.src = `https://placehold.co/120x120/13132a/ffd700?text=${encodeURIComponent(item.name)}`; }} />
                <div className="checkout-item__info">
                  <span className="checkout-item__name">{item.name}</span>
                  <span className="checkout-item__unit">${item.price.toFixed(2)} each</span>
                </div>
                <div className="checkout-item__controls">
                  <button className="checkout-item__ctrl" onClick={() => decrement(item._id)}>−</button>
                  <span className="checkout-item__qty">{item.quantity}</span>
                  <button className="checkout-item__ctrl" onClick={() => increment(item._id)}>+</button>
                </div>
                <div className="checkout-item__subtotal">${(item.price * item.quantity).toFixed(2)}</div>
                <button className="checkout-item__remove" onClick={() => removeItem(item._id)} title="Remove">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            ))}
          </div>

          <button className="checkout-add-more-btn" onClick={handleLoadMore}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Add More Cards
          </button>

          {showAddMore && (
            <div className="checkout-more">
              <h3 className="checkout-section-title">Add More to Your Order</h3>
              {moreLoading
                ? <div className="checkout-more__loading"><div className="menu-loading__spinner" /></div>
                : <div className="checkout-more__grid">
                    {moreProducts.map((p, idx) => (
                      <ProductCard key={p._id} product={p} onAdd={handleAddFromMore}
                        justAdded={addedId === p._id} style={{ animationDelay: `${idx * 0.03}s` }} />
                    ))}
                  </div>
              }
            </div>
          )}
        </div>

        <div className="checkout-right">
          <div className="checkout-summary">
            <h2 className="checkout-section-title">Order Summary</h2>
            <div className="checkout-summary__lines">
              {items.map(item => (
                <div key={item._id} className="checkout-summary__line">
                  <span>{item.name} ×{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-summary__divider" />
            <div className="checkout-summary__line"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="checkout-summary__line"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="checkout-summary__divider" />
            <div className="checkout-summary__total"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>

            {orderError && <div className="checkout-error">{orderError}</div>}

            <button className="checkout-place-btn" onClick={handlePlaceOrder} disabled={placing || !items.length}>
              {placing
                ? <><div className="checkout-place-btn__spinner" /> Placing Order…</>
                : <>⚡ PLACE ORDER — ${grandTotal.toFixed(2)}</>
              }
            </button>
            <p className="checkout-note">Payment is collected at the counter when your order is ready.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
