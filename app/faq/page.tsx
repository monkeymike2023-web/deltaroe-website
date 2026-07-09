import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { FAQ_CATEGORIES, ALL_FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ — Honest Answers About Reiki, Sound Baths & Energy Healing",
  description:
    "Real answers to real questions: what reiki feels like, the science, 432 Hz sound baths, chakras in plain English, pricing, parking in Old Town Elk Grove, and more.",
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((f) => ({
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
          <h1 style={{ marginTop: 14 }}>Everything, answered honestly</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            The questions first-timers actually ask — including the skeptical
            ones. Especially the skeptical ones.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 8 }}>
        <div className="narrow">
          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.title} style={{ marginBottom: 48 }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>
                {cat.title}
              </div>
              {cat.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          ))}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <a className="btn btn-solid" href={SITE.bookingUrl}>
              Book a Session
            </a>
            <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 16 }}>
              Still curious? Ask Roe — the gold chat button in the corner — or
              call <a href={SITE.phoneHref}>{SITE.phone}</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
