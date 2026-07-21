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
  // helper: one noise layer through a filter with its own envelope
  const noiseLayer = (
    type: BiquadFilterType,
    freq: number,
    q: number,
    gain: number,
    tau: number,
    start = 0,
    dur = 0.5,
  ) => {
    const s = ctx.createBufferSource();
    s.buffer = noise;
    s.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t + start);
    g.gain.exponentialRampToValueAtTime(gain, t + start + 0.006);
    g.gain.setTargetAtTime(0, t + start + 0.006, tau);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start(t + start);
    s.stop(t + start + dur);
  };
  // 1. the CRASH — bright crack plus a mid-body layer so it has weight
  noiseLayer("highpass", 1400, 0.8, 0.55 * velocity, 0.07);
  noiseLayer("bandpass", 1100, 1.1, 0.3 * velocity, 0.09);
  // 2. the debris tail — shards settling for about half a second
  noiseLayer("highpass", 2400, 0.7, 0.16 * velocity, 0.18, 0.05, 0.8);
  // 3. the shards: a burst of glassy pings, then late tinkles as debris falls
  const pings = 8 + Math.floor(Math.random() * 3);
  for (let i = 0; i < pings; i++) {
    // two lower "clinks" for body, the rest bright tinkles; later pings are
    // quieter and more delayed — glass settling on the floor
    const late = i > 4;
    const f = i < 2 ? 1100 + Math.random() * 800 : 2200 + Math.random() * 4200;
    const dt = late ? 0.12 + Math.random() * 0.28 : Math.random() * 0.07;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = f;
    const env = ctx.createGain();
    const peak = (late ? 0.06 : 0.13) * velocity;
    env.gain.setValueAtTime(0.0001, t + dt);
    env.gain.exponentialRampToValueAtTime(peak, t + dt + 0.004);
    env.gain.setTargetAtTime(0, t + dt + 0.004, 0.05 + Math.random() * 0.06);
    osc.connect(env).connect(master);
    osc.start(t + dt);
    osc.stop(t + dt + 0.5);
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
