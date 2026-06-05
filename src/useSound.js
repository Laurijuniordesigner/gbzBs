const cache = {};

export function useSound(src) {
  return () => {
    try {
      if (!cache[src]) cache[src] = new Audio(src);
      cache[src].currentTime = 0;
      cache[src].play().catch(() => {});
    } catch {}
  };
}

export function playClick(freq = 600, dur = 80) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.value = 0.08;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur / 1000);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur / 1000);
  } catch {}
}
