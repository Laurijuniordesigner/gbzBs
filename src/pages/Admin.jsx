import { useState } from 'react';
import {
  Shield, Plus, Target, Trophy, Trash2, Eye, EyeOff,
  ShoppingCart, Users, Star, Settings, X, Download, Upload
} from 'lucide-react';
import { useAppStore } from '../store';

export default function Admin() {
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
