import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events — Sound of Paint, Sound Baths & Workshops in Elk Grove",
  description:
    "Upcoming Delta Roe events in Elk Grove: The Sound of Paint chakra art series, Sound-Integrated Self-Defense™, group sound baths and virtual circles.",
};

const CHAKRA_SERIES = [
  { color: "Root", css: "var(--chakra-root)", theme: "Grounding & safety" },
  { color: "Sacral", css: "var(--chakra-sacral)", theme: "Creativity & flow" },
  { color: "Solar Plexus", css: "var(--chakra-solar)", theme: "Power & confidence" },
  { color: "Heart", css: "var(--chakra-heart)", theme: "Love & forgiveness" },
  { color: "Throat", css: "var(--chakra-throat)", theme: "Truth & voice" },
  { color: "Third Eye", css: "var(--chakra-third-eye)", theme: "Intuition & clarity" },
  { color: "Crown", css: "var(--chakra-crown)", theme: "Connection & spirit" },
];

export default function EventsPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">Gatherings</div>
          <h1 style={{ marginTop: 14 }}>Events &amp; circles</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            Healing is personal — but it doesn&rsquo;t have to be solitary.
          </p>
          <div style={{ marginTop: 32 }}>
            <a className="btn btn-solid" href="https://www.deltaroe.com/event-list">
              See Dates &amp; Reserve
            </a>
          </div>
        </div>
      </div>

      <div className="svc-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/events.jpg"
          alt="Tibetan singing bowls with dried lavender and tingsha cymbals"
          loading="eager"
        />
      </div>

      <section style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="eyebrow">Signature Series</div>
          <h2 style={{ margin: "12px 0 12px" }}>🎨 The Sound of Paint 🎶</h2>
          <p style={{ maxWidth: 640, color: "var(--muted)" }}>
            One chakra at a time, one color at a time: a live sound bath tuned
            to a single energy center while you paint what the frequency moves
            in you. No art experience needed — the bowls do the guiding. The
            series travels the whole column:
          </p>
          <div className="tablewrap" style={{ marginTop: 24 }}>
            <table>
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Focus</th>
                </tr>
              </thead>
              <tbody>
                {CHAKRA_SERIES.map((c) => (
                  <tr key={c.color}>
                    <td>
                      <span
                        aria-hidden="true"
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: c.css,
                          marginRight: 12,
                        }}
                      />
                      {c.color}
                    </td>
                    <td>{c.theme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap grid-2">
          <div className="card">
            <h3>Sound-Integrated Self-Defense™</h3>
            <p>
              Delta Roe&rsquo;s own trademarked format: practical self-defense
              training woven with sound work — learning to hold your ground and
              your center in the same session. Offered on recurring dates in
              Elk Grove.
            </p>
          </div>
          <div className="card">
            <h3>Virtual Circles</h3>
            <p>
              Zoom gatherings — guided meditations and truth-holding circles —
              for those healing from anywhere. Distance is no obstacle to
              energy work.
            </p>
          </div>
        </div>
      </section>

      <section className="band-light" style={{ padding: "72px 0" }}>
        <div className="narrow" style={{ textAlign: "center" }}>
          <div className="eyebrow">Private Groups</div>
          <h2 style={{ margin: "12px 0 16px" }}>Book the room</h2>
          <p style={{ maxWidth: 520, margin: "0 auto 28px" }}>
            Private group sound baths for birthdays, bridal parties, teams, and
            celebrations — your people, one sound journey.
          </p>
          <a
            className="btn btn-ghost"
            style={{ borderColor: "#8a6a2f", color: "#6e5322" }}
            href={`mailto:${SITE.email}?subject=Private group sound bath`}
          >
            Inquire About a Private Event
          </a>
        </div>
      </section>
    </main>
  );
}
