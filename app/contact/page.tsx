import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Location — Delta Roe in Old Town Elk Grove",
  description:
    "Visit Delta Roe at 9075 Elk Grove Blvd, Suite 220A in historic Old Town Elk Grove. Call (916) 206-1752 or book online.",
};

export default function ContactPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">Find Us</div>
          <h1 style={{ marginTop: 14 }}>The sanctuary awaits</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            Upstairs in historic Old Town Elk Grove — quiet, candle-lit, and
            easier to reach than peace usually is.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 16 }}>
        <div className="wrap grid-2">
          <div className="card">
            <h3>Visit</h3>
            <p style={{ marginBottom: 12 }}>
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
            </p>
            <p style={{ marginBottom: 12 }}>
              <a href={SITE.mapsUrl}>Open in Google Maps →</a>
            </p>
            <p>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <div className="card">
            <h3>Hours</h3>
            <div className="hours" style={{ fontSize: 17 }}>
              {SITE.hours.map((h) => (
                <div
                  key={h.days}
                  style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "var(--muted)" }}
                >
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="narrow" style={{ textAlign: "center", marginTop: 48 }}>
          <a className="btn btn-solid" href={SITE.bookingUrl}>
            Book Online
          </a>
        </div>
      </section>
    </main>
  );
}
