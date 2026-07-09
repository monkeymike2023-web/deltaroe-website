import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Delta Roe — Reiki, Sound Baths & Chakra Alignment in Elk Grove, CA",
    template: "%s | Delta Roe",
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: ["/logo.png"],
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: "+1-916-206-1752",
  email: SITE.email,
  image: `${SITE.url}/logo.png`,
  logo: `${SITE.url}/logo.png`,
  founder: { "@type": "Person", name: SITE.founder, jobTitle: SITE.credentials },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: "US",
  },
  areaServed: ["Elk Grove CA", "Sacramento CA", "Laguna CA", "Galt CA"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday"], opens: "09:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "13:00", closes: "15:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "11:00", closes: "15:00" },
  ],
  priceRange: "$77 - $399",
};

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/memberships", label: "Memberships" },
  { href: "/shop", label: "Apothecary" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <header className="site-header">
          <div className="inner">
            <Link href="/" className="brand" aria-label="Delta Roe home">
              <Image src="/emblem.png" alt="" width={46} height={46} priority />
              <span className="word">Delta Roe</span>
            </Link>
            <nav className="nav" aria-label="Main">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
              <a className="btn btn-solid" href={SITE.bookingUrl}>
                Book Now
              </a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="site-footer">
          <div className="wrap">
            <div className="cols">
              <div>
                <h4>Delta Roe</h4>
                <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 340 }}>
                  A sanctuary in historic Old Town Elk Grove — reiki, sound
                  baths, chakra alignment, and life coaching guided by{" "}
                  {SITE.founder}, {SITE.credentials}.
                </p>
                <a href={SITE.mapsUrl}>{SITE.address.street}</a>
                <a href={SITE.mapsUrl}>
                  {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                </a>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
              <div>
                <h4>Sessions</h4>
                <Link href="/services/reiki-elk-grove">Reiki Healing</Link>
                <Link href="/services/sound-bath-elk-grove">Sound Bath</Link>
                <Link href="/services/chakra-alignment">Chakra Alignment</Link>
                <Link href="/services/fascia-flow-reset">Fascia Flow Reset</Link>
                <Link href="/services/life-coaching">Life Coaching</Link>
              </div>
              <div>
                <h4>Explore</h4>
                <Link href="/memberships">Memberships</Link>
                <Link href="/events">Events</Link>
                <Link href="/soulful-journey">Soulful Journey</Link>
                <Link href="/corporate-wellness">Corporate Wellness</Link>
                <Link href="/gift-cards">Gift Cards</Link>
                <Link href="/shop">The Apothecary</Link>
                <Link href="/contact">Contact</Link>
              </div>
              <div>
                <h4>Hours</h4>
                <div className="hours">
                  {SITE.hours.map((h) => (
                    <div key={h.days}>
                      <span>{h.days}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="fine">
              <span>
                © {new Date().getFullYear()} Delta Roe · Elk Grove, California
              </span>
              <span>
                Reiki and energy work are complementary wellness practices, not
                a substitute for medical care.
              </span>
            </div>
          </div>
        </footer>

        <div className="mobile-book">
          <a href={SITE.phoneHref}>Call</a>
          <a href={SITE.bookingUrl} className="primary">
            Book a Session
          </a>
        </div>
      </body>
    </html>
  );
}
