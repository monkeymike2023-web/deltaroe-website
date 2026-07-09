"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

export default function SoundSample() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
    }
  }

  return (
    <div className="sound-sample">
      <audio ref={audioRef} src="/audio/sound-bath-sample.mp3" preload="none" />
      <div className="ss-stage">
        <span className={playing ? "ss-ring r1 on" : "ss-ring r1"} aria-hidden="true" />
        <span className={playing ? "ss-ring r2 on" : "ss-ring r2"} aria-hidden="true" />
        <span className={playing ? "ss-ring r3 on" : "ss-ring r3"} aria-hidden="true" />
        <button
          className="ss-btn"
          onClick={toggle}
          aria-label={playing ? "Pause the sound bath sample" : "Play a 60-second sound bath sample"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              <rect x="5" y="4" width="5" height="16" fill="currentColor" />
              <rect x="14" y="4" width="5" height="16" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M7 4 L20 12 L7 20 Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <svg className="ss-arc" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="56" fill="none" stroke="var(--line)" strokeWidth="2" />
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${progress * 351.8} 351.8`}
            transform="rotate(-90 60 60)"
          />
        </svg>
      </div>
      <div className="ss-copy">
        <div className="eyebrow">Press play · headphones on 🎧</div>
        <h3>Sixty seconds of 432 Hz</h3>
        <p>
          Left ear and right ear receive slightly different frequencies — the
          slow pulse you feel between them is a 6&nbsp;Hz theta binaural beat,
          gently tuning your brain toward the edge of sleep. Now imagine
          thirty unbroken minutes of this, live, wrapped in blankets in a
          candle-lit room.
        </p>
        <a className="btn btn-solid" href={SITE.bookingUrl}>
          Feel the Full 30 Minutes — $77
        </a>
      </div>
    </div>
  );
}
