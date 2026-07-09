"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal choreography, applied automatically to the site's core blocks.
 * Respects prefers-reduced-motion.
 */
export default function MotionFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const selectors = [
      ".card", ".menu-item", ".step", ".tier", ".product-card",
      "section h2", ".svc-photo img", "blockquote", ".photo-strip img",
    ];
    const els = document.querySelectorAll<HTMLElement>(selectors.join(","));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("rv-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el, i) => {
      if (el.classList.contains("rv-in")) return;
      el.classList.add("rv");
      // stagger siblings gently
      el.style.transitionDelay = `${(i % 4) * 90}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
