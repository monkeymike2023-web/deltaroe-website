export type Product = {
  id: string;
  name: string;
  collection: string;
  price: number;
  desc: string;
  detail: string;
  art: "candle" | "oil" | "bracelet" | "crystals" | "smoke" | "tee" | "hat" | "tea" | "journal" | "jewelry";
  image?: string;
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "candle-return",
    name: "Return to Yourself",
    collection: "Intention Candles",
    price: 38,
    desc: "Hand-poured soy candle in the signature black-and-gold vessel. Sandalwood, amber, and a whisper of rose.",
    detail: "100% soy wax · cotton wick · ~45 hr burn · poured in the USA",
    art: "candle",
    image: "/img/products/candle-return.jpg",
    badge: "Signature",
  },
  {
    id: "candle-grounded",
    name: "Rooted & Grounded",
    collection: "Intention Candles",
    price: 38,
    desc: "For root-chakra work and heavy weeks. Vetiver, cedarwood, and dark patchouli in matte black glass.",
    detail: "100% soy wax · cotton wick · ~45 hr burn",
    art: "candle",
    image: "/img/products/candle-grounded.jpg",
  },
  {
    id: "oil-grounding",
    name: "Grounding Ritual Oil",
    collection: "Ritual & Body Oils",
    price: 34,
    desc: "The studio blend — the same oil that scents every Delta Roe session. Roll on pulse points before you need your center.",
    detail: "10 ml roll-on · jojoba base · vetiver, frankincense, bergamot",
    art: "oil",
    image: "/img/products/oil-grounding.jpg",
    badge: "Studio blend",
  },
  {
    id: "oil-clarity",
    name: "Third Eye Clarity Oil",
    collection: "Ritual & Body Oils",
    price: 34,
    desc: "Clary sage, lavender, and juniper for meditation, journaling, and decisions that deserve a clear head.",
    detail: "10 ml roll-on · jojoba base",
    art: "oil",
    image: "/img/products/oil-clarity.jpg",
  },
  {
    id: "chakra-bracelet",
    name: "Seven Stone Chakra Bracelet",
    collection: "Chakra & Crystals",
    price: 42,
    desc: "All seven energy centers on one wrist — genuine stones, root to crown, hand-strung and reiki-charged before shipping.",
    detail: "8 mm natural stones · elastic fit · charged in-studio",
    art: "bracelet",
    badge: "Reiki-charged",
  },
  {
    id: "crystal-sleep",
    name: "Sleep & Calm Crystal Kit",
    collection: "Chakra & Crystals",
    price: 36,
    desc: "Amethyst, moonstone, lepidolite, and howlite with a bedside ritual card — for minds that won't clock out.",
    detail: "4 stones · linen pouch · ritual card",
    art: "crystals",
    image: "/img/products/crystal-sleep.jpg",
  },
  {
    id: "smoke-kit",
    name: "Sacred Smoke Reset Kit",
    collection: "Sacred Smoke",
    price: 28,
    desc: "California white sage, palo santo, and an abalone shell — everything needed to clear a room or a mood.",
    detail: "Ethically harvested · instruction card included",
    art: "smoke",
    image: "/img/products/smoke-kit.jpg",
  },
  {
    id: "tee-lotus",
    name: "The Lotus Tee",
    collection: "The Delta Roe Collection",
    price: 32,
    desc: "The gold emblem on a soft, heavyweight black tee. Wear the reminder to return to yourself.",
    detail: "Premium combed cotton · unisex fit · printed in the USA",
    art: "tee",
    image: "/img/products/tee-lotus.jpg",
  },
  {
    id: "hat-emblem",
    name: "Emblem Hat",
    collection: "The Delta Roe Collection",
    price: 30,
    desc: "Gold-embroidered lotus mark on a structured black cap. Quiet luxury for loud days.",
    detail: "Embroidered · adjustable strap",
    art: "hat",
  },
  {
    id: "tea-ritual",
    name: "Evening Ritual Tea",
    collection: "The Apothecary Pantry",
    price: 24,
    desc: "A caffeine-free blend of chamomile, tulsi, and blue lotus — the sound bath of teas.",
    detail: "Loose leaf · 20 servings · blended in California",
    art: "tea",
  },
  {
    id: "journal-gold",
    name: "The Alignment Journal",
    collection: "The Delta Roe Collection",
    price: 26,
    desc: "Gold-foil hardcover journal with moon phases and chakra check-in pages. Where the session insights land.",
    detail: "Hardcover · 160 lined pages · foil-stamped",
    art: "journal",
  },
  {
    id: "jewelry-limited",
    name: "Hand-Charged Pendant — Limited Run",
    collection: "Reiki-Charged Jewelry",
    price: 88,
    desc: "Tamika's original craft: one-of-a-kind crystal pendants personally charged in ceremony. Small batches, never repeated.",
    detail: "One of a kind · charged in-studio · gift boxed",
    art: "jewelry",
    badge: "Limited",
  },
];
