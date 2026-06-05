import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { sound } from './sound';
import { SFX_COIN, SFX_WIN } from './utils/constants';
import StarField from './components/StarField';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import BackToTop from './components/BackToTop';
import MusicToggle from './components/MusicToggle';
import Home from './pages/Home';
import Store from './pages/Store';
import Cart from './pages/Cart';
import JoinTeam from './pages/JoinTeam';
import Admin from './pages/Admin';
import './index.css';
import './App.css';

sound.preload(SFX_COIN);
sound.preload(SFX_WIN);

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
