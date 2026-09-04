// Web Audio API ambient tone and singing bowl synthesizer
class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Plays a Tibetan singing bowl harmonic chime
  playSingingBowl(freq = 432) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.25, now + 0.08);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      const harmonics = [freq, freq * 1.5, freq * 2.02, freq * 2.76];
      const gains = [0.6, 0.25, 0.12, 0.05];

      harmonics.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        g.gain.setValueAtTime(gains[i], now);
        osc.connect(g);
        g.connect(masterGain);
        osc.start(now);
        osc.stop(now + 4.0);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Plays a soft tactile tap click
  playSoftClick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Silently ignore
    }
  }
}

export const soundEngine = new SoundEngine();
