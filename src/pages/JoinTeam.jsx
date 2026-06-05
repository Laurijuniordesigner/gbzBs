import { useState } from 'react';
import { Shield, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { sound } from '../sound';
import { SFX_WIN } from '../utils/constants';

export default function JoinTeam() {
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
