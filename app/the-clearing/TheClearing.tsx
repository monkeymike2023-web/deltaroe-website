"use client";

/* The Clearing — a tiny ritual for heavy days.
   Seven rounds, root → crown. Each round floats five heavy words (dark glass
   shards — tap to shatter, soft bowl strike) and three bright words (glowing
   motes — tap to gather into the golden vessel, brighter strike). Nothing is
   ever lost: uncollected motes drift home on their own at round end. No
   timer, no score, no failure — the pacing is deliberately unhurried.

   Motion rules: compositor-only transforms/opacity, entrance choreography
   under 1.2s, seamless idle loops, full prefers-reduced-motion fallback
   (static grid, fade dissolves, no particles). Audio is the shared modal
   bowl synthesis in lib/bowl-audio.ts, created on a user gesture. */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CHAKRAS } from "@/lib/chakras";
import { SITE } from "@/lib/site";
import {
  type Bowl,
  makeBowl,
  strikeBowl,
  strikeGlass,
  hushBowl,
  wakeBowl,
} from "@/lib/bowl-audio";
import ChakraSymbol from "../components/ChakraSymbol";
import s from "./TheClearing.module.css";

/* ------------------------------------------------------------------ data */

// Warm, human words — heavy ones to break, bright ones to keep.
// Quoted entries are the thoughts we say to ourselves, so they keep their quotes.
const ROUND_WORDS: { neg: string[]; pos: string[] }[] = [
  {
    neg: ["fear", "insecurity", "scarcity", "“not enough”", "instability"],
    pos: ["grounded", "safe", "steady"],
  },
  {
    neg: ["guilt", "numbness", "“too much”", "shame about joy", "stuck"],
    pos: ["creative", "alive", "flowing"],
  },
  {
    neg: ["self-doubt", "powerless", "“who am I to…”", "criticism", "hesitation"],
    pos: ["confident", "capable", "bold"],
  },
  {
    neg: ["grief", "resentment", "walls up", "old wounds", "bitterness"],
    pos: ["loved", "open", "forgiven"],
  },
  {
    neg: ["unsaid words", "swallowed truth", "“keep quiet”", "people-pleasing", "silence"],
    pos: ["heard", "honest", "clear-voiced"],
  },
  {
    neg: ["overthinking", "fog", "doubt in yourself", "“what if”", "noise"],
    pos: ["clear", "intuitive", "knowing"],
  },
  {
    neg: ["disconnection", "loneliness", "“just going through motions”", "emptiness", "heaviness"],
    pos: ["connected", "whole", "at peace"],
  },
];

// Three hand-tuned scatter layouts (percent coords), cycled across rounds
// with a little seeded jitter so no two rounds sit identically. The lower
// band (y > 68) is reserved for the vessel and its gathered words.
const LAYOUTS = [
  {
    shards: [[16, 16], [52, 9], [84, 22], [30, 44], [68, 50]],
    motes: [[8, 48], [46, 64], [88, 58]],
  },
  {
    shards: [[22, 10], [70, 13], [12, 42], [46, 34], [80, 52]],
    motes: [[32, 62], [64, 60], [90, 30]],
  },
  {
    shards: [[32, 12], [78, 9], [14, 30], [60, 38], [34, 58]],
    motes: [[10, 60], [86, 46], [56, 16]],
  },
];

// Narrow screens get their own layouts: two staggered columns (x = 27 / 73)
// over a taller field, so nothing can collide or hide behind the chat bubble.
const LAYOUTS_NARROW = [
  {
    shards: [[27, 8], [73, 13], [27, 26], [73, 31], [27, 44]],
    motes: [[68, 49], [28, 60], [58, 65]],
  },
  {
    shards: [[73, 8], [27, 13], [73, 26], [27, 31], [73, 44]],
    motes: [[32, 49], [62, 60], [30, 65]],
  },
];

// Angular dark-glass silhouettes, one per shard.
const SHARD_CLIPS = [
  "polygon(50% 0%, 95% 28%, 82% 90%, 30% 100%, 0% 55%, 12% 18%)",
  "polygon(20% 0%, 100% 12%, 88% 70%, 55% 100%, 8% 82%, 0% 30%)",
  "polygon(38% 0%, 88% 8%, 100% 55%, 70% 100%, 12% 92%, 0% 38%)",
  "polygon(55% 0%, 100% 35%, 85% 85%, 40% 100%, 0% 70%, 8% 22%)",
  "polygon(30% 0%, 78% 5%, 100% 42%, 80% 95%, 25% 100%, 0% 50%)",
];

const ROUND_INTRO_MS = 2400; // lotus + name breathes before play begins
const SHATTER_MS = 760; // fragments fly, arc under gravity, fade
const GLIDE_MS = 900; // mote travels home to the vessel

// The release: chain-break cadence. Each link glows for a beat, then snaps
// on its chakra's bowl tone — the ascending seven-note scale IS the sound
// of the chain breaking.
const CHAIN_START_MS = 700;
const CHAIN_STEP_MS = 580;
const CHAIN_GLOW_MS = 280;

/* --------------------------------------------------------------- helpers */

// Deterministic pseudo-random — stable per (round, item), no hydration drift.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

// Ink text on the bright chakras (solar, sacral), warm cream on the dark ones.
function inkOn(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum =
    (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? "#241c10" : "#fdf6e6";
}

// Shatter fragments: 12 directions with jitter, varied reach and spin,
// precomputed once. The keyframes add a gravity arc on the back half.
const FRAGS = Array.from({ length: 12 }, (_, k) => {
  const a = (k / 12) * Math.PI * 2 + rand(k) * 0.5;
  const d = 44 + rand(k + 7) * 56;
  return {
    x: Math.round(Math.cos(a) * d),
    y: Math.round(Math.sin(a) * d - 10),
    r: Math.round((rand(k + 3) - 0.5) * 320),
  };
});

// Finale constellation: golden-angle spiral, gently squashed to the frame.
function constellationPos(i: number, n: number) {
  const a = (i * 137.508 * Math.PI) / 180;
  const r = 9 + 37 * Math.sqrt((i + 0.7) / n);
  return {
    x: Math.min(90, Math.max(10, 50 + r * Math.cos(a) * 1.12)),
    y: Math.min(76, Math.max(10, 44 + r * Math.sin(a) * 0.8)),
  };
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/* -------------------------------------------------------------- component */

type Phase = "intro" | "roundIntro" | "playing" | "release" | "finale";
type ItemState = "idle" | "leaving" | "gone";
type LinkState = "idle" | "glow" | "broken";
type Kept = { word: string; hex: string };

export default function TheClearing() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [round, setRound] = useState(0);
  const [shards, setShards] = useState<ItemState[]>(Array(5).fill("idle"));
  const [motes, setMotes] = useState<ItemState[]>(Array(3).fill("idle"));
  const [gathered, setGathered] = useState<Kept[]>([]);
  const [chain, setChain] = useState<LinkState[]>(Array(7).fill("idle"));
  const [chainDone, setChainDone] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [live, setLive] = useState("");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const narrow = useMediaQuery("(max-width: 600px)");

  const bowlRef = useRef<Bowl | null>(null);
  const soundOnRef = useRef(false);
  soundOnRef.current = soundOn;
  const roundRef = useRef(0);
  roundRef.current = round;
  const motesRef = useRef(motes);
  motesRef.current = motes;
  const shardsRef = useRef(shards);
  shardsRef.current = shards;
  const reducedRef = useRef(false);
  reducedRef.current = reduced;
  const roundEndingRef = useRef(false);

  const lanternRef = useRef<HTMLDivElement | null>(null);
  const moteSlotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const timersRef = useRef<number[]>([]);
  const after = useCallback((ms: number, fn: () => void) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      void bowlRef.current?.ctx.close();
      bowlRef.current = null;
    };
  }, []);

  const strike = useCallback((freq: number, velocity: number) => {
    if (soundOnRef.current && bowlRef.current) {
      strikeBowl(bowlRef.current, freq, velocity);
    }
  }, []);

  const glass = useCallback((velocity: number) => {
    if (soundOnRef.current && bowlRef.current) {
      strikeGlass(bowlRef.current, velocity);
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      if (on) {
        if (bowlRef.current) hushBowl(bowlRef.current);
        return false;
      }
      if (!bowlRef.current) bowlRef.current = makeBowl();
      const bowl = bowlRef.current;
      wakeBowl(bowl);
      strikeBowl(bowl, CHAKRAS[roundRef.current].frequency, 0.7);
      return true;
    });
  }, []);

  const startRound = useCallback(
    (r: number) => {
      roundEndingRef.current = false;
      setRound(r);
      setShards(Array(5).fill("idle"));
      setMotes(Array(3).fill("idle"));
      moteSlotRefs.current = [];
      setPhase("roundIntro");
      const c = CHAKRAS[r];
      setLive(
        `Round ${r + 1} of 7 — the ${c.english} chakra. Five heavy words to break, three bright ones to gather. Take your time.`
      );
      strike(c.frequency, 0.4);
      after(ROUND_INTRO_MS, () => setPhase("playing"));
    },
    [after, strike]
  );

  const begin = useCallback(() => {
    setGathered([]);
    startRound(0);
  }, [startRound]);

  const breakShard = useCallback(
    (i: number) => {
      if (shardsRef.current[i] !== "idle") return;
      setShards((prev) => prev.map((v, k) => (k === i ? "leaving" : v)));
      // bowl sits a touch lower so the glass crack can glint on top of it
      strike(CHAKRAS[roundRef.current].frequency, 0.42);
      glass(0.9);
      after(reducedRef.current ? 420 : SHATTER_MS, () =>
        setShards((prev) => prev.map((v, k) => (k === i ? "gone" : v)))
      );
    },
    [after, strike, glass]
  );

  // The release: seven links snap root → crown on the ascending bowl scale,
  // then the remnants rise away as light and the constellation assembles.
  const startRelease = useCallback(() => {
    setChain(Array(7).fill("idle"));
    setChainDone(false);
    setPhase("release");
    setLive(
      "The things that were weighing you down held together as a chain. Root to crown, it is breaking."
    );
    for (let i = 0; i < 7; i++) {
      const at = CHAIN_START_MS + i * CHAIN_STEP_MS;
      after(at, () =>
        setChain((p) => p.map((v, k) => (k === i ? "glow" : v)))
      );
      after(at + CHAIN_GLOW_MS, () => {
        setChain((p) => p.map((v, k) => (k === i ? "broken" : v)));
        strike(CHAKRAS[i].frequency, 0.55 + i * 0.05);
        glass(0.5);
      });
    }
    const end = CHAIN_START_MS + 6 * CHAIN_STEP_MS + CHAIN_GLOW_MS + 750;
    after(end, () => {
      setChainDone(true);
      setLive("Released.");
    });
    after(end + 2300, () => {
      setPhase("finale");
      setLive(
        "The ritual is complete. Everything you gathered is waiting for you below — all twenty-one words, kept."
      );
    });
  }, [after, strike, glass]);

  const collectMote = useCallback(
    (i: number, auto = false) => {
      if (motesRef.current[i] !== "idle") return;
      const r = roundRef.current;
      // aim the glide at the vessel (percent-positioned slot → pixel delta)
      const el = moteSlotRefs.current[i];
      const lant = lanternRef.current;
      if (el && lant && !reducedRef.current) {
        const a = el.getBoundingClientRect();
        const b = lant.getBoundingClientRect();
        el.style.setProperty(
          "--dx",
          `${b.left + b.width / 2 - (a.left + a.width / 2)}px`
        );
        el.style.setProperty(
          "--dy",
          `${b.top + b.height * 0.4 - (a.top + a.height / 2)}px`
        );
      }
      setMotes((prev) => prev.map((v, k) => (k === i ? "leaving" : v)));
      strike(CHAKRAS[r].frequency, auto ? 0.45 : 1);
      const kept: Kept = { word: ROUND_WORDS[r].pos[i], hex: CHAKRAS[r].hex };
      after(reducedRef.current ? 420 : GLIDE_MS, () => {
        setMotes((prev) => prev.map((v, k) => (k === i ? "gone" : v)));
        setGathered((g) => [...g, kept]);
      });
    },
    [after, strike]
  );

  // Round completes when every shard is broken. Any bright words still
  // floating drift home on their own — nothing is ever lost — then we move on.
  useEffect(() => {
    if (phase !== "playing") return;
    if (!shards.every((v) => v !== "idle")) return;
    if (roundEndingRef.current) return;
    roundEndingRef.current = true;

    const idleMotes = motesRef.current
      .map((m, i) => (m === "idle" ? i : -1))
      .filter((i) => i >= 0);
    idleMotes.forEach((mi, k) => {
      after(400 + k * 300, () => collectMote(mi, true));
    });
    const settle = 400 + idleMotes.length * 300 + (reducedRef.current ? 600 : 1300);
    after(settle, () => {
      const r = roundRef.current;
      if (r < CHAKRAS.length - 1) {
        startRound(r + 1);
      } else {
        startRelease();
      }
    });
  }, [shards, phase, after, collectMote, startRound, startRelease]);

  /* ------------------------------------------------------------- render */

  const chakra = CHAKRAS[round];
  const words = ROUND_WORDS[round];
  const layout = narrow
    ? LAYOUTS_NARROW[round % LAYOUTS_NARROW.length]
    : LAYOUTS[round % LAYOUTS.length];
  const brokenCount = shards.filter((v) => v !== "idle").length;
  const inRitual = phase === "roundIntro" || phase === "playing";

  // less jitter on narrow screens so the column layout keeps its clearances
  const jitter = (seed: number) => (rand(seed) - 0.5) * (narrow ? 2 : 5);

  return (
    <div className={reduced ? `${s.root} ${s.rootReduced}` : s.root}>
      {/* ceremonial color wash — swaps behind the round-intro veil */}
      <div
        className={s.tint}
        aria-hidden="true"
        style={{
          background:
            phase === "finale"
              ? "radial-gradient(900px 520px at 50% 30%, rgba(201, 164, 100, 0.13), transparent 70%)"
              : phase === "intro"
                ? "radial-gradient(900px 520px at 50% 30%, rgba(201, 164, 100, 0.07), transparent 70%)"
                : `radial-gradient(900px 520px at 50% 26%, ${rgba(chakra.hex, 0.12)}, transparent 70%)`,
        }}
      />

      <p className={s.srOnly} role="status" aria-live="polite">
        {live}
      </p>

      {/* ------------------------------------------------------- intro */}
      {phase === "intro" && (
        <div className={s.intro}>
          <p className={s.introCopy}>
            Life hands you heavy things and expects you to carry every single
            one. Not in here, friend. In here, you get to break what&apos;s been
            weighing on you — and gather up what was yours the whole time.
          </p>
          <p className={s.introNote}>
            Seven rounds, root to crown. No timer, no score, and nothing you
            gather is ever lost. Move as slowly as you like.
          </p>
          <div className={s.introActions}>
            <button type="button" className={s.beginBtn} onClick={begin}>
              Begin the ritual
            </button>
            <button
              type="button"
              className={soundOn ? `${s.soundBtn} ${s.soundBtnOn}` : s.soundBtn}
              aria-pressed={soundOn}
              onClick={toggleSound}
            >
              <SoundIcon on={soundOn} />
              {soundOn ? "Bowls on" : "Hear the bowls"}
            </button>
          </div>
          <p className={s.introSoundNote}>
            Each word you release rings a crystal bowl tuned to that chakra.
          </p>
        </div>
      )}

      {/* ----------------------------------------------------- the ritual */}
      {inRitual && (
        <>
          <div className={s.hud}>
            <div className={s.hudChakra}>
              <svg
                viewBox="-16 -16 32 32"
                className={s.hudGlyph}
                style={{ color: chakra.hex }}
                aria-hidden="true"
              >
                <ChakraSymbol id={chakra.id} r={14} color={chakra.hex} />
              </svg>
              <span className={s.hudName}>
                {chakra.english}
                <em>round {round + 1} of 7</em>
              </span>
            </div>
            <div className={s.hudCount} aria-label={`${brokenCount} of 5 released`}>
              {brokenCount} <span>of 5 released</span>
            </div>
            <button
              type="button"
              className={soundOn ? `${s.soundBtn} ${s.soundBtnOn}` : s.soundBtn}
              aria-pressed={soundOn}
              onClick={toggleSound}
            >
              <SoundIcon on={soundOn} />
              {soundOn ? "Bowls on" : "Hear the bowls"}
            </button>
          </div>

          <div className={s.field}>
            {/* round intro veil: lotus, name, breath */}
            {phase === "roundIntro" && (
              <div className={s.roundIntro} aria-hidden="true">
                <svg
                  viewBox="-20 -20 40 40"
                  className={s.roundIntroGlyph}
                  style={{ color: chakra.hex }}
                >
                  <ChakraSymbol id={chakra.id} r={17} color={chakra.hex} />
                </svg>
                <div className={s.roundIntroName}>{chakra.english}</div>
                <div className={s.roundIntroSub}>
                  release what isn&apos;t yours
                </div>
              </div>
            )}

            {/* five heavy words — dark glass, tap to shatter */}
            {phase === "playing" &&
              words.neg.map((word, i) => {
                const state = shards[i];
                if (state === "gone") return null;
                const [lx, ly] = layout.shards[i];
                return (
                  <div
                    key={`${round}-n-${i}`}
                    className={
                      state === "leaving"
                        ? `${s.slot} ${s.shardSlotLeaving}`
                        : s.slot
                    }
                    style={{
                      // clamp keeps every shard fully on screen at 375px wide
                      left: `clamp(64px, ${lx + jitter(round * 31 + i * 7)}%, calc(100% - 64px))`,
                      top: `clamp(56px, ${ly + jitter(round * 17 + i * 13)}%, calc(100% - 175px))`,
                    }}
                  >
                    <div
                      className={s.drift}
                      style={{
                        animationDelay: `${-rand(round * 5 + i) * 16}s`,
                        animationDuration: `${15 + rand(i + 2) * 7}s`,
                      }}
                    >
                      <button
                        type="button"
                        className={s.shard}
                        style={
                          {
                            clipPath: SHARD_CLIPS[i],
                            animationDelay: `${i * 70}ms`,
                          } as React.CSSProperties
                        }
                        disabled={state !== "idle"}
                        aria-label={`Break the heavy word: ${word.replace(/[“”]/g, "")}`}
                        onClick={() => breakShard(i)}
                      >
                        <span className={s.shardWord}>{word}</span>
                      </button>
                    </div>
                    {state === "leaving" && !reduced && (
                      <span className={s.frags} aria-hidden="true">
                        <span className={s.crackFlash} />
                        {FRAGS.map((f, k) => (
                          <i
                            key={k}
                            style={
                              {
                                "--fx": `${f.x}px`,
                                "--fy": `${f.y}px`,
                                "--fr": `${f.r}deg`,
                                animationDelay: `${k * 14}ms`,
                                borderColor: rgba(chakra.hex, 0.35),
                              } as React.CSSProperties
                            }
                          />
                        ))}
                      </span>
                    )}
                  </div>
                );
              })}

            {/* three bright words — glowing motes, tap to gather */}
            {phase === "playing" &&
              words.pos.map((word, i) => {
                const state = motes[i];
                if (state === "gone") return null;
                const [lx, ly] = layout.motes[i];
                return (
                  <div
                    key={`${round}-p-${i}`}
                    ref={(el) => {
                      moteSlotRefs.current[i] = el;
                    }}
                    className={
                      state === "leaving"
                        ? `${s.slot} ${s.moteSlotLeaving}`
                        : s.slot
                    }
                    style={{
                      left: `clamp(56px, ${lx + jitter(round * 41 + i * 11)}%, calc(100% - 56px))`,
                      top: `clamp(48px, ${ly + jitter(round * 23 + i * 19)}%, calc(100% - 165px))`,
                    }}
                  >
                    <div
                      className={s.driftSoft}
                      style={{
                        animationDelay: `${-rand(round * 9 + i) * 12}s`,
                        animationDuration: `${11 + rand(i + 5) * 5}s`,
                      }}
                    >
                      <button
                        type="button"
                        className={s.mote}
                        style={{
                          animationDelay: `${350 + i * 90}ms`,
                          background: `radial-gradient(circle at 34% 28%, ${rgba(chakra.hex, 0.95)}, ${rgba(chakra.hex, 0.55)})`,
                          boxShadow: `0 0 22px ${rgba(chakra.hex, 0.45)}, 0 0 6px ${rgba(chakra.hex, 0.6)}`,
                          color: inkOn(chakra.hex),
                        }}
                        disabled={state !== "idle"}
                        aria-label={`Gather the bright word: ${word}`}
                        onClick={() => collectMote(i)}
                      >
                        {word}
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* the golden vessel — everything gathered lives here */}
            <div className={s.lanternZone}>
              {gathered.length > 0 && (
                <div className={s.keptRow} aria-hidden="true">
                  {gathered.map((k, i) => (
                    <span
                      key={i}
                      className={s.keptWord}
                      style={{ color: k.hex }}
                    >
                      {k.word}
                    </span>
                  ))}
                </div>
              )}
              <div
                ref={lanternRef}
                className={s.lantern}
                role="status"
                aria-label={`${gathered.length} bright words gathered`}
              >
                {gathered.length > 0 && (
                  <span
                    key={gathered.length}
                    className={s.lanternPulse}
                    aria-hidden="true"
                  />
                )}
                <VesselSvg fill={gathered.length / 21} />
                <span className={s.lanternCount}>
                  {gathered.length} gathered
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ------------------------------------------------- the release */}
      {phase === "release" && (
        <div className={s.release}>
          <div
            className={
              chainDone ? `${s.chainWrap} ${s.chainDissolve}` : s.chainWrap
            }
          >
            <svg
              className={s.chainSvg}
              viewBox="0 0 620 120"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {CHAKRAS.map((c, i) => {
                const cx = 70 + i * 80;
                const state = chain[i];
                const cls =
                  state === "glow"
                    ? `${s.link} ${s.linkGlow}`
                    : state === "broken"
                      ? `${s.link} ${s.linkBroken}`
                      : s.link;
                return (
                  <g
                    key={c.id}
                    className={cls}
                    transform={`translate(${cx} 60) rotate(${i % 2 === 0 ? -5 : 6})`}
                    style={
                      {
                        "--link-c": c.hex,
                        animationDelay: chainDone ? `${i * 50}ms` : undefined,
                      } as React.CSSProperties
                    }
                  >
                    <path className={s.halfL} d="M 0 -24 A 44 24 0 0 0 0 24" />
                    <path className={s.halfR} d="M 0 -24 A 44 24 0 0 1 0 24" />
                  </g>
                );
              })}
            </svg>
            {/* fragment bursts over each snapped link */}
            {!reduced &&
              !chainDone &&
              CHAKRAS.map((c, i) =>
                chain[i] === "broken" ? (
                  <span
                    key={c.id}
                    className={s.frags}
                    style={{ left: `${((70 + i * 80) / 620) * 100}%`, top: "50%" }}
                    aria-hidden="true"
                  >
                    <span className={s.crackFlash} />
                    {FRAGS.map((f, k) => (
                      <i
                        key={k}
                        style={
                          {
                            "--fx": `${f.x}px`,
                            "--fy": `${f.y}px`,
                            "--fr": `${f.r}deg`,
                            animationDelay: `${k * 12}ms`,
                            borderColor: rgba(c.hex, 0.4),
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </span>
                ) : null
              )}
            {chainDone && !reduced && (
              <span className={s.lightRise} aria-hidden="true" />
            )}
          </div>
          {chainDone && (
            <p className={s.releaseCopy}>
              What was holding you — isn&apos;t anymore.
            </p>
          )}
        </div>
      )}

      {/* ------------------------------------------------------- finale */}
      {phase === "finale" && (
        <div className={s.finale}>
          <div className={s.constellation} aria-hidden="true">
            {gathered.map((k, i) => {
              const p = constellationPos(i, gathered.length);
              return (
                <span
                  key={i}
                  className={s.star}
                  style={
                    {
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      "--in-delay": `${i * 90}ms`,
                    } as React.CSSProperties
                  }
                >
                  {k.word}
                </span>
              );
            })}
          </div>
          <p className={s.finaleLive} aria-live="off">
            Gathered and kept: {gathered.map((k) => k.word).join(", ")}.
          </p>
          <h2 className={s.finaleTitle}>
            You cleared what you were carrying.
          </h2>
          <p className={s.finaleCopy}>
            Take the feeling with you, friend — it was yours the whole time. And if
            you want more than a screen&apos;s worth, thirty unbroken minutes
            of this feeling exists: lying down in candlelight while real
            crystal bowls sing over you, root to crown.
          </p>
          <div className={s.finaleActions}>
            <a className={s.beginBtn} href={SITE.bookingUrl}>
              Book a Sound Bath
            </a>
            <Link className={s.ghostBtn} href="/sound-chakras">
              Meet your seven chakras →
            </Link>
          </div>
          <button type="button" className={s.againLink} onClick={begin}>
            Begin again
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- fragments */

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path d="M4 10 v4 h4 l5 4 V6 L8 10 Z" fill="currentColor" />
      {on && (
        <path
          d="M16 9 a4 4 0 0 1 0 6 M18.5 7 a7.5 7.5 0 0 1 0 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

// The golden vessel. Its inner light grows as words come home.
function VesselSvg({ fill }: { fill: number }) {
  const gold = "#c9a464";
  return (
    <svg viewBox="0 0 96 74" className={s.lanternSvg} aria-hidden="true">
      <ellipse
        cx="48"
        cy="36"
        rx="20"
        ry="7"
        fill={gold}
        opacity={0.12 + fill * 0.55}
        style={{ filter: "blur(3px)" }}
      />
      <ellipse
        cx="48"
        cy="31"
        rx="26"
        ry="7.5"
        fill="none"
        stroke={gold}
        strokeWidth="1.6"
        opacity="0.9"
      />
      <path
        d="M22 31 C 22 52, 33 63, 48 63 C 63 63, 74 52, 74 31"
        fill="none"
        stroke={gold}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M41 63 L 55 63 L 52 69 L 44 69 Z"
        fill="none"
        stroke={gold}
        strokeWidth="1.4"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <ellipse
        cx="48"
        cy="70.5"
        rx="16"
        ry="1.8"
        fill="none"
        stroke={gold}
        strokeWidth="1"
        opacity="0.35"
      />
    </svg>
  );
}
