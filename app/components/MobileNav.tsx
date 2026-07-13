"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE, NAV, NAV_MOBILE_EXTRA } from "@/lib/site";

// Hamburger + slide-down menu, visible only under the 900px breakpoint where
// the desktop nav links are hidden. Rendered inside the sticky header, so the
// panel is positioned against it (absolute, not fixed — the header's
// backdrop-filter would hijack a fixed panel's containing block).
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change and keep the page from scrolling underneath.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={open ? "menu-btn open" : "menu-btn"}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mobile-menu" role="dialog" aria-label="Site menu">
          <nav aria-label="Mobile">
            {[...NAV, ...NAV_MOBILE_EXTRA].map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <a className="btn btn-solid book" href={SITE.bookingUrl}>
            Book a Session
          </a>
          <a className="phone" href={SITE.phoneHref}>
            {SITE.phone}
          </a>
        </div>
      )}
    </>
  );
}
