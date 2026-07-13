import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";
import { SERVICES, getService } from "@/lib/services";
import SoundSample from "@/app/components/SoundSample";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return {};
  return {
    // seoTitles already carry the "| Delta Roe" brand suffix — bypass the
    // layout template or it doubles ("… | Delta Roe | Delta Roe").
    title: { absolute: svc.seoTitle },
    description: svc.seoDescription,
    alternates: { canonical: `${SITE.url}/services/${svc.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    serviceType: svc.name,
    description: svc.seoDescription,
    image: `${SITE.url}${svc.image}`,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      telephone: "+1-916-206-1752",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.state,
        postalCode: SITE.address.zip,
      },
    },
    areaServed: "Elk Grove, CA and greater Sacramento",
    offers: {
      "@type": "Offer",
      price: svc.price,
      priceCurrency: "USD",
      url: SITE.bookingUrl,
    },
  };

  // Breadcrumb trail for rich results + AI navigation context.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
      { "@type": "ListItem", position: 3, name: svc.name, item: `${SITE.url}/services/${svc.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const others = SERVICES.filter((s) => s.slug !== svc.slug).slice(0, 3);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">{svc.tag}</div>
          <h1 style={{ marginTop: 14 }}>{svc.name}</h1>
          <div className="meta">
            <span>
              <strong>${svc.price}</strong>
              {svc.priceNote ? ` — ${svc.priceNote}` : ""}
            </span>
            <span>{svc.duration}</span>
            <span>Old Town Elk Grove</span>
          </div>
          {svc.chakra && <hr className="chakra-rule" />}
          <div style={{ marginTop: 36 }}>
            <a className="btn btn-solid" href={SITE.bookingUrl}>
              Book {svc.name}
            </a>
          </div>
        </div>
      </div>

      <div className="svc-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svc.image} alt={svc.imageAlt} loading="eager" />
      </div>

      <section style={{ paddingTop: 48 }}>
        <div className="narrow">
          {/* direct answer — quotable by AI engines */}
          <p style={{ fontSize: 21, color: "var(--text)" }}>{svc.answer}</p>
          <p style={{ color: "var(--muted)" }}>{svc.intro}</p>
        </div>
      </section>

      {svc.slug === "sound-bath-elk-grove" && (
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SoundSample />
          </div>
        </section>
      )}

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            What to Expect
          </div>
          <div className="steps">
            {svc.expect.map((e) => (
              <div className="step" key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band-light" style={{ padding: "72px 0" }}>
        <div className="narrow">
          <div className="eyebrow">Why clients book it</div>
          <ul className="benefits" style={{ marginTop: 20, fontSize: 19 }}>
            {svc.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="narrow">
          <blockquote>
            {svc.review.quote}
            <footer>{svc.review.source}</footer>
          </blockquote>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="narrow">
          <h2 style={{ marginBottom: 20 }}>Questions, answered</h2>
          {svc.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <div style={{ marginTop: 44, textAlign: "center" }}>
            <a className="btn btn-solid" href={SITE.bookingUrl}>
              Book {svc.name} — ${svc.price}
            </a>
            <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 16 }}>
              Not sure yet? <a href={SITE.bookingUrl}>Book a free discovery call</a>{" "}
              or call <a href={SITE.phoneHref}>{SITE.phone}</a>.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            Also on the menu
          </div>
          <div className="grid-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="card"
                style={{ textDecoration: "none" }}
              >
                <h3>{o.name}</h3>
                <p>
                  {o.duration} · ${o.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
