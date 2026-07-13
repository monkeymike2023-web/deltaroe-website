import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";
import { ARTICLES, getArticle } from "@/lib/journal";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const art = getArticle(slug);
  if (!art) return {};
  return {
    title: art.title,
    description: art.description,
    alternates: { canonical: `${SITE.url}/journal/${art.slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const art = getArticle(slug);
  if (!art) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: art.title,
    description: art.description,
    datePublished: art.date,
    author: { "@id": `${SITE.url}/#tamika` },
    publisher: { "@id": `${SITE.url}/#business` },
    mainEntityOfPage: `${SITE.url}/journal/${art.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: art.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE.url}/journal` },
      { "@type": "ListItem", position: 3, name: art.title, item: `${SITE.url}/journal/${art.slug}` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
          <div className="eyebrow">
            The Journal · {art.dateLabel} · {art.readMinutes} min read
          </div>
          <h1 style={{ marginTop: 14 }}>{art.title}</h1>
        </div>
      </div>

      <article>
        <section style={{ paddingTop: 40 }}>
          <div className="narrow">
            {/* direct answer — quotable by AI engines */}
            <p style={{ fontSize: 21, color: "var(--text)" }}>{art.answer}</p>
          </div>
        </section>

        {art.sections.map((s, i) => (
          <section key={i} style={{ paddingTop: 0, paddingBottom: 8 }}>
            <div className="narrow">
              {s.heading && <h2 style={{ margin: "28px 0 16px" }}>{s.heading}</h2>}
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} style={{ color: "var(--muted)", marginBottom: 18 }}>
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        <section style={{ paddingTop: 8 }}>
          <div className="narrow">
            <h2 style={{ marginBottom: 20 }}>Quick answers</h2>
            {art.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
            <div style={{ marginTop: 44, textAlign: "center" }}>
              <Link className="btn btn-solid" href={art.cta.href}>
                {art.cta.label}
              </Link>
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="narrow">
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Keep reading
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {art.related.map((r) => (
                <Link key={r.href} href={r.href} style={{ color: "var(--gold-bright)" }}>
                  {r.label} →
                </Link>
              ))}
              <Link href="/journal" style={{ color: "var(--muted)" }}>
                All Journal entries →
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
