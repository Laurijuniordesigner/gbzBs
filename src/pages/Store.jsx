import { useState } from 'react';
import { CheckCircle, Zap, Shield, ShoppingCart, X, ExternalLink } from 'lucide-react';
import { useAppStore } from '../store';
import { getRarity, getFeatures } from '../utils/rarity';

export default function Store() {
  const { data, addToCart } = useAppStore();
  const [added, setAdded] = useState(null);
  const [selected, setSelected] = useState(null);

  const badgeStyle = (badge) => {
    if (badge?.includes('MAIS VENDIDO')) return { bg: 'linear-gradient(135deg,#ff416c,#ff4b2b)', cls: 'hot' };
    if (badge?.includes('PREMIUM')) return { bg: 'linear-gradient(135deg,#f7971e,#ffd200)', cls: 'premium' };
    return { bg: 'linear-gradient(135deg,#667eea,#764ba2)', cls: 'offer' };
  };

  const handleAdd = (service) => {
    addToCart(service);
    setAdded(service.id);
    setTimeout(() => setAdded(null), 2000);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="section-header" style={{ paddingTop: 10 }}>
        <h2>⚡ Brawl Store</h2>
        <div className="section-divider" />
        <p className="section-sub">Serviços profissionais de Brawl Stars &mdash; rápido, seguro e com resultado</p>
      </div>

      {/* Trust strip */}
      <div className="trust-strip">
        <div className="trust-item"><CheckCircle size={16} color="#00e676" /><span>Pagamento seguro via PIX</span></div>
        <div className="trust-sep" />
        <div className="trust-item"><Zap size={16} color="#ffd700" /><span>Entrega no prazo combinado</span></div>
        <div className="trust-sep" />
        <div className="trust-item"><Shield size={16} color="#00d0ff" /><span>Conta protegida &mdash; sem ban</span></div>
      </div>

      {/* Grid */}
      <div className="store-grid">
        {data.services.map((service, index) => {
          const isAdded = added === service.id;
          const bs = badgeStyle(service.badge);
          return (
            <div
              key={service.id}
              className={`store-card ${bs.cls}`}
              style={{ animationDelay: `${index * 0.13}s` }}
            >
              <div className="card-badge" style={{ background: bs.bg }}>{service.badge || 'OFERTA'}</div>

              {service.oldPrice && service.oldPrice > service.price && (
                <div className="promo-badge">
                  -{Math.round((1 - service.price / service.oldPrice) * 100)}% OFF
                </div>
              )}

              {service.image && (
                <div className="card-image-wrap">
                  <img src={service.image} alt={service.title} />
                  <div className="card-image-overlay" />
                </div>
              )}

              <div className="card-body">
                <h2>{service.title}</h2>
                <p style={{ marginBottom: 16 }}>{service.description}</p>

                <ul className="card-features">
                  {(service.features || []).map((f, i) => (
                    <li key={i}>
                      <Zap size={13} color="#ffd700" style={{ flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="price-tag">
                  {service.oldPrice && service.oldPrice > service.price && (
                    <div className="price-old">R$ {service.oldPrice.toFixed(2)}</div>
                  )}
                  <div className="price-current">R$ {service.price.toFixed(2)}</div>
                  {service.oldPrice && service.oldPrice > service.price && (
                    <div className="price-save">
                      ECONOMIZE R$ {(service.oldPrice - service.price).toFixed(2)}
                    </div>
                  )}
                  <div className="price-pix">💰 10% OFF pagando via PIX</div>
                </div>

                <div className="card-actions">
                  <button
                    onClick={() => handleAdd(service)}
                    style={isAdded ? {
                      background: 'linear-gradient(180deg,#00e676 0%,#00a352 100%)',
                      boxShadow: '0 6px 0 #003d1f, 0 10px 25px rgba(0,230,118,0.35)',
                      flex: 1, minWidth: 0, padding: '14px 10px'
                    } : { flex: 1, minWidth: 0, padding: '14px 10px' }}
                  >
                    {isAdded
                      ? <><CheckCircle size={17} style={{ verticalAlign: 'middle', marginRight: 5 }} />Adicionado!</>
                      : <><ShoppingCart size={17} style={{ verticalAlign: 'middle', marginRight: 5 }} />Adicionar</>}
                  </button>
                  <button
                    className="secondary"
                    style={{ padding: '14px 16px', width: 'auto', flex: 'none' }}
                    onClick={() => setSelected(service)}
                    title="Ver detalhes"
                  >
                    <ExternalLink size={17} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="modal-content" style={{ maxWidth: 620 }}>
            <button className="modal-close" onClick={() => setSelected(null)}><X size={18} /></button>

            {selected.image && (
              <div style={{ margin: '-45px -40px 28px', height: 220, overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
                <img src={selected.image} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            <div className={`card-badge ${getRarity(selected.price).cls}`} style={{ position: 'static', transform: 'none', display: 'inline-block', borderRadius: 8, padding: '4px 14px', marginBottom: 14, fontSize: '0.78rem' }}>
              {getRarity(selected.price).name}
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: 10, fontFamily: 'Russo One', color: '#fff' }}>{selected.title}</h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 22 }}>{selected.description}</p>

            <h3 style={{ fontFamily: 'Russo One', fontSize: '0.9rem', color: 'var(--gold)', letterSpacing: 2, marginBottom: 14 }}>O QUE ESTÁ INCLUÍDO</h3>
            <ul className="card-features" style={{ marginBottom: 28 }}>
              {getFeatures(selected).map((f, i) => (
                <li key={i} style={{ fontSize: '1rem', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <CheckCircle size={15} color={getRarity(selected.price).color} style={{ flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, padding: '18px 20px', background: 'rgba(0,0,0,0.4)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div style={{ color: 'var(--text-dim)', fontFamily: 'Russo One', fontSize: '0.9rem' }}>VALOR TOTAL</div>
                {selected.oldPrice && selected.oldPrice > selected.price && (
                  <div style={{ color: 'var(--text-dim)', textDecoration: 'line-through', fontSize: '0.95rem', marginTop: 4 }}>
                    De R$ {selected.oldPrice.toFixed(2)}
                  </div>
                )}
                {selected.oldPrice && selected.oldPrice > selected.price && (
                  <div style={{ color: 'var(--success)', fontFamily: 'Russo One', fontSize: '0.8rem', marginTop: 4, letterSpacing: 0.5 }}>
                    💰 Economize R$ {(selected.oldPrice - selected.price).toFixed(2)}
                  </div>
                )}
              </div>
              <span style={{ fontFamily: 'Bungee, cursive', fontSize: '2.2rem', background: 'linear-gradient(135deg,#ffe066,#ff8c00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>R$ {selected.price.toFixed(2)}</span>
            </div>

            <button
              data-sound="coin"
              onClick={() => { handleAdd(selected); setSelected(null); }}
              style={{ width: '100%' }}
            >
              <ShoppingCart size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
