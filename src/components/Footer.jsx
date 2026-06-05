import { Link } from 'react-router-dom';
import { Crosshair } from 'lucide-react';
import { useAppStore } from '../store';
import SocialIcon from './SocialIcon';

export default function Footer() {
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
