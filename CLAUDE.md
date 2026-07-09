# Delta Roe Website

Luxury black+gold Next.js site for **Delta Roe** — Tamika Banks' reiki / sound bath / chakra / life-coaching studio at 9075 Elk Grove Blvd, Suite 220A, Elk Grove CA 95624 (historic Old Town).

- **Live:** https://deltaroe-website.vercel.app (push to `main` auto-deploys via Vercel)
- **Domain:** deltaroe.com still points at the old Wix site until cutover; booking CTAs link to the existing Wix scheduler (deltaroe.com/book-online) until Square Appointments is set up
- **Plan:** `docs/upgrade-plan.html` / `docs/Delta-Roe-Website-Plan.pdf`
- **Dev:** `npm run dev`

## Architecture

Next.js 15 App Router, hand-rolled CSS (no Tailwind), all pages static. Content lives in data files:

- `lib/site.ts` — business facts (address, phone, hours, booking URL)
- `lib/services.ts` — the 5 service landing pages (`/services/[slug]`), incl. prices & FAQs
- `lib/products.ts` — Apothecary demo-store SKUs (shop is preview-only, noindex, demo cart)
- `lib/faqs.ts` — 36-question FAQ (FAQPage schema)
- `lib/roe-kb.ts` — "Roe" chatbot knowledge base
- `public/llms.txt` — AI-search business summary (keep in sync with pricing changes)

## Non-negotiable rules

1. **Tamika is African American.** Never use stock imagery with visible skin that misrepresents her. No stock faces at all — hands-only imagery is OK (current about.jpg = Black woman's hands with candle).
2. **Brand voice** (Roe chatbot, copy): warm big-sister/queen energy, direct, empowering — modeled on Tamika's books *FLY Queen: First Love Yourself* (F.L.Y. = First Love Yourself) and *The Last Greyhound*. Every answer points gently toward self-care and booking.
3. **Chakra colors are ceremonial** — they appear only where they mean something (chakra page, Sound of Paint, bracelet art). Everywhere else: midnight black `#0C0A08`, antique gold `#C9A464`, champagne `#E6CD95`, cream text.
4. Reiki/energy claims stay honest: complementary wellness, never a substitute for medical care.
5. **Don't run `npm run build` while the dev server is running** — it corrupts `.next` (fix: stop server, `rm -rf .next`, restart).

## Assets

- Logo source: `F:\Dropbox\deltaroelogo.PNG`; crops in `public/`: `emblem.png` (square, no wordmark), `emblem-transparent.png`, `logo.png` (full)
- Product-label compositing script pattern: PowerShell GDI+ (PS 5.1 needs `[single]` casts on Font/RectangleF constructors)
- Photos: Pexels (free commercial license, no attribution)
- `public/audio/sound-bath-sample.mp3`: synthesized 60s 432 Hz binaural bowls (numpy + ffmpeg)

## Roadmap (next)

1. Show Tamika; collect feedback on prices/product names/membership tiers
2. Google Business Profile overhaul + review-request engine
3. Square Appointments (booking, deposits, gift cards, memberships)
4. Shopify + vendor stack: Candle Builders (candles), Blanka (oils), Enchanted Soul (crystals/sage), Printful (apparel) — all zero-inventory private label
5. Point deltaroe.com at Vercel when approved
