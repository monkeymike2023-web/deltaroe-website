import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { CHAKRAS } from "@/lib/chakras";
import ChakraExperience from "./ChakraExperience";

export const metadata: Metadata = {
  title: "The Seven Chakras & Their Sounds — An Interactive Journey",
  description:
    "Explore the seven chakras on an interactive, sound-enabled map of the body — each energy center's color, solfeggio frequency, and crystal bowl note, the way Delta Roe tunes them in a live sound bath in Elk Grove, CA.",
  alternates: { canonical: `${SITE.url}/sound-chakras` },
};

// Schema pack: the page, its breadcrumb trail, and the seven chakras as an
// ordered ItemList so AI answer engines can quote the frequency table.
const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE.url}/sound-chakras#webpage`,
  name: "The Seven Chakras & Their Sounds",
  description:
    "Interactive guide to the seven chakras — colors, solfeggio frequencies, and the crystal singing bowl notes used in Delta Roe's sound baths.",
  url: `${SITE.url}/sound-chakras`,
  isPartOf: { "@id": `${SITE.url}/#business` },
  about: CHAKRAS.map((c) => ({
    "@type": "Thing",
    name: `${c.english} chakra (${c.sanskrit})`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Sound & Chakras",
      item: `${SITE.url}/sound-chakras`,
    },
  ],
};

const listSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The seven chakras and their solfeggio frequencies",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: CHAKRAS.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${c.english} chakra (${c.sanskrit}) — ${c.colorName}, ${c.frequency} Hz, bowl note ${c.bowlNote}`,
  })),
};

export default function SoundChakrasPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <div className="svc-hero" style={{ paddingBottom: 28 }}>
        <div className="narrow">
          <div className="eyebrow">An Interactive Journey</div>
          <h1 style={{ marginTop: 14 }}>The Sound of Your Seven Chakras</h1>
          <p className="lede" style={{ maxWidth: 640, margin: "18px auto 0" }}>
            Seven energy centers. Seven colors. Seven notes. Watch each one
            wake up — and if you turn the sound on, hear the bowl it answers to.
          </p>
          <hr className="chakra-rule" />
        </div>
      </div>

      <section style={{ paddingTop: 36 }}>
        <div className="wrap">
          <ChakraExperience />
        </div>
      </section>

      <section className="band-light" style={{ padding: "76px 0" }}>
        <div className="narrow">
          <div className="eyebrow">Why sound?</div>
          <h2 style={{ marginTop: 14 }}>
            This is exactly how a Delta Roe sound bath works
          </h2>
          <p style={{ marginTop: 22 }}>
            In the studio, those tones aren&apos;t coming from a speaker —
            they&apos;re rising out of crystal singing bowls, each one tuned to
            a frequency that corresponds to one of these seven centers. You lie
            back, wrapped in blankets in a candle-lit room, and the vibration
            doesn&apos;t just reach your ears. It washes over your whole body
            — skin, breath, bone — one center at a time.
          </p>
          <p>
            As each bowl rings, the center it speaks to is believed to soften,
            release what it&apos;s been holding, and settle back into balance.
            Root to crown, note by note, the same journey you just took with
            your eyes — except live, it&apos;s thirty unbroken minutes, and
            you don&apos;t have to do a single thing but receive.
          </p>
          <p style={{ marginBottom: 34 }}>
            You&apos;ve heard sixty seconds of it through a screen. Queen,
            imagine what the real thing does.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a className="btn btn-solid" href={SITE.bookingUrl}>
              Book a Sound Bath
            </a>
            <Link className="btn btn-ghost" href="/services/sound-bath-elk-grove">
              About Sound Baths
            </Link>
            <Link className="btn btn-ghost" href="/services/chakra-alignment">
              Chakra Alignment
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0 0" }}>
        <div className="narrow">
          <Link
            href="/the-clearing"
            style={{
              display: "block",
              border: "1px solid var(--line)",
              borderLeft: "3px solid var(--gold)",
              background: "var(--surface)",
              padding: "26px 30px",
              textDecoration: "none",
            }}
          >
            <span
              className="eyebrow"
              style={{ display: "block", marginBottom: 8 }}
            >
              A tiny ritual
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                color: "var(--gold-bright)",
                display: "block",
              }}
            >
              Carrying something heavy today? Try The Clearing →
            </span>
            <span
              style={{
                color: "var(--muted)",
                fontSize: 16,
                display: "block",
                marginTop: 8,
              }}
            >
              Break the words weighing on each chakra, gather the ones that are
              yours — two gentle minutes, bowls included.
            </span>
          </Link>
        </div>
      </section>

      <section style={{ padding: "48px 0 72px" }}>
        <div className="narrow">
          <p
            style={{
              color: "var(--muted)",
              fontSize: 15,
              fontFamily: "var(--font-ui)",
              margin: 0,
            }}
          >
            The frequencies shown are the solfeggio tones traditionally paired
            with each chakra. Sound healing and energy work are complementary
            wellness practices — deeply restful, never a substitute for
            medical care.
          </p>
        </div>
      </section>
    </main>
  );
}
