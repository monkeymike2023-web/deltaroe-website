import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import TheClearing from "./TheClearing";

export const metadata: Metadata = {
  title: { absolute: "The Clearing — A Free Stress-Relief Ritual | Delta Roe" },
  description:
    "Break what's heavy, keep what's yours. The Clearing is a free, gentle two-minute ritual from Delta Roe — shatter the words weighing on each of your seven chakras and gather the bright ones that belong to you. No timer, no score, nothing ever lost.",
  alternates: { canonical: `${SITE.url}/the-clearing` },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE.url}/the-clearing#webpage`,
  name: "The Clearing — A Free Stress-Relief Ritual",
  description:
    "A gentle interactive ritual: release a heavy word for each of the seven chakras, gather its bright counterpart, and hear the crystal bowl tuned to that energy center.",
  url: `${SITE.url}/the-clearing`,
  isPartOf: { "@id": `${SITE.url}/#business` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "The Clearing",
      item: `${SITE.url}/the-clearing`,
    },
  ],
};

export default function TheClearingPage() {
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

      <div className="svc-hero" style={{ paddingBottom: 20 }}>
        <div className="narrow">
          <div className="eyebrow">A Tiny Ritual for Heavy Days</div>
          <h1 style={{ marginTop: 14 }}>The Clearing</h1>
          <p className="lede" style={{ maxWidth: 560, margin: "16px auto 0" }}>
            Break what&apos;s heavy. Keep what&apos;s yours.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 20, paddingBottom: 64 }}>
        <div className="wrap">
          <TheClearing />
        </div>
      </section>

      <section style={{ padding: "0 0 72px" }}>
        <div className="narrow">
          <p
            style={{
              color: "var(--muted)",
              fontSize: 15,
              fontFamily: "var(--font-ui)",
              margin: 0,
            }}
          >
            A playful ritual, not therapy — for the real thing,{" "}
            <Link href="/services">the sanctuary is here</Link>. Sound and
            energy work are complementary wellness practices — deeply restful,
            never a substitute for medical care.
          </p>
        </div>
      </section>
    </main>
  );
}
