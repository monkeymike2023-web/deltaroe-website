// The seven chakras — data behind /sound-chakras.
// Colors intentionally match the ceremonial --chakra-* vars in globals.css
// (SVG gradient stops need literal hex, so they live here too).
// Frequencies are the solfeggio tones Delta Roe's crystal bowls are tuned
// around; language stays "associated with / believed to" — never medical.

export type Chakra = {
  id: string;
  sanskrit: string;
  english: string;
  colorName: string;
  hex: string;
  frequency: number; // Hz — solfeggio tone
  bowlNote: string; // crystal singing bowl note
  supports: string; // 2–3 sentences, soft wellness language
  /** y-position of the orb along the figure's midline (SVG viewBox 0 0 440 600) */
  y: number;
};

export const CHAKRAS: Chakra[] = [
  {
    id: "root",
    sanskrit: "Muladhara",
    english: "Root",
    colorName: "Red",
    hex: "#c0392b",
    frequency: 396,
    bowlNote: "C",
    supports:
      "Seated at the base of the spine, the Root is associated with grounding, safety, and stability — your sense of standing on solid earth. When this center feels settled, many people describe feeling secure, present, and steady enough to grow.",
    y: 356,
  },
  {
    id: "sacral",
    sanskrit: "Svadhisthana",
    english: "Sacral",
    colorName: "Orange",
    hex: "#e0813c",
    frequency: 417,
    bowlNote: "D",
    supports:
      "Resting just below the navel, the Sacral center is associated with creativity, emotion, and pleasure. Tending to it is believed to support a freer flow of feeling — the ease to create, to enjoy, and to let life move through you.",
    y: 306,
  },
  {
    id: "solar-plexus",
    sanskrit: "Manipura",
    english: "Solar Plexus",
    colorName: "Yellow",
    hex: "#e8c547",
    frequency: 528,
    bowlNote: "E",
    supports:
      "Glowing in the upper abdomen, the Solar Plexus is associated with confidence and personal power — your inner fire. Nurturing this center is believed to support self-trust, healthy boundaries, and the courage to take up your space.",
    y: 262,
  },
  {
    id: "heart",
    sanskrit: "Anahata",
    english: "Heart",
    colorName: "Green",
    hex: "#57a85c",
    frequency: 639,
    bowlNote: "F",
    supports:
      "Centered in the chest, the Heart is associated with love, compassion, and connection — to others and to yourself. Many find that softening here is believed to support forgiveness, warmth, and the quiet practice of first loving yourself.",
    y: 216,
  },
  {
    id: "throat",
    sanskrit: "Vishuddha",
    english: "Throat",
    colorName: "Blue",
    hex: "#4a90d9",
    frequency: 741,
    bowlNote: "G",
    supports:
      "At the throat, this center is associated with expression and truth — saying what you mean with grace. Caring for it is believed to support clear, honest communication and the confidence to let your real voice be heard.",
    y: 158,
  },
  {
    id: "third-eye",
    sanskrit: "Ajna",
    english: "Third Eye",
    colorName: "Indigo",
    hex: "#6a5acd",
    frequency: 852,
    bowlNote: "A",
    supports:
      "Between the brows, the Third Eye is associated with intuition and clarity — the still, knowing part of you. Quieting the mind here is believed to support insight, perspective, and trust in your own inner guidance.",
    y: 104,
  },
  {
    id: "crown",
    sanskrit: "Sahasrara",
    english: "Crown",
    colorName: "Violet",
    hex: "#b48cc8",
    frequency: 963,
    bowlNote: "B",
    supports:
      "Floating at the top of the head, the Crown is associated with spiritual connection and peace — the sense of belonging to something larger. Opening here is believed to support serenity, gratitude, and deep, wordless calm.",
    y: 54,
  },
];
