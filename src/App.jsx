import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Video, Camera, MessageCircle, Shield, ShoppingCart, LogIn, Trash2,
  Plus, Crosshair, Star, Tv, CheckCircle, Music, Gamepad2, X, Copy,
  ExternalLink, ChevronRight, Zap, Trophy, Users, Clock, Menu,
  Target, Settings, Eye, EyeOff, Download, Upload
} from 'lucide-react';
import { useAppStore } from './store';
import { sound } from './sound';
import './index.css';
import './App.css';


/* ─── Partículas de fundo ─── */
function StarField() {
  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    dur: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));
  return (
    <div className="stars-layer">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          '--dur': `${s.dur}s`, '--delay': `${s.delay}s`,
        }} />
      ))}
    </div>
  );
}

/* ─── Scroll to top on route change ─── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─── WhatsApp FAB ─── */
function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/5583998198337"
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      data-tip="Fale comigo no WhatsApp"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const { cart } = useAppStore();
  const totalItems = cart.reduce((a, i) => a + i.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav className="nav" style={scrolled ? { margin: '10px auto 40px', background: 'rgba(0,5,25,0.98)' } : {}}>
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <Crosshair size={22} />
          GABZ.BS
        </Link>
        <div className="nav-spacer" />
        <div className="nav-links nav-links-desktop">
          <Link to="/">Início</Link>
          <Link to="/store">Loja</Link>
          <Link to="/join">Alistamento</Link>
        </div>
        <div className="nav-actions">
          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <Link to="/admin" className="admin-btn">
            <LogIn size={18} />
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
          <Link to="/store" onClick={() => setMenuOpen(false)}>Loja</Link>
          <Link to="/join" onClick={() => setMenuOpen(false)}>Alistamento</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Carrinho {totalItems > 0 && `(${totalItems})`}</Link>
        </div>
      )}
    </>
  );
}

/* ─── Ícone de rede social ─── */
function SocialIcon({ name }) {
  switch (name.toLowerCase()) {
    case 'youtube':   return <Video size={30} color="#FF0000" />;
    case 'instagram': return <Camera size={30} color="#E1306C" />;
    case 'twitter':   return <MessageCircle size={30} color="#1DA1F2" />;
    case 'twitch':    return <Tv size={30} color="#9146FF" />;
    case 'tiktok':    return <Music size={30} color="#69C9D0" />;
    case 'discord':   return <Gamepad2 size={30} color="#5865F2" />;
    default:          return <Shield size={30} color="#00d0ff" />;
  }
}

/* ─── Progress Bar ─── */
function ProgressBar({ current, goal }) {
  const pct = Math.min((current / goal) * 100, 100);
  const completed = pct >= 100;
  return (
    <div className="progress-container">
      <div className="progress-labels">
        <span className="progress-current">{current.toLocaleString('pt-BR')}</span>
        <span className="progress-goal">META: {goal.toLocaleString('pt-BR')}</span>
      </div>
      <div className="progress-track">
        <div
          className={`progress-fill${completed ? ' completed' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="progress-percent">
        {completed ? '🎉 META ALCANÇADA!' : `${pct.toFixed(0)}% CONCLUÍDO`}
      </div>
    </div>
  );
}

/* ─── Home ─── */
function Home() {
  const { data } = useAppStore();
  const activeEvents = (data.events || []).filter(e => e.active);

  const stats = [
    { icon: <Star size={22} color="#ffd700" />, value: '4.9', suffix: '', label: 'Avaliação Média' },
    { icon: <Zap size={22} color="#00d0ff" />, value: '48', suffix: 'h', label: 'Prazo Médio' },
    { icon: <Users size={22} color="#00e676" />, value: '100', suffix: '%', label: 'Satisfação' },
  ];

  return (
    <div className="container">

      {/* ── Hero ── */}
      <div className="hero-wrapper">
        <img
          src="https://i.pinimg.com/736x/71/f6/8b/71f68bb635a9e1d0f64982908a056384.jpg"
          alt="Banner Gabz.BS"
          className="banner-img"
        />
        <div className="profile-pic-ring">
          <img
            src="https://i.pinimg.com/736x/75/3f/5f/753f5f70f3d16f60938eb6e578ea0938.jpg"
            alt="Gabz.BS"
            className="profile-pic"
          />
        </div>
        <h1 className="hero-title">GABZ.BS</h1>
        <p className="hero-sub"><TypingText text="Mestre do Brawl Stars 🎮" speed={70} /></p>
        <div className="hero-tags">
          <span className="hero-tag">🏆 TOP RANKED</span>
          <span className="hero-tag">⚡ SERVIÇO RÁPIDO</span>
          <span className="hero-tag">🔒 100% SEGURO</span>
          <span className="hero-tag">🌎 BRASIL</span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} style={{
            background: 'linear-gradient(145deg, rgba(0,20,70,0.9), rgba(0,8,30,0.95))',
            border: '2px solid rgba(0,208,255,0.18)',
            borderRadius: '18px',
            padding: '24px 20px',
            textAlign: 'center',
            animation: `slideUp 0.6s ease both ${i * 0.1}s`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>{s.icon}</div>
            <div style={{ fontFamily: 'Bungee, cursive', fontSize: '2rem', color: '#fff', lineHeight: 1 }}><AnimatedCounter value={s.value} suffix={s.suffix} /></div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '6px', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Eventos & Metas ── */}
      {activeEvents.length > 0 && (
        <>
          <div className="section-header">
            <h2>🎯 Eventos & Metas</h2>
            <div className="section-divider" />
            <p className="section-sub">Participe das metas e concorra a prêmios incríveis</p>
          </div>
          <div className="events-grid" style={{ marginBottom: '90px' }}>
            {activeEvents.map((event, i) => (
              <div key={event.id} className="event-card" style={{ animationDelay: `${i * 0.12}s` }}>
                {event.image && (
                  <img src={event.image} alt={event.title} className="event-card-image" />
                )}
                <div className="event-card-body">
                  <div className="event-card-title">
                    <Trophy size={20} color="#ffd700" />
                    {event.title}
                  </div>
                  <p className="event-card-desc">{event.description}</p>
                  <ProgressBar current={event.current} goal={event.goal} />
                  {event.link && (
                    <a href={event.link} target="_blank" rel="noreferrer" className="event-link-btn">
                      <ExternalLink size={16} />
                      {event.linkLabel || 'Participar'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Redes Sociais ── */}
      <div className="section-header">
        <h2>Redes Sociais</h2>
        <div className="section-divider" />
        <p className="section-sub">Acompanhe o conteúdo e fique por dentro de tudo</p>
      </div>
      <div className="socials-grid" style={{ marginBottom: '90px' }}>
        {data.socials.map((social, i) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="social-card"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="social-icon-wrap"><SocialIcon name={social.name} /></div>
            <span>{social.name}</span>
          </a>
        ))}
      </div>

      {/* ── Reviews ── */}
      <div className="section-header">
        <h2>O que falam sobre mim</h2>
        <div className="section-divider" />
        <p className="section-sub">Opiniões reais de quem já contratou</p>
      </div>
      <div className="reviews-grid" style={{ marginBottom: '90px' }}>
        {data.reviews.map((review, i) => (
          <div key={review.id} className="review-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="review-author">
              <span className="review-name">@{review.author}</span>
              <div className="stars">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={15} fill="#ffd700" color="#ffd700" />
                ))}
              </div>
            </div>
            <p className="review-text">"{review.text}"</p>
            <div className="review-brawler">🎯 {review.brawler}</div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="cta-banner">
        <h2>🚀 Pronto para subir de nível?</h2>
        <p>
          Confira os serviços disponíveis ou entre para a equipe.
          Atendimento rápido, seguro e com resultado garantido.
        </p>
        <div className="cta-buttons">
          <Link to="/store">
            <button>
              <ShoppingCart size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />
              Ver a Loja
            </button>
          </Link>
          <Link to="/join">
            <button className="secondary">
              <Shield size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />
              Entrar na Equipe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Rarity helper ─── */
const RARITIES = [
  { max: 10, name: 'COMUM', cls: 'common', color: '#aaaabb' },
  { max: 20, name: 'RARA', cls: 'rare', color: '#00d0ff' },
  { max: 50, name: 'SUPER', cls: 'super', color: '#ffd700' },
  { max: Infinity, name: 'LENDÁRIA', cls: 'legendary', color: '#ff0044' },
];

function getRarity(price) {
  return RARITIES.find(r => price <= r.max) || RARITIES[RARITIES.length - 1];
}

function getFeatures(service) {
  return service.features || [
    'Serviço profissional',
    'Prazo combinado',
    'Conta protegida',
    'Suporte via WhatsApp',
  ];
}

/* ─── Store ─── */
function Store() {
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

                <div className="price-tag">R$ {service.price.toFixed(2)}</div>

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
              <span style={{ color: 'var(--text-dim)', fontFamily: 'Russo One', fontSize: '0.9rem' }}>VALOR TOTAL</span>
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

/* ─── Cart ─── */
function Cart() {
  const { cart, removeFromCart, clearCart, data } = useAppStore();
  const [showPix, setShowPix] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const total = cart.reduce((a, i) => a + i.price * i.quantity, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getWhatsApp = () => {
    const lines = cart.map(i => `%E2%80%A2 ${i.title} (x${i.quantity})`).join('%0A');
    const msg = `Ol%C3%A1 Gabz%2C fiz o pedido no site e paguei via PIX.%0A%0APedido%3A%0A${lines}%0A%0ATotal%3A R%24 ${total.toFixed(2)}%0A%0AQuando podemos come%C3%A7ar%3F`;
    return `https://wa.me/5583998198337?text=${msg}`;
  };

  if (cart.length === 0 && !showPix) {
    return (
      <div className="container">
        <div className="empty-state">
          <div style={{ fontSize: '4rem', marginBottom: 12 }}>🛒</div>
          <h2>Carrinho vazio</h2>
          <p>Você ainda não adicionou nenhum serviço. Dá uma olhada na loja.</p>
          <Link to="/store"><button>Ver a Loja</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section-header" style={{ marginBottom: 36 }}>
        <h2>Carrinho de Compras</h2>
        <div className="section-divider" />
      </div>

      <div className="cart-layout">
        {/* Items list */}
        <div className="cart-items-panel">
          <div className="cart-panel-header">Seus Serviços</div>
          {cart.map(item => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-info">
                <div className="cart-item-name">{item.title}</div>
                <div className="cart-item-unit">R$ {item.price.toFixed(2)} por unidade</div>
              </div>
              <div className="cart-item-right">
                <div className="cart-item-qty-badge">x{item.quantity}</div>
                <div className="cart-item-subtotal">R$ {(item.price * item.quantity).toFixed(2)}</div>
                <button
                  className="cart-remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remover"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            style={{ background: 'none', border: '1px solid rgba(255,51,51,0.3)', color: 'rgba(255,80,80,0.8)', boxShadow: 'none', padding: '10px 20px', fontSize: '0.85rem', borderRadius: 10, marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Trash2 size={14} /> Limpar carrinho
          </button>
        </div>

        {/* Summary panel */}
        <div className="cart-summary-panel">
          <div className="cart-panel-header">Resumo do Pedido</div>

          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>{item.title} <span style={{ color: 'rgba(255,255,255,0.4)' }}>x{item.quantity}</span></span>
              <span style={{ color: '#fff' }}>R$ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 6px', padding: '18px 0 0', borderTop: '2px solid rgba(255,215,0,0.2)' }}>
            <span style={{ fontFamily: 'Russo One', fontSize: '1rem', letterSpacing: 1 }}>TOTAL</span>
            <span style={{ fontFamily: 'Bungee, cursive', fontSize: '2rem', background: 'linear-gradient(135deg,#ffe066,#ff8c00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              R$ {total.toFixed(2)}
            </span>
          </div>

          {/* Trust badges */}
          <div className="cart-trust">
            <span><CheckCircle size={13} color="#00e676" /> Pagamento seguro</span>
            <span><Shield size={13} color="#00d0ff" /> Conta protegida</span>
            <span><Zap size={13} color="#ffd700" /> Entrega rápida</span>
          </div>

          <button style={{ width: '100%', marginTop: 20 }} onClick={() => setShowPix(true)}>
            <CheckCircle size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Finalizar com PIX
          </button>
        </div>
      </div>

      {/* PIX Modal */}
      {showPix && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowPix(false)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowPix(false)}><X size={18} /></button>

            {!confirmed ? (
              <>
                <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>💰</div>
                <h2 style={{ color: 'var(--gold)', fontFamily: 'Bungee, cursive', fontSize: '1.8rem', marginBottom: 6 }}>Pagamento PIX</h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 22 }}>
                  Realize o Pix de <strong style={{ color: '#fff', fontSize: '1.1rem' }}>R$ {total.toFixed(2)}</strong> para a chave abaixo.
                </p>

                {/* QR */}
                <div style={{ background: '#fff', padding: 12, borderRadius: 18, width: 176, height: 176, margin: '0 auto 22px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(255,215,0,0.25)' }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.pixKey)}`}
                    alt="QR Code PIX"
                    style={{ width: 150, height: 150 }}
                  />
                </div>

                <label style={{ fontFamily: 'Russo One', color: 'var(--text-dim)', fontSize: '0.78rem', letterSpacing: 2, display: 'block', marginBottom: 8 }}>CHAVE PIX</label>
                <div className="pix-key-box">
                  <input readOnly value={data.pixKey} />
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied
                      ? <><CheckCircle size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Copiado</>
                      : <><Copy size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Copiar</>}
                  </button>
                </div>

                <button
                  className="secondary"
                  style={{ width: '100%', marginTop: 4 }}
                  data-sound="win"
                  onClick={() => { setConfirmed(true); }}
                >
                  Já realizei o pagamento →
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize: '3rem', marginBottom: 10 }}>✅</div>
                <h2 style={{ color: 'var(--success)', fontFamily: 'Bungee, cursive', fontSize: '1.6rem', marginBottom: 10 }}>Pagamento confirmado!</h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 24 }}>
                  Agora envie o comprovante do Pix no WhatsApp para confirmarmos o seu pedido e iniciarmos o atendimento.
                </p>
                <a href={getWhatsApp()} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
                  <button style={{ width: '100%', background: 'linear-gradient(180deg,#25D366 0%,#128C7E 100%)', boxShadow: '0 6px 0 #075E54, 0 10px 25px rgba(37,211,102,0.35)' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ verticalAlign: 'middle', marginRight: 8 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Enviar comprovante no WhatsApp
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Join Team ─── */
function JoinTeam() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); sound.play(SFX_WIN); }, 2000);
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="success-state">
          <CheckCircle size={72} color="var(--success)" className="success-icon" />
          <h2>Inscrição enviada</h2>
          <p>
            Você deu o primeiro passo para se tornar parte da elite. Vamos avaliar o seu perfil e entrar em contato em breve.
          </p>
          <button onClick={() => setSubmitted(false)}>Enviar outra inscrição</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="join-container">
        <div className="join-header">
          <Shield size={58} color="var(--primary)" className="join-icon" />
          <h1 style={{ fontSize: '2.6rem', color: 'var(--primary)', marginBottom: 10 }}>Alistamento Oficial</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Preencha os dados abaixo para solicitar uma vaga na equipe. Apenas os melhores são selecionados.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>NICKNAME NO JOGO</label>
              <input required type="text" className="input-field" placeholder="Ex: ProPlayer123" />
            </div>
            <div className="form-group">
              <label>ID DA CONTA (#)</label>
              <input required type="text" className="input-field" placeholder="Ex: #2YCPRQY" />
            </div>
            <div className="form-group">
              <label>WHATSAPP</label>
              <input required type="tel" className="input-field" placeholder="(11) 99999-9999" />
            </div>
            <div className="form-group">
              <label>TROFÉUS TOTAIS</label>
              <input required type="number" className="input-field" placeholder="Ex: 35000" />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 4 }}>
            <label>POR QUE VOCÊ MERECE ENTRAR NA EQUIPE?</label>
            <textarea required className="input-field" rows="4" placeholder="Fale sobre suas habilidades, dedicação e o que você pode trazer para a equipe..." />
          </div>

          <button type="submit" data-sound="none" style={{ width: '100%' }}>
            {submitting
              ? <><Clock size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />Enviando...</>
              : <>Enviar Inscrição <ChevronRight size={18} style={{ verticalAlign: 'middle', marginLeft: 6 }} /></>
            }
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Admin ─── */
function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('eventos');
  const {
    data, updateService, addService, deleteService,
    updateSocial, updatePixKey, addReview, deleteReview,
    addEvent, updateEvent, deleteEvent, updateAdminPassword,
    importData
  } = useAppStore();

  const [newReview, setNewReview] = useState({ author: '', rating: 5, text: '', brawler: '' });
  const [newPass, setNewPass] = useState('');
  const [newEvent, setNewEvent] = useState({
    title: '', description: '', image: '', current: 0, goal: 100, link: '', linkLabel: ''
  });

  const handleLogin = e => {
    e.preventDefault();
    if (password === data.adminPassword) setLoggedIn(true);
    else alert('Senha incorreta');
  };

  const handleAddReview = e => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;
    addReview(newReview);
    setNewReview({ author: '', rating: 5, text: '', brawler: '' });
  };

  const handleAddEvent = e => {
    e.preventDefault();
    if (!newEvent.title) return;
    addEvent(newEvent);
    setNewEvent({ title: '', description: '', image: '', current: 0, goal: 100, link: '', linkLabel: '' });
  };

  if (!loggedIn) {
    return (
      <div className="container">
        <div className="empty-state" style={{ borderColor: 'rgba(255,51,51,0.3)', maxWidth: 420 }}>
          <Shield size={52} color="var(--danger)" style={{ marginBottom: 16, opacity: 0.8 }} />
          <h2 style={{ color: 'var(--danger)' }}>Área Restrita</h2>
          <p>Insira a credencial de administrador para acessar o painel.</p>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <input
              type="password"
              className="input-field"
              placeholder="Senha de administrador"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <button type="submit" style={{ width: '100%' }}>Autenticar</button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'eventos', label: 'Eventos', icon: <Target size={16} /> },
    { id: 'loja', label: 'Loja', icon: <ShoppingCart size={16} /> },
    { id: 'redes', label: 'Redes', icon: <Users size={16} /> },
    { id: 'feedbacks', label: 'Feedbacks', icon: <Star size={16} /> },
    { id: 'config', label: 'Config', icon: <Settings size={16} /> },
  ];

  return (
    <div className="container">
      <div className="admin-header">
        <div className="section-header">
          <h2 style={{ color: 'var(--success)' }}>Painel de Controle</h2>
          <div className="section-divider" style={{ background: 'linear-gradient(90deg, transparent, var(--success), transparent)' }} />
          <p className="section-sub">Gerencie o conteúdo do site em tempo real</p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="admin-tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════ TAB: EVENTOS ═══════════ */}
      {activeTab === 'eventos' && (
        <div className="admin-panel">
          <h2>🎯 Gerenciar Eventos & Metas</h2>

          {/* Add event form */}
          <form onSubmit={handleAddEvent} style={{ background: 'rgba(0,0,0,0.35)', padding: 24, borderRadius: 16, border: '1px solid rgba(255,215,0,0.15)', marginBottom: 28 }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--gold)', marginBottom: 18, fontFamily: 'Russo One', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Plus size={18} /> Novo Evento
            </h3>

            <label style={{ fontFamily: 'Russo One', color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: 1.5, display: 'block', marginBottom: 8 }}>TÍTULO DO EVENTO</label>
            <input
              type="text"
              className="input-field"
              placeholder="Ex: Sorteio de conta quando bater 100 inscritos"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
            />

            <label style={{ fontFamily: 'Russo One', color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: 1.5, display: 'block', marginBottom: 8, marginTop: 14 }}>DESCRIÇÃO</label>
            <textarea
              className="input-field"
              rows="3"
              placeholder="Ex: Quando atingirmos 100 inscritos no YouTube, vou dar uma conta com skins raras!"
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
            />

            <label style={{ fontFamily: 'Russo One', color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: 1.5, display: 'block', marginBottom: 8, marginTop: 14 }}>IMAGEM (URL)</label>
            <input
              type="text"
              className="input-field"
              placeholder="https://exemplo.com/imagem.jpg"
              value={newEvent.image}
              onChange={e => setNewEvent({ ...newEvent, image: e.target.value })}
            />

            <div className="event-edit-row" style={{ marginTop: 14 }}>
              <div>
                <label style={{ fontFamily: 'Russo One', color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: 1.5, display: 'block', marginBottom: 8 }}>PROGRESSO ATUAL</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="0"
                  value={newEvent.current}
                  onChange={e => setNewEvent({ ...newEvent, current: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'Russo One', color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: 1.5, display: 'block', marginBottom: 8 }}>META TOTAL</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="100"
                  value={newEvent.goal}
                  onChange={e => setNewEvent({ ...newEvent, goal: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div className="event-edit-row" style={{ marginTop: 14 }}>
              <div>
                <label style={{ fontFamily: 'Russo One', color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: 1.5, display: 'block', marginBottom: 8 }}>LINK (URL)</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="https://instagram.com/gabz"
                  value={newEvent.link}
                  onChange={e => setNewEvent({ ...newEvent, link: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'Russo One', color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: 1.5, display: 'block', marginBottom: 8 }}>TEXTO DO BOTÃO</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: Seguir no Instagram"
                  value={newEvent.linkLabel}
                  onChange={e => setNewEvent({ ...newEvent, linkLabel: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" style={{ width: '100%', marginTop: 18, background: 'linear-gradient(180deg,#00e676 0%,#00a352 100%)', boxShadow: '0 6px 0 #003d1f', color: '#000' }}>
              <Plus size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />Criar Evento
            </button>
          </form>

          {/* Events list */}
          {(data.events || []).length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)' }}>
              <Target size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p>Nenhum evento criado ainda. Use o formulário acima para criar o primeiro!</p>
            </div>
          )}

          {(data.events || []).map(event => {
            const pct = Math.min((event.current / event.goal) * 100, 100);
            return (
              <div key={event.id} className="event-edit-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Trophy size={18} color="#ffd700" />
                    <strong style={{ fontFamily: 'Russo One', color: '#fff', fontSize: '1rem' }}>{event.title}</strong>
                  </div>
                  <span className={`event-status-badge ${event.active ? 'active' : 'inactive'}`}>
                    {event.active ? '● ATIVO' : '● INATIVO'}
                  </span>
                </div>

                {/* Mini progress */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 6 }}>
                    <span style={{ color: 'var(--gold)', fontFamily: 'Russo One' }}>{event.current} / {event.goal}</span>
                    <span style={{ color: 'var(--text-dim)' }}>{pct.toFixed(0)}%</span>
                  </div>
                  <div className="progress-track" style={{ height: 8 }}>
                    <div className={`progress-fill${pct >= 100 ? ' completed' : ''}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <label>TÍTULO</label>
                <input className="input-field" value={event.title} onChange={e => updateEvent(event.id, { title: e.target.value })} />

                <label>DESCRIÇÃO</label>
                <textarea className="input-field" rows="2" value={event.description} onChange={e => updateEvent(event.id, { description: e.target.value })} />

                <label>IMAGEM (URL)</label>
                <input className="input-field" value={event.image || ''} onChange={e => updateEvent(event.id, { image: e.target.value })} />

                <div className="event-edit-row">
                  <div>
                    <label>PROGRESSO ATUAL</label>
                    <input className="input-field" type="number" value={event.current} onChange={e => updateEvent(event.id, { current: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label>META TOTAL</label>
                    <input className="input-field" type="number" value={event.goal} onChange={e => updateEvent(event.id, { goal: parseInt(e.target.value) || 1 })} />
                  </div>
                </div>

                <div className="event-edit-row">
                  <div>
                    <label>LINK</label>
                    <input className="input-field" value={event.link || ''} onChange={e => updateEvent(event.id, { link: e.target.value })} />
                  </div>
                  <div>
                    <label>TEXTO DO BOTÃO</label>
                    <input className="input-field" value={event.linkLabel || ''} onChange={e => updateEvent(event.id, { linkLabel: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <button
                    onClick={() => updateEvent(event.id, { active: !event.active })}
                    style={{
                      flex: 1,
                      background: event.active ? 'rgba(255,51,51,0.1)' : 'rgba(0,230,118,0.1)',
                      border: `1px solid ${event.active ? 'rgba(255,51,51,0.3)' : 'rgba(0,230,118,0.3)'}`,
                      color: event.active ? '#ff5555' : 'var(--success)',
                      boxShadow: 'none',
                      padding: '10px 16px',
                      borderRadius: 10,
                      fontSize: '0.85rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                    }}
                  >
                    {event.active ? <><EyeOff size={14} /> Desativar</> : <><Eye size={14} /> Ativar</>}
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    style={{
                      background: 'rgba(255,51,51,0.1)',
                      border: '1px solid rgba(255,51,51,0.3)',
                      color: '#ff5555',
                      boxShadow: 'none',
                      padding: '10px 16px',
                      borderRadius: 10,
                      fontSize: '0.85rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                    }}
                  >
                    <Trash2 size={14} /> Remover
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════════ TAB: LOJA ═══════════ */}
      {activeTab === 'loja' && (
        <div className="admin-panel">
          <h2>🛒 Catálogo da Loja</h2>
          {data.services.map(service => (
            <div key={service.id} className="service-edit-card">
              <label>NOME</label>
              <input className="input-field" value={service.title} onChange={e => updateService(service.id, { ...service, title: e.target.value })} />
              <label>IMAGEM (URL)</label>
              <input className="input-field" placeholder="https://..." value={service.image || ''} onChange={e => updateService(service.id, { ...service, image: e.target.value })} />
              <label>PREÇO (R$)</label>
              <input className="input-field" type="number" value={service.price} onChange={e => updateService(service.id, { ...service, price: parseFloat(e.target.value) })} />
              <label>DESCRIÇÃO</label>
              <textarea className="input-field" rows="3" value={service.description} onChange={e => updateService(service.id, { ...service, description: e.target.value })} />
              <button
                style={{ background: 'rgba(255,51,51,0.1)', border: '1px solid rgba(255,51,51,0.3)', color: '#ff5555', padding: '9px 16px', boxShadow: 'none', borderRadius: 10, fontSize: '0.85rem', marginTop: 4 }}
                onClick={() => deleteService(service.id)}
              >
                <Trash2 size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />Remover Item
              </button>
            </div>
          ))}
          <button
            style={{ width: '100%', background: 'linear-gradient(180deg,#00e676 0%,#00a352 100%)', boxShadow: '0 6px 0 #003d1f', color: '#000' }}
            onClick={() => addService({ title: 'Novo Serviço', price: 49, description: 'Descrição do serviço...', image: '' })}
          >
            <Plus size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />Adicionar Serviço
          </button>
        </div>
      )}

      {/* ═══════════ TAB: REDES ═══════════ */}
      {activeTab === 'redes' && (
        <div className="admin-panel">
          <h2>🌐 Redes Sociais</h2>
          {data.socials.map(social => (
            <div key={social.id} style={{ marginBottom: 18 }}>
              <label style={{ fontFamily: 'Russo One', color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: 1.5, display: 'block', marginBottom: 8 }}>
                {social.name.toUpperCase()}
              </label>
              <input
                type="text"
                className="input-field"
                value={social.url}
                onChange={e => updateSocial(social.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ TAB: FEEDBACKS ═══════════ */}
      {activeTab === 'feedbacks' && (
        <div className="admin-panel">
          <h2>⭐ Feedbacks</h2>
          <form onSubmit={handleAddReview} style={{ background: 'rgba(0,0,0,0.35)', padding: 20, borderRadius: 14, border: '1px solid rgba(0,208,255,0.15)', marginBottom: 24 }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: 16, fontFamily: 'Russo One' }}>Novo Feedback</h3>
            <input type="text" className="input-field" placeholder="Nome do autor" value={newReview.author} onChange={e => setNewReview({ ...newReview, author: e.target.value })} />
            <input type="text" className="input-field" placeholder="Brawler jogado" value={newReview.brawler} onChange={e => setNewReview({ ...newReview, brawler: e.target.value })} />
            <textarea className="input-field" placeholder="Texto do feedback..." value={newReview.text} onChange={e => setNewReview({ ...newReview, text: e.target.value })} rows="3" />
            <select className="input-field" value={newReview.rating} onChange={e => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}>
              <option value={5}>5 Estrelas</option>
              <option value={4}>4 Estrelas</option>
              <option value={3}>3 Estrelas</option>
            </select>
            <button type="submit" style={{ width: '100%', marginTop: 8 }}>Adicionar</button>
          </form>

          {data.reviews.map(review => (
            <div key={review.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, marginBottom: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <strong style={{ color: 'var(--primary)', fontFamily: 'Russo One', fontSize: '0.9rem' }}>@{review.author}</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{review.text.slice(0, 60)}...</p>
              </div>
              <button
                style={{ background: 'rgba(255,51,51,0.1)', border: '1px solid rgba(255,51,51,0.3)', color: '#ff5555', padding: '8px 12px', boxShadow: 'none', borderRadius: 10, flexShrink: 0, marginLeft: 12 }}
                onClick={() => deleteReview(review.id)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ TAB: CONFIG ═══════════ */}
      {activeTab === 'config' && (
        <div className="admin-panel">
          <h2>⚙️ Configurações de Pagamento</h2>
          <div className="form-group">
            <label style={{ fontFamily: 'Russo One', color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: 1.5, display: 'block', marginBottom: 10 }}>
              CHAVE PIX RECEBEDORA
            </label>
            <input
              type="text"
              className="input-field"
              value={data.pixKey}
              onChange={e => updatePixKey(e.target.value)}
              placeholder="Chave PIX (e-mail, telefone, CPF ou CNPJ)"
            />
          </div>

          <div style={{ marginTop: 24, padding: '18px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
            <label style={{ color: 'var(--text-dim)', fontSize: '0.88rem', display: 'block', marginBottom: 8 }}>
              <strong style={{ color: 'var(--gold)' }}>Alterar senha do Admin</strong>
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="input-field"
                type="text"
                placeholder="Nova senha"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                className="secondary"
                onClick={() => {
                  if (!newPass.trim()) return;
                  updateAdminPassword(newPass.trim());
                  setNewPass('');
                }}
              >
                <Settings size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />Alterar
              </button>
            </div>
          </div>

          <div style={{ marginTop: 32, padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: 14, border: '1px solid rgba(255,215,0,0.15)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--gold)', marginBottom: 16, fontFamily: 'Russo One' }}>💾 Backup de Dados</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: 16 }}>
              Exporte os dados para salvar um backup ou importe um backup anterior. 
              Para tornar as alterações permanentes para todos os visitantes, exporte o JSON 
              e envie para o desenvolvedor atualizar o site.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `gabz-bs-backup-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                style={{ flex: 1, minWidth: 160, background: 'linear-gradient(180deg,#00e676 0%,#00a352 100%)', boxShadow: '0 6px 0 #003d1f', color: '#000' }}
              >
                <Download size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />Exportar JSON
              </button>
              <label
                style={{
                  flex: 1, minWidth: 160, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  background: 'linear-gradient(180deg,#ffd700 0%,#f0a500 100%)', boxShadow: '0 6px 0 #7a5300', color: '#000',
                  padding: '12px 24px', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
                  border: 'none', fontFamily: 'Russo One', letterSpacing: 0.5
                }}
              >
                <Upload size={16} style={{ verticalAlign: 'middle' }} />Importar JSON
                <input
                  type="file"
                  accept=".json"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      try {
                        const imported = JSON.parse(ev.target.result);
                        if (imported.services && imported.socials && imported.reviews) {
                          importData(imported);
                          alert('Dados importados com sucesso!');
                        } else {
                          alert('Arquivo inválido. Certifique-se de que é um backup do gabz-bs.');
                        }
                      } catch {
                        alert('Erro ao ler o arquivo. Verifique se é um JSON válido.');
                      }
                    };
                    reader.readAsText(file);
                    e.target.value = '';
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        let start = 0;
        const end = parseFloat(value);
        const duration = 1500;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { start = end; clearInterval(timer); }
          setDisplay(start);
        }, 16);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{Number.isInteger(display) ? Math.floor(display) : display.toFixed(1)}{suffix}</span>;
}

/* ─── Typing Text ─── */
function TypingText({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, done]);

  return (
    <span>
      {displayed}
      {!done && <span className="typing-cursor">|</span>}
    </span>
  );
}

/* ─── Back to Top ─── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
    >
      <ChevronRight size={20} style={{ transform: 'rotate(-90deg)' }} />
    </button>
  );
}

/* ─── Footer ─── */
function Footer() {
  const { data } = useAppStore();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Crosshair size={20} color="var(--primary)" />
          <span>GABZ.BS</span>
        </div>
        <div className="footer-links">
          <Link to="/">Início</Link>
          <Link to="/store">Loja</Link>
          <Link to="/join">Alistamento</Link>
        </div>
        <div className="footer-socials">
          {data.socials.map(s => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" title={s.name}>
              <SocialIcon name={s.name} />
            </a>
          ))}
        </div>
        <div className="footer-copy">
          &copy; {year} GABZ.BS &mdash; Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

const SFX_COIN = 'https://files.catbox.moe/dmahb0.mp3';
const SFX_WIN = 'https://files.catbox.moe/3a2yk7.mp3';
const BGM = 'https://files.catbox.moe/o6f22e.mp3';

sound.preload(SFX_COIN);
sound.preload(SFX_WIN);
sound.preload(BGM);

/* ─── Music Toggle ─── */
function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  const toggle = () => {
    if (!ref.current) {
      ref.current = new Audio(BGM);
      ref.current.loop = true;
      ref.current.volume = 0.15;
    }
    if (playing) {
      ref.current.pause();
    } else {
      ref.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      className="music-toggle"
      data-sound="none"
      onClick={toggle}
      aria-label={playing ? 'Pausar música' : 'Tocar música'}
      title={playing ? 'Pausar música' : 'Tocar música'}
    >
      {playing ? <Music size={18} /> : <Music size={18} style={{ opacity: 0.5 }} />}
    </button>
  );
}

/* ─── App ─── */
export default function App() {
  useEffect(() => {
    const fn = e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const s = btn.dataset.sound;
      if (s === 'coin') sound.play(SFX_COIN);
      else if (s === 'win') sound.play(SFX_WIN);
      else if (s === 'none') return;
      else sound.beep();
    };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, []);

  return (
    <HashRouter>
      <StarField />
      <ScrollToTop />
      <div className="app-main">
        <Navbar />
        <Routes>
          <Route path="/"      element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/join"  element={<JoinTeam />} />
          <Route path="/cart"  element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
      <MusicToggle />
      <BackToTop />
      <WhatsAppFAB />
    </HashRouter>
  );
}
