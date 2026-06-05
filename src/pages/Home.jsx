import { Link } from 'react-router-dom';
import { Star, Zap, Users, Trophy, ExternalLink, ShoppingCart, Shield } from 'lucide-react';
import { useAppStore } from '../store';
import TypingText from '../components/TypingText';
import AnimatedCounter from '../components/AnimatedCounter';
import SocialIcon from '../components/SocialIcon';
import ProgressBar from '../components/ProgressBar';

export default function Home() {
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
