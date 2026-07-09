import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews — What Clients Say About Delta Roe",
  description:
    "Real client reviews of Delta Roe's reiki, sound bath and chakra alignment sessions in Elk Grove, CA — from Google and Yelp.",
};

const REVIEWS = [
  {
    quote:
      "I wasn't sure what to expect going into my Reiki session, but wow. I felt clear movement in my feet and legs even when she wasn't touching them.",
    source: "Google review",
  },
  {
    quote:
      "My first Reiki/Crystal session was with Ms. Banks… my mind relaxed then my body followed. After my treatment, I felt light, rejuvenated, and happy!",
    source: "Google review",
  },
  {
    quote:
      "A safe space nestled in historic old town Elk Grove where you'll be guided into healing relaxation aligning the heart, mind, and soul.",
    source: "What clients find",
  },
];

export default function ReviewsPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">Social Proof</div>
          <h1 style={{ marginTop: 14 }}>In their words</h1>
          <div className="stars" style={{ color: "var(--gold)", letterSpacing: 6, fontSize: 22, marginTop: 18 }} aria-hidden="true">
            ★★★★★
          </div>
          <p className="lede" style={{ marginTop: 12 }}>
            Clients call Delta Roe the best healing experience in Elk Grove.
            We&rsquo;ll let them do the talking.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 16 }}>
        <div className="wrap" style={{ display: "grid", gap: 24, maxWidth: 820 }}>
          {REVIEWS.map((r) => (
            <blockquote key={r.quote}>
              {r.quote}
              <footer>{r.source}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="narrow" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--muted)" }}>
            Read more on{" "}
            <a href="https://www.yelp.com/biz/delta-roe-elk-grove">Yelp</a> or{" "}
            <a href={SITE.mapsUrl}>Google</a> — then come write your own.
          </p>
          <a className="btn btn-solid" href={SITE.bookingUrl}>
            Book Your First Session
          </a>
        </div>
      </section>
    </main>
  );
}
