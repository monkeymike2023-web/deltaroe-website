"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHAKRAS } from "@/lib/chakras";
import {
  type Bowl,
  makeBowl,
  strikeBowl,
  hushBowl,
  wakeBowl,
} from "@/lib/bowl-audio";
import ChakraSymbol from "../components/ChakraSymbol";
import s from "./ChakraExperience.module.css";

const CYCLE_MS = 10000; // long enough to read the panel before it moves on
const CX = 220; // figure midline in the 440x480 viewBox

/* Audio (modal bowl synthesis) lives in lib/bowl-audio.ts — shared with
   /the-clearing. Created lazily on the user's "Enable sound" gesture
   (autoplay policy). The chakra glyphs live in components/ChakraSymbol. */

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
        if (bowlRef.current) hushBowl(bowlRef.current);
        return false;
      }
      if (!bowlRef.current) bowlRef.current = makeBowl();
      const bowl = bowlRef.current;
      wakeBowl(bowl);
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
