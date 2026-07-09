import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Soulful Journey Transformation Program — 12 Months of Guided Growth",
  description:
    "Delta Roe's 12-month transformation container: monthly master classes, reiki sessions, bi-weekly 1-on-1 coaching, and quarterly live panels. $399/month.",
};

export default function SoulfulJourneyPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">The Deep Work</div>
          <h1 style={{ marginTop: 14 }}>The Soulful Journey</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            A twelve-month transformation container for the season of your life
            that deserves more than a single session.
          </p>
          <div className="meta" style={{ marginTop: 24 }}>
            <span><strong>$399</strong>/month</span>
            <span>12 months</span>
            <span>In-person + Zoom</span>
          </div>
          <div style={{ marginTop: 36 }}>
            <a className="btn btn-solid" href={SITE.bookingUrl}>
              Book a Free Discovery Call
            </a>
          </div>
        </div>
      </div>

      <section style={{ paddingTop: 24 }}>
        <div className="narrow">
          <p style={{ fontSize: 21 }}>
            The Soulful Journey Transformation Program is Delta Roe&rsquo;s
            deepest offering: a full year of structured, personal guidance —
            energy work, coaching, teaching, and community — designed for a
            profound journey of self-discovery and empowerment.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            Every month includes
          </div>
          <div className="grid-2">
            <div className="card">
              <h3>Monthly Master Class</h3>
              <p>
                A live teaching session — Zoom or in-person, 7–9 pm — on the
                month&rsquo;s theme: energy hygiene, boundaries, manifestation,
                self-trust.
              </p>
            </div>
            <div className="card">
              <h3>Four Reiki Sessions</h3>
              <p>
                Four 30-minute reiki sessions each month, in-person or over
                Zoom — the energetic maintenance that keeps the deeper work
                moving.
              </p>
            </div>
            <div className="card">
              <h3>Bi-Weekly 1-on-1 Coaching</h3>
              <p>
                Fifty-minute private sessions every two weeks, built around
                your personal capstone and roadmap.
              </p>
            </div>
            <div className="card">
              <h3>Quarterly Live Panels</h3>
              <p>
                Four live panel discussions a year — community, accountability,
                and perspectives from fellow travelers.
              </p>
            </div>
          </div>
          <p style={{ marginTop: 28, color: "var(--muted)", fontSize: 16 }}>
            Optional: a Personalized Roadmap intensive (+$399, one-time) to map
            your full twelve months at the start.
          </p>
        </div>
      </section>

      <section className="band-light" style={{ padding: "72px 0" }}>
        <div className="narrow" style={{ textAlign: "center" }}>
          <div className="eyebrow">Is it for you?</div>
          <h2 style={{ margin: "12px 0 18px" }}>
            Built for the ready, not the perfect
          </h2>
          <p style={{ maxWidth: 560, margin: "0 auto" }}>
            This program fits people in transition — career shifts, healing
            seasons, post-loss rebuilding, or simply the year you decided to
            stop circling and start moving. The free discovery call is where we
            find out together whether it&rsquo;s your container.
          </p>
          <a
            className="btn btn-ghost"
            style={{ borderColor: "#8a6a2f", color: "#6e5322", marginTop: 28 }}
            href={SITE.bookingUrl}
          >
            Start With the Free Call
          </a>
        </div>
      </section>
    </main>
  );
}
