// src/utils/novaAudio.ts

const STORAGE_KEY = 'nova_sfx_enabled';

let audioCtx: AudioContext | null = null;
let lastHoverTime = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume();
  }
  return audioCtx;
}

export function getSfxEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function setSfxEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.04,
  endFreq?: number
) {
  if (!getSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (endFreq !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(gainPeak, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.01);
}

export function playClick() {
  playTone(540, 0.055, 'triangle', 0.045, 220);
}

export function playHoverTick() {
  const now = performance.now();
  if (now - lastHoverTime < 85) return;
  lastHoverTime = now;
  playTone(880, 0.025, 'sine', 0.016, 1080);
}

export function playInstallComplete() {
  if (!getSfxEnabled()) return;
  playTone(523.25, 0.14, 'triangle', 0.045);
  window.setTimeout(() => playTone(659.25, 0.16, 'triangle', 0.045), 90);
  window.setTimeout(() => playTone(783.99, 0.24, 'sine', 0.05), 180);
}

export function playKeycardMint() {
  if (!getSfxEnabled()) return;
  const notes = [440, 554.37, 659.25, 880];
  notes.forEach((n, idx) => {
    window.setTimeout(() => playTone(n, 0.18, 'triangle', 0.045), idx * 70);
  });
}
