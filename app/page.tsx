import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { SERVICES, fmtPrice } from "@/lib/services";
import SoundSample from "./components/SoundSample";

export const metadata: Metadata = {
  title: "Delta Roe — Reiki, Sound Baths & Chakra Alignment in Elk Grove, CA",
  description:
    "Elk Grove's sanctuary for reiki healing, 432 Hz sound baths, chakra alignment & life coaching. Historic Old Town Elk Grove. Book your session online today.",
};

export default function Home() {
  return (
    <main>
      {/* ---------- hero ---------- */}
      <div className="hero">
        <Image
          src="/img/tamika-reiki.jpg"
          alt="Tamika channels reiki energy over a resting client in the Delta Roe sanctuary"
          fill
          priority
          sizes="100vw"
          className="hero-photo"
        />
        <div className="hero-veil" aria-hidden="true" />
        <Image
          src="/emblem.png"
          alt="Delta Roe — gold lotus within sacred geometry"
          width={280}
          height={280}
          priority
          className="logo"
        />
        <h1>Return to yourself.</h1>
        <p className="lede">
          Reiki-infused sound baths, chakra alignment, and soul-level coaching
          in a candle-lit sanctuary in historic Old Town Elk Grove.
        </p>
        <div className="ctas">
          <a className="btn btn-solid" href={SITE.bookingUrl}>
            Book a Session
          </a>
          <a className="btn btn-ghost" href={SITE.bookingUrl}>
            Free Discovery Call
          </a>
        </div>
        <div className="chakra-col" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span />
        </div>
      </div>

      {/* ---------- review strip ---------- */}
      <div className="review-strip">
        <div className="stars" aria-hidden="true">★★★★★</div>
        <div className="label">
          <Link href="/reviews" style={{ color: "inherit", textDecoration: "none" }}>
            Loved on Google &amp; Yelp — clients call it the best healing
            experience in Elk Grove
          </Link>
        </div>
      </div>

      {/* ---------- services menu ---------- */}
      <section>
        <div className="wrap">
          <div className="eyebrow">The Menu</div>
          <h2 style={{ marginTop: 10, marginBottom: 8 }}>
            Choose your medicine
          </h2>
          <p className="lede" style={{ marginBottom: 40, maxWidth: 620 }}>
            Every session is intuitive, personal, and unhurried — sound,
            scent, energy, and stillness woven around what you walk in with.
          </p>
          <div className="menu-list">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="menu-item">
                <span className="name">{s.name}</span>
                <span className="price">{fmtPrice(s.price)}</span>
                <span className="desc">{s.short}</span>
                <span className="meta">{s.duration ?? s.tag}</span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 28, color: "var(--muted)", fontSize: 17 }}>
            New here? Start with a{" "}
            <a href={SITE.bookingUrl}>free 30-minute discovery call</a> — or
            simply book a sound bath, the gentlest first step.
          </p>
        </div>
      </section>

      {/* ---------- hear it ---------- */}
      <section>
        <div className="wrap">
          <SoundSample />
        </div>
      </section>

      {/* ---------- atmosphere strip ---------- */}
      <div className="photo-strip" aria-hidden="true">
        {/* eslint-disable @next/next/no-img-element */}
        <img src="/img/service-sound-bath.jpg" alt="" loading="lazy" />
        <img src="/img/service-coaching.jpg" alt="" loading="lazy" />
        <img src="/img/service-chakra.jpg" alt="" loading="lazy" />
        <img src="/img/service-reiki.jpg" alt="" loading="lazy" />
        {/* eslint-enable @next/next/no-img-element */}
      </div>

      {/* ---------- about teaser ---------- */}
      <section className="band-light">
        <div className="wrap grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <div className="eyebrow">Your Guide</div>
            <h2 style={{ margin: "12px 0 18px" }}>Tamika Banks</h2>
            <p style={{ fontSize: 20 }}>
              Certified Reiki Master &amp; Empowerment Life Coach — gentle,
              intuitive, and deeply personal in her approach. What began as
              Nirvana Love has evolved into Delta Roe: a sacred space where
              professionals and everyday people come to realign, restore, and
              recharge.
            </p>
            <p className="muted" style={{ fontStyle: "italic" }}>
              “Guided by divine intuition, ancient wisdom, and a deep passion
              for helping others return to themselves.”
            </p>
            <Link className="btn btn-ghost" href="/about" style={{ borderColor: "#8a6a2f", color: "#6e5322", marginTop: 12 }}>
              Her Story
            </Link>
          </div>
          <div>
            <blockquote style={{ background: "#fffdf7", borderColor: "#ddd2b8", color: "#241c10" }}>
              I wasn&rsquo;t sure what to expect going into my Reiki session,
              but wow. I felt clear movement in my feet and legs even when she
              wasn&rsquo;t touching them.
              <footer style={{ color: "#8a6a2f" }}>Google review</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ---------- the method ---------- */}
      <section>
        <div className="wrap">
          <div className="eyebrow">The Delta Roe Method</div>
          <h2 style={{ margin: "12px 0 12px" }}>How healing happens here</h2>
          <p className="lede" style={{ marginBottom: 40, maxWidth: 620 }}>
            Every session — whatever you book — moves through the same five
            movements. It&rsquo;s why one visit feels complete, and a practice
            becomes transformation.
          </p>
          <div className="steps">
            <div className="step">
              <h3>Ground</h3>
              <p>
                Arrive and land. Breath, warmth, and candlelight bring your
                nervous system out of the day and into the room.
              </p>
            </div>
            <div className="step">
              <h3>Align</h3>
              <p>
                Sound and energy work find what&rsquo;s out of balance — the
                noise, the blocks, the places you&rsquo;ve been holding.
              </p>
            </div>
            <div className="step">
              <h3>Restore</h3>
              <p>
                Reiki, 432 Hz frequency, and stillness do the work while you
                rest. Nothing to perform, nothing to get right.
              </p>
            </div>
            <div className="step">
              <h3>Integrate</h3>
              <p>
                You&rsquo;re guided gently back, with space to name what moved
                and simple practices to carry it home.
              </p>
            </div>
            <div className="step">
              <h3>Transform</h3>
              <p>
                Session by session, the calm stops being a visit and becomes
                how you live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- events teaser ---------- */}
      <section>
        <div className="wrap">
          <div className="eyebrow">Gatherings</div>
          <h2 style={{ margin: "12px 0 36px" }}>Experiences beyond the table</h2>
          <div className="grid-3">
            <div className="card">
              <h3>🎨 The Sound of Paint</h3>
              <p>
                A chakra-by-chakra series where sound healing meets art — paint
                what the frequency moves in you. Root through Crown, one color
                at a time.
              </p>
            </div>
            <div className="card">
              <h3>Sound-Integrated Self-Defense™</h3>
              <p>
                Delta Roe&rsquo;s own trademarked format — embodied
                self-defense training woven with sound work. Strength and
                stillness in the same hour.
              </p>
            </div>
            <div className="card">
              <h3>Group Sound Baths</h3>
              <p>
                Gather your people — private group immersions and wellness
                circles for birthdays, teams, and celebrations.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 32 }}>
            <Link className="btn btn-ghost" href="/events">
              See Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- gift cards ---------- */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--line-soft)", borderBottom: "1px solid var(--line-soft)" }}>
        <div className="narrow" style={{ textAlign: "center" }}>
          <div className="eyebrow">Give the Calm</div>
          <h2 style={{ margin: "12px 0 16px" }}>Delta Roe gift cards</h2>
          <p className="lede" style={{ margin: "0 auto 32px", maxWidth: 520 }}>
            The rarest gift: an hour that belongs entirely to them.
          </p>
          <Link className="btn btn-solid" href="/gift-cards">
            Send a Gift Card
          </Link>
        </div>
      </section>

      {/* ---------- memberships ---------- */}
      <section>
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="eyebrow">Go Deeper</div>
            <h2 style={{ margin: "12px 0 16px" }}>Make healing a rhythm</h2>
            <p style={{ maxWidth: 560, margin: "0 auto", color: "var(--muted)", fontSize: 19 }}>
              One session feels wonderful. A practice changes your life.
            </p>
          </div>
          <div className="grid-3">
            <Link href="/memberships" className="card" style={{ textDecoration: "none" }}>
              <h3>The Sanctuary Circle — $33/mo</h3>
              <p>
                Virtual membership: monthly live sound bath, the recorded
                432 Hz library, and a new meditation every month.
              </p>
            </Link>
            <Link href="/memberships" className="card" style={{ textDecoration: "none", borderColor: "var(--gold)" }}>
              <h3>The Ritual Membership — $129/mo</h3>
              <p>
                A session every month — your choice — with rollover, priority
                booking, and 10% off everything.
              </p>
            </Link>
            <Link href="/soulful-journey" className="card" style={{ textDecoration: "none" }}>
              <h3>The Soulful Journey — $399/mo</h3>
              <p>
                The 12-month transformation container: master classes, reiki,
                and bi-weekly one-on-one coaching.
              </p>
            </Link>
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link className="btn btn-ghost" href="/memberships">
              Compare Memberships
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- corporate wellness ---------- */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--line-soft)" }}>
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, paddingTop: 48, paddingBottom: 48 }}>
          <div style={{ maxWidth: 560 }}>
            <div className="eyebrow">For Teams</div>
            <h2 style={{ margin: "10px 0 10px", fontSize: 30 }}>
              Bring the calm to your workplace
            </h2>
            <p style={{ color: "var(--muted)", margin: 0 }}>
              On-site sound baths and wellness sessions for teams in Elk Grove
              and Sacramento — the meeting your people will actually thank you
              for.
            </p>
          </div>
          <Link className="btn btn-ghost" href="/corporate-wellness">
            Corporate Wellness
          </Link>
        </div>
      </section>
    </main>
  );
}
