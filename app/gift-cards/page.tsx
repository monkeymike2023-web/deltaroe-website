import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gift Cards — Give the Gift of Healing",
  description:
    "Delta Roe gift cards for reiki, sound baths, chakra alignment and coaching in Elk Grove. The rarest gift: an hour that belongs entirely to them.",
};

export default function GiftCardsPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">Give the Calm</div>
          <h1 style={{ marginTop: 14 }}>Gift cards</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            You cannot wrap a quiet mind — but you can gift one.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 16 }}>
        <div className="wrap grid-3">
          <div className="card">
            <h3>The Sound Bath — $77</h3>
            <p>
              The perfect introduction. Thirty minutes of 432 Hz immersion for
              the person who &ldquo;can&rsquo;t relax.&rdquo;
            </p>
          </div>
          <div className="card">
            <h3>The Reiki Session — $144</h3>
            <p>
              For someone carrying more than they say. Gentle energy healing in
              a candle-lit sanctuary.
            </p>
          </div>
          <div className="card">
            <h3>The Full Reset — $177+</h3>
            <p>
              Chakra alignment with sound bath — the fullest single-session
              experience on the menu.
            </p>
          </div>
        </div>
        <div className="narrow" style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto 24px" }}>
            To purchase a gift card, call the studio or send an email — we&rsquo;ll
            arrange it same-day and include a personal note. Online instant
            gift cards are coming soon.
          </p>
          <a
            className="btn btn-solid"
            href={`mailto:${SITE.email}?subject=Gift card purchase`}
          >
            Arrange a Gift Card
          </a>
          <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 16 }}>
            or call <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
        </div>
      </section>
    </main>
  );
}
