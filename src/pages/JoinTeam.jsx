import { useState } from 'react';
import { Shield, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { sound } from '../sound';
import { SFX_WIN, WHATSAPP_NUMBER } from '../utils/constants';

export default function JoinTeam() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const nickname = formData.get('nickname');
    const accountId = formData.get('accountId');
    const whatsapp = formData.get('whatsapp');
    const trophies = formData.get('trophies');
    const reason = formData.get('reason');

    const msg = `Olá Gabz, gostaria de me alistar para a equipe!\n\n• Nickname: ${nickname}\n• ID da Conta: ${accountId}\n• WhatsApp: ${whatsapp}\n• Troféus Totais: ${trophies}\n\nPor que mereço entrar:\n"${reason}"`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    setWhatsappUrl(url);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      sound.play(SFX_WIN);
      window.open(url, '_blank');
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="success-state">
          <CheckCircle size={72} color="var(--success)" className="success-icon" />
          <h2>Inscrição enviada!</h2>
          <p>
            Sua inscrição foi gerada. Caso a janela de conversa do WhatsApp não tenha aberto automaticamente, clique no botão abaixo para nos enviar os seus dados.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', marginBottom: 12 }}>
            <button style={{ width: '100%', background: 'linear-gradient(180deg,#25D366 0%,#128C7E 100%)', boxShadow: '0 6px 0 #075E54' }}>
              Conversar no WhatsApp
            </button>
          </a>
          <button className="secondary" style={{ width: '100%' }} onClick={() => setSubmitted(false)}>Enviar outra inscrição</button>
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
              <input required name="nickname" type="text" className="input-field" placeholder="Ex: ProPlayer123" />
            </div>
            <div className="form-group">
              <label>ID DA CONTA (#)</label>
              <input required name="accountId" type="text" className="input-field" placeholder="Ex: #2YCPRQY" />
            </div>
            <div className="form-group">
              <label>WHATSAPP</label>
              <input required name="whatsapp" type="tel" className="input-field" placeholder="(11) 99999-9999" />
            </div>
            <div className="form-group">
              <label>TROFÉUS TOTAIS</label>
              <input required name="trophies" type="number" className="input-field" placeholder="Ex: 35000" />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 4 }}>
            <label>POR QUE VOCÊ MERECE ENTRAR NA EQUIPE?</label>
            <textarea required name="reason" className="input-field" rows="4" placeholder="Fale sobre suas habilidades, dedicação e o que você pode trazer para a equipe..." />
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
