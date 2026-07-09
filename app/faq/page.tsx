import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — Reiki, Sound Baths & Energy Healing Questions Answered",
  description:
    "Everything first-timers ask about Delta Roe: what reiki feels like, what to wear, pricing, parking in Old Town Elk Grove, gift cards and more.",
};

const FAQS = [
  {
    q: "Where is Delta Roe located?",
    a: `Delta Roe is at ${"9075 Elk Grove Blvd, Suite 220A, Elk Grove, CA 95624"} — upstairs in historic Old Town Elk Grove. Free street parking is available on and around Elk Grove Blvd.`,
  },
  {
    q: "How much do sessions cost?",
    a: "Sound baths are $77, reiki sessions are $144, chakra alignment with sound bath is $177, the Fascia Flow Reset with sound bath is $188, and 90-minute life coaching is $250. A free 30-minute discovery call is available for anyone deciding where to start.",
  },
  {
    q: "What should I expect at my first session?",
    a: "You'll be welcomed into a candle-lit studio, talk briefly about what you're carrying, then rest fully clothed while Tamika works with energy, sound bowls, and essential oils. Most first-timers describe feeling lighter, calmer, and clearer afterward.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable, loose clothing. You stay fully clothed for every service — only shoes come off.",
  },
  {
    q: "Is reiki safe? Does it conflict with my religion or medical care?",
    a: "Reiki is a gentle, non-invasive relaxation practice with no belief requirements — people of every faith and none receive it. It complements but never replaces medical or mental-health care.",
  },
  {
    q: "Do you offer gift cards?",
    a: "Yes — gift cards are available for every service and are the most-loved gift we sell. Contact the studio at (916) 206-1752 or Info@deltaroe.com, or see the Gift Cards page.",
  },
  {
    q: "Can I book a private group event?",
    a: "Yes. Private group sound baths and wellness circles are available for birthdays, teams, bridal parties, and celebrations — in-studio or on location around Elk Grove and Sacramento.",
  },
  {
    q: "What is The Sound of Paint?",
    a: "Delta Roe's signature workshop series: a live sound bath tuned to one chakra while you paint what the frequency moves in you. The series travels all seven energy centers, root to crown.",
  },
  {
    q: "What is Sound-Integrated Self-Defense™?",
    a: "A format created and trademarked by Delta Roe that weaves practical self-defense training with sound work — building physical confidence and inner calm in the same session.",
  },
  {
    q: "Do you take walk-ins?",
    a: "Sessions are by appointment so every client gets the room to themselves. Booking online takes under a minute, and same-week openings are common.",
  },
];

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">Good Questions</div>
          <h1 style={{ marginTop: 14 }}>Frequently asked</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            Everything first-timers wonder and regulars forget to mention.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 8 }}>
        <div className="narrow">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <div style={{ marginTop: 44, textAlign: "center" }}>
            <a className="btn btn-solid" href={SITE.bookingUrl}>
              Book a Session
            </a>
            <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 16 }}>
              Still curious? Call <a href={SITE.phoneHref}>{SITE.phone}</a> or
              email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
