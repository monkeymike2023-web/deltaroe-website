import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Soulful Journey Transformation Program — 12 Months of Guided Growth",
  description:
    "Delta Roe's 12-month transformation container: three private sessions monthly, a personalized wellness plan, the full digital practice library, priority support, and member privileges. $399/month.",
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
            private sessions, a plan built around you, a rich practice library,
            and member privileges — designed for a profound journey of
            self-discovery and empowerment.
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
              <h3>Three Private Sessions</h3>
              <p>
                Three 30-minute one-on-one sessions each month — coaching or
                wellness work, your choice, in-person or over Zoom.
              </p>
            </div>
            <div className="card">
              <h3>Your Personalized Wellness Plan</h3>
              <p>
                A monthly plan built around your season, your goals, and what
                the work is showing — so every month has a direction.
              </p>
            </div>
            <div className="card">
              <h3>The Full Practice Library</h3>
              <p>
                Unlimited access to the Ritual Membership library plus the
                premium sound bath and meditation collection — your practice
                between sessions, on demand.
              </p>
            </div>
            <div className="card">
              <h3>Guided Journal &amp; Reflection</h3>
              <p>
                A monthly guided journal with reflection prompts that carry the
                session work into your everyday.
              </p>
            </div>
            <div className="card">
              <h3>Priority Support</h3>
              <p>
                Priority messaging support within business hours — a guide in
                your corner between sessions, not just during them.
              </p>
            </div>
            <div className="card">
              <h3>Member Privileges</h3>
              <p>
                15% off additional services and Apothecary purchases, plus
                early access to workshops, retreats, and new offerings.
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
