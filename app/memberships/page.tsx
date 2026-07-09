import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Memberships — Monthly Healing at Delta Roe",
  description:
    "Delta Roe memberships in Elk Grove: monthly in-studio sessions, the virtual Sanctuary Circle with recorded 432 Hz sound baths, and the 12-month Soulful Journey program.",
};

const TIERS = [
  {
    name: "The Sanctuary Circle",
    price: 33,
    cadence: "/month",
    tag: "Virtual · From anywhere",
    highlights: [
      "Monthly live virtual sound bath (Zoom)",
      "Full access to the recorded 432 Hz sound-bath library",
      "A new guided meditation every month",
      "10% off everything in the Apothecary",
    ],
    note: "Healing that travels with you — the studio in your headphones.",
    cta: "Join the founding list",
    href: `mailto:${SITE.email}?subject=Sanctuary Circle membership — founding list`,
  },
  {
    name: "The Ritual Membership",
    price: 129,
    cadence: "/month",
    tag: "In-studio · Most popular",
    featured: true,
    highlights: [
      "One 30-minute session every month — reiki, sound bath, or chakra alignment, your choice",
      "Unused sessions roll over one month",
      "10% off additional sessions and the Apothecary",
      "Priority booking + members-only circle nights",
    ],
    note: "For the ones who've learned the hard way what happens when they skip a month.",
    cta: "Reserve your spot",
    href: `mailto:${SITE.email}?subject=Ritual Membership — reserve my spot`,
  },
  {
    name: "The Soulful Journey",
    price: 399,
    cadence: "/month · 12 months",
    tag: "Transformation program",
    highlights: [
      "Monthly master class (Zoom or in-person)",
      "Four 30-minute reiki sessions every month",
      "Bi-weekly 50-minute one-on-one coaching",
      "Quarterly live panel discussions",
    ],
    note: "The deepest container — a full year of guided transformation.",
    cta: "Explore the program",
    href: "/soulful-journey",
    internal: true,
  },
];

export default function MembershipsPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">Memberships</div>
          <h1 style={{ marginTop: 14 }}>Make healing a rhythm</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            One session feels wonderful. A practice changes your life. Members
            keep their place in the calendar — and their peace.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 16 }}>
        <div className="wrap">
          <div className="tier-grid">
            {TIERS.map((t) => (
              <article key={t.name} className={t.featured ? "tier featured" : "tier"}>
                <div className="tier-tag">{t.tag}</div>
                <h2 className="tier-name">{t.name}</h2>
                <div className="tier-price">
                  <span className="amt">${t.price}</span>
                  <span className="cad">{t.cadence}</span>
                </div>
                <ul>
                  {t.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="tier-note">{t.note}</p>
                {t.internal ? (
                  <Link className="btn btn-solid" href={t.href}>
                    {t.cta}
                  </Link>
                ) : (
                  <a className={t.featured ? "btn btn-solid" : "btn btn-ghost"} href={t.href}>
                    {t.cta}
                  </a>
                )}
              </article>
            ))}
          </div>
          <p style={{ marginTop: 28, color: "var(--muted)", fontSize: 15.5, textAlign: "center" }}>
            Sanctuary Circle and Ritual Membership are opening soon at founding-member
            pricing — joining the list locks your rate. Questions? Call{" "}
            <a href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>
        </div>
      </section>

      <section className="band-light" style={{ padding: "72px 0" }}>
        <div className="narrow">
          <div className="eyebrow">Why members</div>
          <h2 style={{ margin: "12px 0 18px" }}>The math of a monthly practice</h2>
          <p>
            A single reiki session is $144. Ritual members receive a monthly
            session, rollover, priority booking, and 10% off everything else —
            for $129. The membership pays for itself the moment you show up,
            which is exactly the point: <em>it makes showing up automatic.</em>
          </p>
        </div>
      </section>

      <section>
        <div className="narrow" style={{ textAlign: "center" }}>
          <div className="eyebrow">Not sure which?</div>
          <h2 style={{ margin: "12px 0 16px" }}>Start with a conversation</h2>
          <p style={{ color: "var(--muted)", maxWidth: 480, margin: "0 auto 28px" }}>
            The free discovery call exists for exactly this — 30 minutes to find
            the rhythm that fits your life and your season.
          </p>
          <a className="btn btn-solid" href={SITE.bookingUrl}>
            Book the Free Discovery Call
          </a>
        </div>
      </section>
    </main>
  );
}
