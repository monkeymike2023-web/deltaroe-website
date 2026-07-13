import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/journal";

export const metadata: Metadata = {
  title: "The Journal — Honest Notes on Sound, Energy & Rest",
  description:
    "Plain-spoken guides from Delta Roe in Elk Grove: what to expect at your first sound bath, reiki vs. massage, the science of 432 Hz, and more.",
};

export default function JournalPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">The Journal</div>
          <h1 style={{ marginTop: 14 }}>Honest notes on healing</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            No mystique, no overclaiming — plain answers to the questions
            people actually bring up the stairs.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 24 }}>
        <div className="wrap" style={{ display: "grid", gap: 24, maxWidth: 820 }}>
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              className="card"
              style={{ textDecoration: "none" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  margin: "0 0 10px",
                }}
              >
                {a.dateLabel} · {a.readMinutes} min read
              </p>
              <h3 style={{ marginBottom: 10 }}>{a.title}</h3>
              <p style={{ margin: 0 }}>{a.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
