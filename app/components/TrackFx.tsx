"use client";

// Focus-group engagement tracking (Vercel Web Analytics custom events).
// One delegated listener + per-page scroll/linger milestones — no per-button
// wiring needed. Events show under the project's Analytics -> Events tab:
//   booking_click / call_click / email_click / directions_click / yelp_click
//   service_click {service} / shop_click / chat_open
//   scroll_depth {page, depth} / engaged {page, seconds}
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

export default function TrackFx() {
  const pathname = usePathname();

  // click delegation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a, button");
      if (!el) return;
      const href = (el.getAttribute("href") || "").toLowerCase();
      const label = `${el.getAttribute("aria-label") || ""} ${el.textContent || ""}`.toLowerCase();
      const page = window.location.pathname;
      if (href.includes("book-online") || label.includes("book ")) track("booking_click", { page });
      else if (href.startsWith("tel:")) track("call_click", { page });
      else if (href.startsWith("mailto:")) track("email_click", { page });
      else if (href.includes("yelp.com")) track("yelp_click", { page });
      else if (href.includes("google.com/maps")) track("directions_click", { page });
      else if (href.startsWith("/services/")) track("service_click", { service: href.split("/")[2] ?? "", page });
      else if (href.startsWith("/shop")) track("shop_click", { page });
      else if (el.tagName === "BUTTON" && label.includes("chat")) track("chat_open", { page });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // scroll depth + linger, reset per page
  useEffect(() => {
    const page = pathname || "/";
    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const d of [25, 50, 75, 100]) {
        if (pct >= d && !fired.has(d)) {
          fired.add(d);
          track("scroll_depth", { page, depth: d });
        }
      }
    };
    const timers = [30, 60, 180].map((s) =>
      window.setTimeout(() => {
        if (document.visibilityState === "visible") track("engaged", { page, seconds: s });
      }, s * 1000),
    );
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
