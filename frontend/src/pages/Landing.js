import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="landing__grid" aria-hidden="true" />
      <div className="landing__floaters" aria-hidden="true">
        {['⚡','🔥','💧','🌿','🔮','✨'].map((e, i) => (
          <span key={i} className={`floater floater--${i + 1}`}>{e}</span>
        ))}
      </div>

      <div className="landing__content">
        <div className="landing__eyebrow">
          <span className="landing__eyebrow-dot" />
          OFFICIAL TCG CARD STORE
        </div>

        <h1 className="landing__title">
          <span className="landing__title-line1">GOTTA COLLECT</span>
          <span className="landing__title-line2">POKÉMON</span>
          <span className="landing__title-line3">TRADING CARDS</span>
        </h1>

        <p className="landing__sub">
          Booster packs, elite trainer boxes, special collections & limited edition sets — all in one place.
        </p>

        <div className="landing__actions">
          <button className="landing__cta-primary" onClick={() => navigate('/menu')}>
            ⚡ SHOP NOW
          </button>
          <button className="landing__cta-secondary" onClick={() => navigate('/menu')}>
            Browse Collection →
          </button>
        </div>

        <div className="landing__chips">
          {['Booster Packs','Booster Bundles','Special Collections','Limited Edition','Trainer Boxes'].map(c => (
            <span key={c} className="landing__chip">{c}</span>
          ))}
        </div>

        <div className="landing__stats">
          <div className="landing__stat">
            <span className="landing__stat-num">25+</span>
            <span className="landing__stat-label">Products</span>
          </div>
          <div className="landing__stat-div" />
          <div className="landing__stat">
            <span className="landing__stat-num">5</span>
            <span className="landing__stat-label">Categories</span>
          </div>
          <div className="landing__stat-div" />
          <div className="landing__stat">
            <span className="landing__stat-num">S&V</span>
            <span className="landing__stat-label">Latest Sets</span>
          </div>
          <div className="landing__stat-div" />
          <div className="landing__stat">
            <span className="landing__stat-num">$4.99</span>
            <span className="landing__stat-label">Starts From</span>
          </div>
        </div>
      </div>
    </div>
  );
}
