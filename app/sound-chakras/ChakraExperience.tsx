"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHAKRAS } from "@/lib/chakras";
import s from "./ChakraExperience.module.css";

const CYCLE_MS = 10000; // long enough to read the panel before it moves on
const CX = 220; // figure midline in the 440x480 viewBox

/* ---------------------------------------------------------------- audio --
   Modal synthesis of a struck crystal singing bowl. What makes a bowl sound
   like a bowl (and not a synth pad): a near-instant mallet onset, inharmonic
   overtones (~2.71× and ~5.18× the fundamental — shell modes, not a harmonic
   series) that die within a second or two, a fundamental split into a
   detuned pair whose slow beating is the characteristic shimmer, and a long
   ring that settles into an almost pure sine — all inside a soft room.
   Created lazily on the user's "Enable sound" gesture (autoplay policy). */

type Bowl = { ctx: AudioContext; master: GainNode; noise: AudioBuffer };

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

function makeBowl(): Bowl {
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

function strikeBowl(bowl: Bowl, freq: number, velocity: number) {
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

/* -------------------------------------------------------------- symbols --
   Traditional chakra glyphs, simplified for small sizes: a lotus ring with
   the correct petal count around each center's classic inner mark. Rendered
   as a plain <g> centered on (0,0) so it works inside the figure SVG and in
   the list buttons alike. */

const SYMBOL_PETALS: Record<string, number> = {
  root: 4,
  sacral: 6,
  "solar-plexus": 10,
  heart: 12,
  throat: 16,
  "third-eye": 2,
  crown: 20, // stands in for the thousand-petal lotus
};

function petalPath(r: number, petals: number) {
  const inner = r * 0.48;
  const mid = (inner + r) / 2;
  const w = Math.min(r * 0.3, (Math.PI * mid * 0.72) / petals);
  return `M 0 ${-inner} Q ${w} ${-mid} 0 ${-r} Q ${-w} ${-mid} 0 ${-inner} Z`;
}

function glyph(id: string, s: number, color: string) {
  const triDown = (k: number) =>
    `M 0 ${s * 0.62 * k} L ${s * 0.56 * k} ${-s * 0.34 * k} L ${-s * 0.56 * k} ${-s * 0.34 * k} Z`;
  switch (id) {
    case "root": // square of earth + inverted triangle
      return (
        <>
          <rect x={-s * 0.62} y={-s * 0.62} width={s * 1.24} height={s * 1.24} />
          <path d={triDown(0.72)} />
        </>
      );
    case "sacral": // crescent moon
      return (
        <path
          d={`M ${-s * 0.6} 0 A ${s * 0.65} ${s * 0.65} 0 0 0 ${s * 0.6} 0 A ${s} ${s} 0 0 1 ${-s * 0.6} 0 Z`}
        />
      );
    case "solar-plexus": // inverted triangle, the inner fire
      return <path d={triDown(1)} />;
    case "heart": // two triangles meeting — the hexagram
      return (
        <>
          <path d={`M 0 ${-s * 0.62} L ${s * 0.54} ${s * 0.31} L ${-s * 0.54} ${s * 0.31} Z`} />
          <path d={`M 0 ${s * 0.62} L ${s * 0.54} ${-s * 0.31} L ${-s * 0.54} ${-s * 0.31} Z`} />
        </>
      );
    case "throat": // circle of ether holding a small triangle
      return (
        <>
          <circle r={s * 0.58} />
          <path d={triDown(0.52)} />
        </>
      );
    case "third-eye": // inverted triangle beneath the bindu
      return (
        <>
          <path d={`M 0 ${s * 0.5} L ${s * 0.52} ${-s * 0.28} L ${-s * 0.52} ${-s * 0.28} Z`} />
          <circle cy={-s * 0.58} r={s * 0.13} fill={color} stroke="none" />
        </>
      );
    case "crown": // the still point within the thousand petals
      return (
        <>
          <circle r={s * 0.5} />
          <circle r={s * 0.13} fill={color} stroke="none" />
        </>
      );
    default:
      return <circle r={s * 0.5} />;
  }
}

function ChakraSymbol({ id, r, color }: { id: string; r: number; color: string }) {
  const petals = SYMBOL_PETALS[id] ?? 8;
  const d = petalPath(r, petals);
  return (
    <g stroke={color} fill="none" strokeWidth={r * 0.1} strokeLinejoin="round">
      {Array.from({ length: petals }, (_, k) => (
        <path
          key={k}
          d={d}
          fill={color}
          fillOpacity={0.22}
          transform={`rotate(${(360 / petals) * k})`}
        />
      ))}
      <circle r={r * 0.46} />
      {glyph(id, r * 0.46, color)}
    </g>
  );
}

/* ------------------------------------------------------------- component */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function ChakraExperience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [cycleKey, setCycleKey] = useState(0); // bump to restart the cycle clock
  const reduced = usePrefersReducedMotion();

  const bowlRef = useRef<Bowl | null>(null);
  const soundOnRef = useRef(false);
  soundOnRef.current = soundOn;
  const activeIdxRef = useRef(activeIdx);
  activeIdxRef.current = activeIdx;

  useEffect(() => {
    return () => {
      void bowlRef.current?.ctx.close();
      bowlRef.current = null;
    };
  }, []);

  // Auto-cycle root → crown; paused under reduced motion and while the tab
  // is hidden. Each advance re-strikes the bowl softly when sound is on.
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActiveIdx((i) => {
        const next = (i + 1) % CHAKRAS.length;
        if (soundOnRef.current && bowlRef.current) {
          strikeBowl(bowlRef.current, CHAKRAS[next].frequency, 0.55);
        }
        return next;
      });
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, cycleKey]);

  const select = useCallback((i: number) => {
    setActiveIdx(i);
    setCycleKey((k) => k + 1); // give the visitor a full cycle on their choice
    if (soundOnRef.current && bowlRef.current) {
      strikeBowl(bowlRef.current, CHAKRAS[i].frequency, 1);
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      if (on) {
        // fade the room quiet, then rest the context
        const bowl = bowlRef.current;
        if (bowl) {
          const t = bowl.ctx.currentTime;
          bowl.master.gain.cancelScheduledValues(t);
          bowl.master.gain.setValueAtTime(bowl.master.gain.value, t);
          bowl.master.gain.linearRampToValueAtTime(0.0001, t + 0.35);
          window.setTimeout(() => void bowl.ctx.suspend(), 400);
        }
        return false;
      }
      if (!bowlRef.current) bowlRef.current = makeBowl();
      const bowl = bowlRef.current;
      void bowl.ctx.resume();
      const t = bowl.ctx.currentTime;
      bowl.master.gain.cancelScheduledValues(t);
      bowl.master.gain.setValueAtTime(0.0001, t);
      bowl.master.gain.linearRampToValueAtTime(0.5, t + 0.25);
      strikeBowl(bowl, CHAKRAS[activeIdxRef.current].frequency, 1);
      return true;
    });
  }, []);

  const active = CHAKRAS[activeIdx];
  const gold = "#c9a464";

  return (
    <div className={s.stage}>
      {/* ------------------------------------------------ figure + orbs */}
      <div className={s.figureWrap}>
        <svg
          className={s.svg}
          viewBox="0 0 440 480"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
          aria-hidden="false"
          role="group"
          aria-label="Seated meditation figure with the seven chakras. Use the chakra list to explore each energy center."
        >
          <defs>
            <radialGradient id="ck-aura" cx="50%" cy="46%" r="55%">
              <stop offset="0%" stopColor={gold} stopOpacity="0.13" />
              <stop offset="60%" stopColor={gold} stopOpacity="0.05" />
              <stop offset="100%" stopColor={gold} stopOpacity="0" />
            </radialGradient>
            {CHAKRAS.map((c) => (
              <radialGradient key={c.id} id={`ck-glow-${c.id}`}>
                <stop offset="0%" stopColor={c.hex} stopOpacity="0.9" />
                <stop offset="45%" stopColor={c.hex} stopOpacity="0.32" />
                <stop offset="100%" stopColor={c.hex} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* gold line-art silhouette, seated lotus, front-facing */}
          <g className={s.figure}>
            <ellipse cx={CX} cy={235} rx={200} ry={230} fill="url(#ck-aura)" />
            <g
              fill="none"
              stroke={gold}
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.9}
            >
              {/* head */}
              <circle cx={CX} cy={108} r={42} />
              {/* neck */}
              <path d="M 202 148 C 203 158, 202 164, 199 170" />
              <path d="M 238 148 C 237 158, 238 164, 241 170" />
              {/* shoulders + torso sides into hips */}
              <path d="M 199 170 C 168 176, 150 190, 146 220 C 142 252, 150 292, 147 330" />
              <path d="M 241 170 C 272 176, 290 190, 294 220 C 298 252, 290 292, 293 330" />
              {/* arms resting outward to the knees */}
              <path d="M 150 194 C 122 208, 108 244, 111 288 C 113 318, 122 348, 143 366" />
              <path d="M 290 194 C 318 208, 332 244, 329 288 C 327 318, 318 348, 297 366" />
              {/* hands resting upward on the knees */}
              <path d="M 143 366 C 136 374, 138 382, 148 384 C 158 386, 166 380, 164 372" />
              <path d="M 297 366 C 304 374, 302 382, 292 384 C 282 386, 274 380, 276 372" />
              {/* crossed legs — lotus base */}
              <path d="M 147 330 C 112 348, 78 376, 71 406 C 66 428, 90 441, 132 441 C 178 441, 206 430, 220 421" />
              <path d="M 293 330 C 328 348, 362 376, 369 406 C 374 428, 350 441, 308 441 C 262 441, 234 430, 220 421" />
              {/* ankles crossing at the center */}
              <path d="M 182 430 C 198 416, 242 416, 258 430" opacity={0.7} />
            </g>
            {/* ground */}
            <ellipse
              cx={CX}
              cy={452}
              rx={172}
              ry={9}
              fill="none"
              stroke={gold}
              strokeWidth={1}
              opacity={0.3}
            />
          </g>

          {/* chakra orbs, root first so the entrance cascades upward */}
          {CHAKRAS.map((c, i) => {
            const isActive = i === activeIdx;
            return (
              <g
                key={c.id}
                className={isActive ? `${s.orb} ${s.orbActive}` : s.orb}
                style={{ animationDelay: `${150 + i * 80}ms` }}
                role="button"
                tabIndex={0}
                aria-label={`${c.english} chakra — ${c.sanskrit}, ${c.frequency} hertz`}
                aria-pressed={isActive}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(i);
                  }
                }}
              >
                {isActive && (
                  <>
                    {[0, 0.93, 1.87].map((d) => (
                      <circle
                        key={d}
                        className={s.ripple}
                        style={{ animationDelay: `${d}s` }}
                        cx={CX}
                        cy={c.y}
                        r={16}
                        fill="none"
                        stroke={c.hex}
                        strokeWidth={1.5}
                      />
                    ))}
                  </>
                )}
                <circle
                  className={s.halo}
                  style={{ animationDelay: `${-i * 0.8}s` }}
                  cx={CX}
                  cy={c.y}
                  r={30}
                  fill={`url(#ck-glow-${c.id})`}
                />
                <g transform={`translate(${CX} ${c.y})`}>
                  <g className={s.core}>
                    {/* dark backing disc so the glyph reads over the gold line art */}
                    <circle r={16} fill="rgba(10, 9, 16, 0.55)" />
                    <ChakraSymbol id={c.id} r={14} color={c.hex} />
                  </g>
                </g>
                {/* generous invisible hit target (figure shrinks on phones) */}
                <circle cx={CX} cy={c.y} r={34} fill="transparent" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* --------------------------------- sound toggle / list / panel.
          Direct children of the stage grid so the info panel can sit
          beside the figure on medium and small screens. */}
      <div className={s.soundBar}>
        <button
          type="button"
          className={soundOn ? `${s.soundBtn} ${s.soundBtnOn}` : s.soundBtn}
          aria-pressed={soundOn}
          onClick={toggleSound}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M4 10 v4 h4 l5 4 V6 L8 10 Z"
              fill="currentColor"
            />
            {soundOn && (
              <path
                d="M16 9 a4 4 0 0 1 0 6 M18.5 7 a7.5 7.5 0 0 1 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
          {soundOn ? "Sound on" : "Hear your chakras"}
        </button>
        <p className={s.soundNote}>
          Gentle crystal-bowl tones — each chakra sings its own note.
        </p>
      </div>

      <div className={s.list} role="group" aria-label="Choose a chakra">
        {[...CHAKRAS]
          .slice()
          .reverse()
          .map((c) => {
            const i = CHAKRAS.indexOf(c);
            const isActive = i === activeIdx;
            return (
              <button
                key={c.id}
                type="button"
                className={
                  isActive ? `${s.listBtn} ${s.listBtnActive}` : s.listBtn
                }
                aria-pressed={isActive}
                onClick={() => select(i)}
              >
                <svg
                  className={s.listSym}
                  viewBox="-16 -16 32 32"
                  style={{ color: c.hex }}
                  aria-hidden="true"
                >
                  <ChakraSymbol id={c.id} r={14} color={c.hex} />
                </svg>
                {c.english}
                <em className={s.listSanskrit}>{c.sanskrit}</em>
              </button>
            );
          })}
      </div>

      <div className={s.panelArea} aria-live="polite">
        <div className={s.panel} style={{ borderLeftColor: active.hex }}>
          <div key={active.id} className={s.panelInner}>
            <div className={s.panelEyebrow} style={{ color: active.hex }}>
              {active.colorName} · {active.frequency} Hz
            </div>
            <div className={s.panelName}>
              {active.english} <em>· {active.sanskrit}</em>
            </div>
            <div className={s.panelMeta}>
              <span className={s.metaChip}>
                Bowl note <strong>{active.bowlNote}</strong>
              </span>
              <span className={s.metaChip}>
                <strong>{active.frequency} Hz</strong> solfeggio
              </span>
              <span className={s.metaChip}>{active.colorName}</span>
            </div>
            <p className={s.panelBody}>{active.supports}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
