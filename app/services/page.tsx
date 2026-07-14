import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { SERVICES, fmtPrice } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services & Pricing — Reiki, Sound Baths, Chakra Alignment",
  description:
    "Delta Roe's full menu, lowest to highest: free discovery call, sound baths ($77), nutrition coaching ($88), chakra alignment ($120–177), reiki ($144), reiki pairings ($144–188), fascia flow reset ($188), life coaching ($250) in Elk Grove, CA.",
};

export default function ServicesPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">Services &amp; Pricing</div>
          <h1 style={{ marginTop: 14 }}>The healing menu</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            Thirty minutes can change the whole week. Ninety can change the
            whole year.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="menu-list">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="menu-item">
                <span className="name">{s.name}</span>
                <span className="price">{fmtPrice(s.price)}</span>
                <span className="desc">{s.short}</span>
                <span className="meta">
                  {s.duration ? `${s.duration} · ` : ""}{s.tag}
                </span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <a className="btn btn-solid" href={SITE.bookingUrl}>
              Book Your Session
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
