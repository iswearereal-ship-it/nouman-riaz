/**
 * Professional Studio Audio Synthesizer (Web Audio API)
 * Zero external audio file dependencies, zero loading latency, 100% reliable.
 * Produces smooth, velvety, high-tech studio sounds for UI hovers and 3D rig animation.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

// Initialize or resume AudioContext safely upon user gesture
export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setGlobalSoundMuted = (muted: boolean) => {
  isMuted = muted;
  try {
    localStorage.setItem('nouman_sound_muted', muted ? 'true' : 'false');
  } catch {
    // quota
  }
};

export const isGlobalSoundMuted = (): boolean => {
  if (typeof window === 'undefined') return false;
  return isMuted;
};

/**
 * 1. Ultra-Smooth Velvet UI Hover Sound:
 * A subtle, airy, gentle micro-tap (like macOS/iOS tactile click)
 */
export const playHoverSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Soft resonant bandpass
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.Q.setValueAtTime(3.5, now);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2100, now);
    osc.frequency.exponentialRampToValueAtTime(2700, now + 0.035);

    // Very gentle velvet volume
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // ignore
  }
};

/**
 * 2. Crisp UI Click Sound:
 * Satisfying mechanical studio switch click
 */
export const playClickSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch {
    // ignore
  }
};

/**
 * 3. Aerodynamic M5 Levitation Whoosh / Space Hum
 */
export const playLevitateSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, now);
    filter.frequency.linearRampToValueAtTime(550, now + 0.4);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch {
    // ignore
  }
};

/**
 * 4. Deep Aluminum Desk Docking Thump & Latch Resonance
 */
export const playDockSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // Low-end solid desk impact
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(130, now);
    osc1.frequency.exponentialRampToValueAtTime(38, now + 0.22);
    gain1.gain.setValueAtTime(0.28, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // High aluminum ring chime
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(940, now + 0.02);
    osc2.frequency.exponentialRampToValueAtTime(460, now + 0.3);
    gain2.gain.setValueAtTime(0.06, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.02);
    osc2.stop(now + 0.35);
  } catch {
    // ignore
  }
};

/**
 * 5. High-Tech Magnetic Thunderbolt Cable Snap & Spark Click
 */
export const playCableSnapSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // Magnetic latch click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1250, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.07);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);

    // Subtle spark sizzle (high frequency burst)
    const oscSpark = ctx.createOscillator();
    const gainSpark = ctx.createGain();
    oscSpark.type = 'sawtooth';
    oscSpark.frequency.setValueAtTime(3200, now + 0.01);
    oscSpark.frequency.exponentialRampToValueAtTime(800, now + 0.09);
    gainSpark.gain.setValueAtTime(0.09, now + 0.01);
    gainSpark.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    oscSpark.connect(gainSpark);
    gainSpark.connect(ctx.destination);
    oscSpark.start(now + 0.01);
    oscSpark.stop(now + 0.1);
  } catch {
    // ignore
  }
};

/**
 * 6. Iconic Apple Studio Chime & Power Boot Sequence
 */
export const playBootChimeSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Warm F-sharp major studio harmony (F# - A# - C# - F# - G#)
    const chord = [185.00, 233.08, 277.18, 369.99, 415.30];
    
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.03);

      gain.gain.setValueAtTime(0.001, now + idx * 0.03);
      gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.03 + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.03);
      osc.stop(now + 1.8);
    });
  } catch {
    // ignore
  }
};
