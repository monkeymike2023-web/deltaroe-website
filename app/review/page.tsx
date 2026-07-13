import type { Metadata } from "next";
import Image from "next/image";
import { SITE, REVIEW_URL, YELP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leave a Review — Share Your Delta Roe Experience",
  description:
    "Loved your reiki session or sound bath at Delta Roe in Elk Grove? Leave a Google review — your words help another soul find their way to the studio.",
};

// Until the GBP short-link replaces the placeholder, send reviewers to the
// Google Maps listing — same destination, one extra click, never a dead link.
const googleHref = REVIEW_URL.includes("REPLACE_ME") ? SITE.mapsUrl : REVIEW_URL;

export default function ReviewPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <Image
            src="/emblem-transparent.png"
            alt=""
            width={110}
            height={110}
            priority
            style={{ margin: "0 auto 6px", display: "block", opacity: 0.9 }}
          />
          <div className="eyebrow">A Small Favor</div>
          <h1 style={{ marginTop: 14 }}>Love your session?</h1>
          <p className="lede" style={{ marginTop: 18 }}>
            If Delta Roe gave you something — rest, release, a little more room
            to breathe — a review helps another soul in Elk Grove find their
            way here.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 8, paddingBottom: 96 }}>
        <div className="narrow" style={{ textAlign: "center" }}>
          <a className="btn btn-solid" href={googleHref}>
            Leave a Google Review
          </a>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: 18,
            }}
          >
            Takes about a minute · a sentence is plenty
          </p>

          <hr className="rule" style={{ margin: "48px auto", maxWidth: 320 }} />

          <p style={{ color: "var(--muted)", marginBottom: 10 }}>
            Yelp more your speed?{" "}
            <a href={YELP_URL}>Review Delta Roe on Yelp</a>.
          </p>
          <p style={{ color: "var(--muted)", fontSize: 17, margin: 0 }}>
            Prefer to tell us directly — or did something miss the mark?{" "}
            <a href={`mailto:${SITE.email}?subject=About%20my%20session`}>
              Email Tamika
            </a>{" "}
            and she&rsquo;ll read every word.
          </p>
        </div>
      </section>
    </main>
  );
}
