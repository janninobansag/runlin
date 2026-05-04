import { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CartBar from '../components/CartBar';
import './Menu.css';

const CATEGORIES = ['All', 'Booster Packs', 'Booster Bundles', 'Special Collections', 'Limited Edition', 'Trainer Boxes'];
const CATEGORY_ICONS = {
  'All': '🎴',
  'Booster Packs': '📦',
  'Booster Bundles': '🎁',
  'Special Collections': '⭐',
  'Limited Edition': '💎',
  'Trainer Boxes': '🏆',
};

export default function Menu() {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedId, setAddedId]     = useState(null);
  const { addItem, totalItems }   = useCart();
  const navigate                  = useNavigate();

  useEffect(() => { loadProducts(activeCategory); }, [activeCategory]);

  const loadProducts = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchProducts(category === 'All' ? '' : category);
      setProducts(res.data.data);
    } catch { setError('Could not load products. Is the backend running?'); }
    finally { setLoading(false); }
  };

  const handleAdd = (product) => {
    addItem(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 800);
  };

  return (
    <div className="menu-page">
      <header className="menu-header">
        <button className="menu-header__back" onClick={() => navigate('/')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          HOME
        </button>
        <div className="menu-header__brand">
          <span className="menu-header__logo">PokéShop</span>
          <span className="menu-header__tagline">TCG Card Store</span>
        </div>
        <button className="menu-header__cart" onClick={() => navigate('/checkout')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
          {totalItems > 0 && <span className="menu-header__badge">{totalItems}</span>}
        </button>
      </header>

      <nav className="menu-cats">
        {CATEGORIES.map(cat => (
          <button key={cat}
            className={`menu-cats__btn${activeCategory === cat ? ' menu-cats__btn--active' : ''}`}
            onClick={() => setActiveCategory(cat)}>
            <span>{CATEGORY_ICONS[cat]}</span>{cat}
          </button>
        ))}
      </nav>

      <main className="menu-main">
        {loading && <div className="menu-loading"><div className="menu-loading__spinner"/><p>Loading cards…</p></div>}
        {error && <div className="menu-error"><span>⚠️</span><p>{error}</p><button onClick={() => loadProducts(activeCategory)}>Retry</button></div>}
        {!loading && !error && products.length === 0 && <div className="menu-empty"><p>No products in this category.</p></div>}
        {!loading && !error && (
          <div className="menu-grid">
            {products.map((product, idx) => (
              <ProductCard key={product._id} product={product} onAdd={handleAdd}
                justAdded={addedId === product._id} style={{ animationDelay: `${idx * 0.05}s` }} />
            ))}
          </div>
        )}
      </main>

      {totalItems > 0 && <CartBar />}
    </div>
  );
}
