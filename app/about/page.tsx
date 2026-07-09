import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Tamika Banks — Certified Reiki Master in Elk Grove",
  description:
    "Meet Tamika Banks, Certified Reiki Master & Empowerment Life Coach, and the story behind Delta Roe — Elk Grove's sanctuary for holistic healing.",
};

export default function AboutPage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">The Story</div>
          <h1 style={{ marginTop: 14 }}>From Nirvana Love to Delta Roe</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            Every sanctuary begins with one person deciding a space like this
            should exist.
          </p>
        </div>
      </div>

      <div className="svc-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/about.jpg"
          alt="Hands gently cradling a lit candle in a dark room"
          loading="eager"
        />
      </div>

      <section style={{ paddingTop: 48 }}>
        <div className="narrow">
          <p style={{ fontSize: 21 }}>
            Delta Roe is the work of <strong style={{ color: "var(--gold-bright)" }}>Tamika Banks</strong> —
            Certified Reiki Master, Empowerment Life Coach, and the intuitive
            heart of a healing practice nestled in historic Old Town Elk Grove.
          </p>
          <p>
            What began as Nirvana Love has evolved — the way all true practices
            do — into something deeper. Delta Roe exists to support holistic
            wellness by advocating for natural living and providing a sacred
            space where professionals and everyday people can realign, restore,
            and recharge.
          </p>
          <p>
            Tamika&rsquo;s approach is gentle, intuitive, and entirely
            personal. No two sessions are alike, because no two people walk in
            carrying the same thing. Reiki energy work, intuitive crystal
            therapy, essential oils, sound baths at 432 Hz, guided meditation,
            vocal yoga, energetic cleansing rituals — every tool is in service
            of one aim: helping you return to yourself.
          </p>
          <blockquote style={{ margin: "40px 0" }}>
            Heart-led experiences guided by divine intuition, ancient wisdom,
            and a deep passion for helping others return to themselves.
            <footer>The Delta Roe promise</footer>
          </blockquote>
          <p>
            The studio itself — candle-lit, quiet, wrapped in the scent of
            essential oils — sits above the historic district at{" "}
            {SITE.address.street}, {SITE.address.city}. Walk in stressed; walk
            out lighter. That is the entire business model.
          </p>
        </div>
      </section>

      <section className="band-light" style={{ padding: "72px 0" }}>
        <div className="wrap grid-3">
          <div>
            <div className="eyebrow">Certified</div>
            <h3 style={{ margin: "10px 0" }}>Reiki Master</h3>
            <p className="muted">
              Certified Reiki Healing Practitioner with years of hands-on
              energy work.
            </p>
          </div>
          <div>
            <div className="eyebrow">Coach</div>
            <h3 style={{ margin: "10px 0" }}>Empowerment Life Coach</h3>
            <p className="muted">
              One-on-one guidance for clarity, healing, and growth — including
              the 12-month Soulful Journey program.
            </p>
          </div>
          <div>
            <div className="eyebrow">Creator</div>
            <h3 style={{ margin: "10px 0" }}>Original Formats</h3>
            <p className="muted">
              The Sound of Paint chakra series and Sound-Integrated
              Self-Defense™ — experiences you will not find anywhere else.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="narrow" style={{ textAlign: "center" }}>
          <Image
            src="/emblem.png"
            alt="Delta Roe emblem"
            width={140}
            height={140}
            style={{ borderRadius: "50%", opacity: 0.9 }}
          />
          <h2 style={{ margin: "28px 0 16px" }}>Come as you are</h2>
          <p style={{ color: "var(--muted)", maxWidth: 480, margin: "0 auto 28px" }}>
            Skeptics welcome. Beginners welcome. The only requirement is
            showing up.
          </p>
          <a className="btn btn-solid" href={SITE.bookingUrl}>
            Book a Session
          </a>
        </div>
      </section>
    </main>
  );
}
