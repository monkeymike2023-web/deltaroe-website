import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Apothecary — Delta Roe Candles, Oils, Crystals & Ritual Goods",
  description:
    "The Delta Roe Apothecary: intention candles, ritual oils, crystals, chakra sets and sacred goods — curated and charged in Elk Grove. Opening soon online.",
};

const COLLECTIONS = [
  {
    name: "Intention Candles",
    desc: "Hand-poured soy candles in the Delta Roe black-and-gold vessel — lit for what you're calling in.",
  },
  {
    name: "Ritual & Body Oils",
    desc: "Essential-oil blends for grounding, clarity, and rest — the same oils that scent the studio.",
  },
  {
    name: "Crystals & Chakra Sets",
    desc: "Intention-matched crystal kits — grounding, abundance, sleep — and full seven-stone chakra sets.",
  },
  {
    name: "Sacred Smoke",
    desc: "California white sage, palo santo, and cleansing ritual kits for resetting your space.",
  },
  {
    name: "Reiki-Charged Jewelry",
    desc: "Tamika's own hand-charged pieces — the original Delta Roe craft, in limited runs.",
  },
  {
    name: "The Delta Roe Collection",
    desc: "The lotus mark on tees, hats, and journals — wear the reminder to return to yourself.",
  },
];

export default function ShopPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">The Apothecary</div>
          <h1 style={{ marginTop: 14 }}>Take the sanctuary home</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            The online Apothecary opens soon. Every collection below is
            available in-studio today.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 16 }}>
        <div className="wrap grid-3">
          {COLLECTIONS.map((c) => (
            <div className="card" key={c.name}>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="narrow" style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto 24px" }}>
            Want first access when the online shop opens — plus a launch-day
            discount? Send a note and you&rsquo;re on the list.
          </p>
          <a
            className="btn btn-solid"
            href={`mailto:${SITE.email}?subject=Apothecary launch list`}
          >
            Join the Launch List
          </a>
        </div>
      </section>
    </main>
  );
}
