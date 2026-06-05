import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, CheckCircle, Shield, Zap, X, Copy } from 'lucide-react';
import { useAppStore } from '../store';
import { WHATSAPP_NUMBER } from '../utils/constants';

export default function Cart() {
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
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
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
