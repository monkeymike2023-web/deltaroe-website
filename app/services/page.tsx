import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { SERVICES, COMBOS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services & Pricing — Reiki, Sound Baths, Chakra Alignment",
  description:
    "Delta Roe's full menu: reiki ($144), sound baths ($77), chakra alignment ($177), fascia flow reset ($188) and life coaching ($250) in Elk Grove, CA.",
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
                <span className="price">${s.price}</span>
                <span className="desc">{s.short}</span>
                <span className="meta">
                  {s.duration} · {s.tag}
                </span>
              </Link>
            ))}
          </div>

          <h2 style={{ margin: "64px 0 24px" }}>Pairings</h2>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Combination</th>
                  <th>Duration</th>
                  <th className="num">Price</th>
                </tr>
              </thead>
              <tbody>
                {COMBOS.map((c) => (
                  <tr key={c.name}>
                    <td>{c.name}</td>
                    <td>{c.duration}</td>
                    <td className="num">${c.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
