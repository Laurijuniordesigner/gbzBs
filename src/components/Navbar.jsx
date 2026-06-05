import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Crosshair, ShoppingCart, LogIn, Menu, X } from 'lucide-react';
import { useAppStore } from '../store';

export default function Navbar() {
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
