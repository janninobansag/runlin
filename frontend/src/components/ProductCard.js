import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product, onAdd, justAdded, style }) {
  const { items } = useCart();
  const cartItem  = items.find(i => i._id === product._id);
  const inCart    = cartItem ? cartItem.quantity : 0;
  const outOfStock = product.stock === 0;
  const isLimited  = product.category === 'Limited Edition';

  return (
    <div className={`pcard${justAdded ? ' pcard--added' : ''}`} style={style}>
      <div className="pcard__img-wrap">
        <img className="pcard__img" src={product.image} alt={product.name} loading="lazy"
          onError={e => { e.target.src = `https://placehold.co/400x300/13132a/ffd700?text=${encodeURIComponent(product.name)}`; }} />
        <span className="pcard__cat">{product.category}</span>
        {inCart > 0 && <span className="pcard__in-cart">×{inCart} in cart</span>}
        {isLimited && <span className="pcard__limited">✦ LIMITED</span>}
        {outOfStock && <div className="pcard__sold-out">SOLD OUT</div>}
      </div>

      <div className="pcard__body">
        <h3 className="pcard__name">{product.name}</h3>
        <p className="pcard__desc">{product.description}</p>
        <div className="pcard__footer">
          <div className="pcard__meta">
            <span className="pcard__price">${product.price.toFixed(2)}</span>
            <span className={`pcard__stock${product.stock <= 8 && product.stock > 0 ? ' pcard__stock--low' : ''}`}>
              {product.stock <= 8 && product.stock > 0 ? `⚡ Only ${product.stock} left!` : `${product.stock} in stock`}
            </span>
          </div>
          <button className={`pcard__btn${justAdded ? ' pcard__btn--added' : ''}`}
            onClick={() => onAdd(product)} disabled={outOfStock}>
            {justAdded ? (
              <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>Added!</>
            ) : (
              <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>Add</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
