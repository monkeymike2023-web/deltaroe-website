import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate Wellness — Sound Baths & Meditation for Sacramento Teams",
  description:
    "On-site sound baths, guided meditation and stress-reset sessions for Elk Grove and Sacramento workplaces. Give your team an hour that changes the quarter.",
};

export default function CorporateWellnessPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">For Teams</div>
          <h1 style={{ marginTop: 14 }}>Corporate wellness</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            Burnout is expensive. An hour of deep rest is not.
          </p>
          <div style={{ marginTop: 32 }}>
            <a
              className="btn btn-solid"
              href={`mailto:${SITE.email}?subject=Corporate wellness inquiry`}
            >
              Request a Proposal
            </a>
          </div>
        </div>
      </div>

      <section style={{ paddingTop: 24 }}>
        <div className="narrow">
          <p style={{ fontSize: 21 }}>
            Delta Roe brings sound baths, guided meditation, and energy-reset
            sessions directly to Elk Grove and Sacramento-area workplaces — or
            hosts your team in the Old Town studio.
          </p>
          <p style={{ color: "var(--muted)" }}>
            Founder Tamika Banks built Delta Roe partly for professionals — the
            mission has always been a sacred space where working people can
            realign, restore, and recharge. Corporate sessions translate that
            into a format HR can put on a calendar.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap grid-3">
          <div className="card">
            <h3>The Team Sound Bath</h3>
            <p>
              45–60 minutes, on-site or in-studio. Mats, bowls, and total
              decompression for groups of 6–20.
            </p>
          </div>
          <div className="card">
            <h3>Meditation & Stress Reset</h3>
            <p>
              Guided breath and meditation training your team can actually
              reuse at their desks — practical calm, not fluff.
            </p>
          </div>
          <div className="card">
            <h3>Wellness Day Partner</h3>
            <p>
              Combine sound, movement, and one-on-one mini-sessions for a full
              wellness day or quarterly ritual.
            </p>
          </div>
        </div>
        <div className="narrow" style={{ textAlign: "center", marginTop: 44 }}>
          <p style={{ color: "var(--muted)" }}>
            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
            <a href={SITE.phoneHref}>{SITE.phone}</a> for group pricing.
          </p>
        </div>
      </section>
    </main>
  );
}
