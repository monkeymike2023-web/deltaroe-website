// Shared crystal-singing-bowl synthesis — used by /sound-chakras and
// /the-clearing. Client-side only: call makeBowl() inside a user gesture
// (browser autoplay policy) from a "use client" component.
//
// Modal synthesis of a struck crystal singing bowl. What makes a bowl sound
// like a bowl (and not a synth pad): a near-instant mallet onset, inharmonic
// overtones (~2.71× and ~5.18× the fundamental — shell modes, not a harmonic
// series) that die within a second or two, a fundamental split into a
// detuned pair whose slow beating is the characteristic shimmer, and a long
// ring that settles into an almost pure sine — all inside a soft room.

export type Bowl = { ctx: AudioContext; master: GainNode; noise: AudioBuffer };

function makeImpulse(ctx: AudioContext, seconds: number, curve: number) {
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * seconds);
  const buf = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, curve);
    }
  }
  return buf;
}

export function makeBowl(): Bowl {
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  const ctx = new Ctor();
  const master = ctx.createGain();
  master.gain.value = 0.5;
  master.connect(ctx.destination);
  // soft synthetic room so the ring blooms instead of dying bone-dry
  const convolver = ctx.createConvolver();
  convolver.buffer = makeImpulse(ctx, 3.2, 4.5);
  const wet = ctx.createGain();
  wet.gain.value = 0.4;
  master.connect(convolver);
  convolver.connect(wet);
  wet.connect(ctx.destination);
  // short white-noise buffer reused for the mallet-contact transient
  const noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.25), ctx.sampleRate);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  return { ctx, master, noise };
}

export function strikeBowl(bowl: Bowl, freq: number, velocity: number) {
  const { ctx, master, noise } = bowl;
  if (ctx.state === "suspended") void ctx.resume();
  const t = ctx.currentTime;
  const end = t + 18;
  // Each mode is a pair split by `split` Hz — the split IS the beat rate.
  // Ring time (tau) falls off sharply with pitch: overtones color the strike,
  // then the fundamental is left singing alone.
  const modes = [
    { ratio: 1, split: 0.9, gain: 0.42, tau: 3.8 },
    { ratio: 2.71, split: 2.2, gain: 0.07, tau: 1.1 },
    { ratio: 5.18, split: 3.1, gain: 0.018, tau: 0.45 },
  ];
  const drift = 1 + (Math.random() - 0.5) * 0.001; // organic, never identical
  for (const m of modes) {
    for (const sign of [-0.5, 0.5]) {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = "sine";
      const f = freq * m.ratio * drift + sign * m.split;
      // struck glass starts a hair sharp, then settles flat as it rings
      osc.frequency.setValueAtTime(f * 1.0012, t);
      osc.frequency.exponentialRampToValueAtTime(f, t + 3);
      env.gain.setValueAtTime(0.0001, t);
      env.gain.exponentialRampToValueAtTime(m.gain * velocity, t + 0.012);
      env.gain.setTargetAtTime(0, t + 0.012, m.tau);
      osc.connect(env).connect(master);
      osc.start(t);
      osc.stop(end);
    }
  }
  // mallet contact: a soft band-limited tick, gone in ~100ms
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = freq * 2.71;
  bp.Q.value = 1.4;
  const nEnv = ctx.createGain();
  nEnv.gain.setValueAtTime(0.09 * velocity, t);
  nEnv.gain.setTargetAtTime(0, t, 0.035);
  src.connect(bp);
  bp.connect(nEnv);
  nEnv.connect(master);
  src.start(t);
  src.stop(t + 0.25);
}

/** A soft glass break — delicate, wind-chime-adjacent, never harsh.
    A short bright filtered-noise burst (highpass ~1.8 kHz, fast decay)
    plus a few tiny inharmonic high pings, all at low gain so it sits
    UNDER a bowl strike rather than competing with it. Routed through
    the same master, so it blooms in the same soft room. */
export function strikeGlass(bowl: Bowl, velocity: number) {
  const { ctx, master, noise } = bowl;
  if (ctx.state === "suspended") void ctx.resume();
  const t = ctx.currentTime;
  // the crack: band-shaped noise, audible ~90ms
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 1800;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 3400;
  bp.Q.value = 0.7;
  const nEnv = ctx.createGain();
  nEnv.gain.setValueAtTime(0.05 * velocity, t);
  nEnv.gain.setTargetAtTime(0, t, 0.028);
  src.connect(hp);
  hp.connect(bp);
  bp.connect(nEnv);
  nEnv.connect(master);
  src.start(t);
  src.stop(t + 0.14);
  // the shards: 3–5 tiny sine pings, 2–6 kHz, gone inside 150ms
  const pings = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < pings; i++) {
    const f = 2000 + Math.random() * 4000;
    const dt = Math.random() * 0.045;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = f;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t + dt);
    env.gain.exponentialRampToValueAtTime(0.014 * velocity, t + dt + 0.004);
    env.gain.setTargetAtTime(0, t + dt + 0.004, 0.03 + Math.random() * 0.03);
    osc.connect(env).connect(master);
    osc.start(t + dt);
    osc.stop(t + dt + 0.2);
  }
}

/** Fade the room quiet and suspend the context (sound-off toggle). */
export function hushBowl(bowl: Bowl) {
  const t = bowl.ctx.currentTime;
  bowl.master.gain.cancelScheduledValues(t);
  bowl.master.gain.setValueAtTime(bowl.master.gain.value, t);
  bowl.master.gain.linearRampToValueAtTime(0.0001, t + 0.35);
  window.setTimeout(() => void bowl.ctx.suspend(), 400);
}

/** Resume the context and fade the room back in (sound-on toggle). */
export function wakeBowl(bowl: Bowl) {
  void bowl.ctx.resume();
  const t = bowl.ctx.currentTime;
  bowl.master.gain.cancelScheduledValues(t);
  bowl.master.gain.setValueAtTime(0.0001, t);
  bowl.master.gain.linearRampToValueAtTime(0.5, t + 0.25);
}
