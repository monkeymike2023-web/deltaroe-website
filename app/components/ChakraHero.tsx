"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { CHAKRAS } from "@/lib/chakras";
import s from "./ChakraHero.module.css";

/* Homepage hero: the breathing seven-chakra figure from /sound-chakras is the
   front door — auto-cycling glow + bowl ripples, NO audio, no figure
   controls. The figure is decorative (aria-hidden); headline, sub-line, and
   the two gold CTAs carry the meaning. Booking stays above the fold as the
   secondary CTA. Silhouette path data is shared verbatim with
   app/sound-chakras/ChakraExperience.tsx. */

const CYCLE_MS = 3200;
const CX = 220; // figure midline in the 440x480 viewBox
const GOLD = "#c9a464";

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

export default function ChakraHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [inView, setInView] = useState(true);
  const reduced = usePrefersReducedMotion();
  const figureRef = useRef<HTMLDivElement>(null);

  // Only cycle while the figure is actually on screen.
  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-cycle root → crown; paused under reduced motion, off-screen,
  // and while the tab is hidden.
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActiveIdx((i) => (i + 1) % CHAKRAS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView]);

  const active = CHAKRAS[activeIdx];

  return (
    <div className={s.hero}>
      <div className={s.inner}>
        {/* ----------------------------------------------------- copy */}
        <div className={s.copy}>
          <div className="eyebrow">
            Reiki · Sound Baths · Chakra Alignment — Elk Grove, CA
          </div>
          <h1 style={{ margin: "16px 0 0" }}>Hear Your Chakras</h1>
          <p className="lede" style={{ maxWidth: 560, margin: "18px 0 0" }}>
            Seven energy centers, seven crystal bowls. In a Delta Roe sound
            bath, each glowing center answers to its own frequency — reiki,
            432&nbsp;Hz sound, and stillness in a candle-lit sanctuary in
            historic Old Town Elk Grove.
          </p>
          <div className={s.ctas}>
            <Link className="btn btn-solid" href="/sound-chakras">
              Experience it &rarr;
            </Link>
            <a className="btn btn-ghost" href={SITE.bookingUrl}>
              Book a Session
            </a>
          </div>
        </div>

        {/* --------------------------------------------- figure + orbs */}
        <div className={s.figureWrap} ref={figureRef} aria-hidden="true">
          <svg
            className={s.svg}
            viewBox="0 0 440 480"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="hk-aura" cx="50%" cy="46%" r="55%">
                <stop offset="0%" stopColor={GOLD} stopOpacity="0.13" />
                <stop offset="60%" stopColor={GOLD} stopOpacity="0.05" />
                <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
              </radialGradient>
              {CHAKRAS.map((c) => (
                <radialGradient key={c.id} id={`hk-glow-${c.id}`}>
                  <stop offset="0%" stopColor={c.hex} stopOpacity="0.9" />
                  <stop offset="45%" stopColor={c.hex} stopOpacity="0.32" />
                  <stop offset="100%" stopColor={c.hex} stopOpacity="0" />
                </radialGradient>
              ))}
            </defs>

            {/* gold line-art silhouette, seated lotus, front-facing */}
            <g className={s.figure}>
              <ellipse cx={CX} cy={235} rx={200} ry={230} fill="url(#hk-aura)" />
              <g
                fill="none"
                stroke={GOLD}
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
                stroke={GOLD}
                strokeWidth={1}
                opacity={0.3}
              />
            </g>

            {/* chakra orbs — cascade in root → crown, then one sings at a time */}
            {CHAKRAS.map((c, i) => {
              const isActive = i === activeIdx;
              return (
                <g
                  key={c.id}
                  className={isActive ? `${s.orb} ${s.orbActive}` : s.orb}
                  style={{ animationDelay: `${250 + i * 70}ms` }}
                >
                  {isActive &&
                    [0, 1.4].map((d) => (
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
                  <circle
                    className={s.halo}
                    style={{ animationDelay: `${-i * 0.8}s` }}
                    cx={CX}
                    cy={c.y}
                    r={30}
                    fill={`url(#hk-glow-${c.id})`}
                  />
                  <circle
                    className={s.core}
                    cx={CX}
                    cy={c.y}
                    r={8}
                    fill={c.hex}
                    stroke="rgba(255, 255, 255, 0.55)"
                    strokeWidth={1}
                  />
                </g>
              );
            })}
          </svg>

          {/* live caption — which bowl is "singing" right now */}
          <p className={s.caption}>
            <span key={active.id} className={s.captionInner}>
              <span
                className={s.captionDot}
                style={{ background: active.hex, color: active.hex }}
              />
              {active.english} · {active.frequency} Hz · Bowl note{" "}
              {active.bowlNote}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
