const pool = {};

class SoundManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.5;
    this.sfxVolume = 0.4;
  }

  preload(src) {
    if (!pool[src]) {
      pool[src] = new Audio(src);
      pool[src].load();
    }
  }

  play(src, vol) {
    if (!this.enabled) return;
    try {
      if (!pool[src]) pool[src] = new Audio(src);
      const a = pool[src];
      a.volume = vol ?? this.sfxVolume;
      a.currentTime = 0;
      a.play().catch(() => void 0);
    } catch {
      // Audio play failed or is not supported
    }
  }

  beep(freq = 500, dur = 60) {
    if (!this.enabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.value = 0.06;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur / 1000);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur / 1000);
    } catch {
      // AudioContext failed or is not supported
    }
  }
}

export const sound = new SoundManager();
