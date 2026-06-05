import { useState, useRef } from 'react';
import { Music } from 'lucide-react';
import { BGM } from '../utils/constants';

export default function MusicToggle() {
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
