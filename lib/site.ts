// TODO: replace with the real Google review short-link once the Google Business
// Profile is verified — in the GBP dashboard click "Ask for reviews" and copy the
// https://g.page/r/…/review link (see docs/gbp-kit.md, section 8).
export const REVIEW_URL = "https://g.page/r/REPLACE_ME/review";

export const YELP_URL = "https://www.yelp.com/biz/delta-roe-elk-grove";

export const SITE = {
  name: "Delta Roe",
  tagline: "Mind · Body · Spirit",
  description:
    "Reiki healing, sound baths, chakra alignment, and life coaching in historic Old Town Elk Grove, CA. A sanctuary to realign, restore, and recharge.",
  url: "https://deltaroe.com",
  phone: "(916) 206-1752",
  phoneHref: "tel:+19162061752",
  email: "Info@deltaroe.com",
  address: {
    street: "9075 Elk Grove Blvd, Suite 220A",
    city: "Elk Grove",
    state: "CA",
    zip: "95624",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Delta+Roe+9075+Elk+Grove+Blvd+Suite+220A+Elk+Grove+CA+95624",
  // Booking runs through the existing scheduler until Square Appointments goes live.
  bookingUrl: "https://www.deltaroe.com/book-online",
  hours: [
    { days: "Monday – Wednesday", time: "9:00 am – 9:00 pm" },
    { days: "Thursday", time: "9:00 am – 5:00 pm" },
    { days: "Friday", time: "1:00 pm – 3:00 pm" },
    { days: "Saturday", time: "11:00 am – 3:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
  founder: "Tamika Banks",
  credentials: "Certified Reiki Master & Empowerment Life Coach",
};

// One nav, both headers: desktop row and the mobile menu.
export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/sound-chakras", label: "Chakras" },
  { href: "/memberships", label: "Memberships" },
  { href: "/shop", label: "Apothecary" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

// Extra destinations that only fit in the roomier mobile menu.
export const NAV_MOBILE_EXTRA = [
  { href: "/the-clearing", label: "The Clearing" },
  { href: "/journal", label: "Journal" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;
