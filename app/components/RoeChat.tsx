"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { findAnswer, GREETING, GREETING_CHIPS, FALLBACK, FALLBACK_CHIPS } from "@/lib/roe-kb";

type Msg = {
  role: "roe" | "user";
  text: string;
  link?: { href: string; label: string };
  chips?: string[];
};

export default function RoeChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setMsgs([{ role: "roe", text: GREETING, chips: GREETING_CHIPS }]);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [open, msgs.length]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function ask(text: string) {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const entry = findAnswer(text);
    const delay = 700 + Math.min(1100, text.length * 18);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [
        ...m,
        entry
          ? { role: "roe", text: entry.answer, link: entry.link, chips: entry.chips }
          : { role: "roe", text: FALLBACK, chips: FALLBACK_CHIPS },
      ]);
    }, delay);
  }

  return (
    <>
      <button
        className={open ? "roe-fab open" : "roe-fab"}
        aria-label={open ? "Close chat with Roe" : "Chat with Roe, the Delta Roe guide"}
        onClick={() => {
          setOpen(!open);
          setUnread(false);
        }}
      >
        {open ? (
          <span className="roe-fab-x">×</span>
        ) : (
          <>
            <Image src="/emblem.png" alt="" width={56} height={56} />
            {unread && <span className="roe-dot" aria-hidden="true" />}
          </>
        )}
      </button>

      {open && (
        <div className="roe-panel" role="dialog" aria-label="Chat with Roe">
          <div className="roe-head">
            <Image src="/emblem.png" alt="" width={38} height={38} style={{ borderRadius: "50%" }} />
            <div>
              <div className="roe-name">Roe</div>
              <div className="roe-sub">Your guide at Delta Roe</div>
            </div>
          </div>

          <div className="roe-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`roe-msg ${m.role}`}>
                <div className="bubble">
                  {m.text}
                  {m.link &&
                    (m.link.href.startsWith("http") ? (
                      <a className="roe-cta" href={m.link.href}>
                        {m.link.label} →
                      </a>
                    ) : (
                      <Link className="roe-cta" href={m.link.href} onClick={() => setOpen(false)}>
                        {m.link.label} →
                      </Link>
                    ))}
                </div>
                {m.role === "roe" && m.chips && i === msgs.length - 1 && !typing && (
                  <div className="roe-chips">
                    {m.chips.map((c) => (
                      <button key={c} onClick={() => ask(c)}>
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="roe-msg roe">
                <div className="bubble roe-typing" aria-label="Roe is typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          <form
            className="roe-input"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything, love…"
              aria-label="Type your question"
            />
            <button type="submit" aria-label="Send">➤</button>
          </form>
        </div>
      )}
    </>
  );
}
