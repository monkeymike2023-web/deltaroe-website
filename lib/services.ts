export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  menuName: string;
  price: number;
  priceNote?: string;
  duration: string;
  durationIso: string; // ISO 8601 for schema
  tag: string;
  short: string; // one-line for menus
  answer: string; // direct-answer opening paragraph (AI/SEO)
  intro: string;
  expect: { title: string; body: string }[];
  benefits: string[];
  faqs: ServiceFaq[];
  review: { quote: string; source: string };
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  chakra?: boolean; // page may use the ceremonial chakra spectrum
};

export const SERVICES: Service[] = [
  {
    slug: "reiki-elk-grove",
    name: "Reiki Healing",
    menuName: "Reiki Session",
    price: 144,
    duration: "30 minutes",
    durationIso: "PT30M",
    tag: "Signature",
    short:
      "Gentle, intuitive energy healing in a multi-sensory sanctuary of singing bowls, essential oils, and guided relaxation.",
    answer:
      "A reiki session at Delta Roe in Elk Grove lasts 30 minutes and costs $144. Sessions are led by Tamika Banks, a Certified Reiki Master, and blend hands-on energy healing with Tibetan singing bowls, crystal sound, essential oils, and guided relaxation.",
    intro:
      "Reiki is a gentle Japanese energy-healing practice that helps release what the body has been holding — stress, grief, tension, stuck emotion — so your own energy can flow the way it was meant to. At Delta Roe, reiki is never clinical or cold. You rest fully clothed in a candle-lit room while Tamika works intuitively through the body's energy centers, layering in sound, scent, and stillness.",
    expect: [
      {
        title: "Arrive & settle",
        body: "You'll be welcomed into the studio, we'll talk briefly about what you're carrying and what you'd like to release, and you'll settle onto the table fully clothed.",
      },
      {
        title: "The session",
        body: "Light or hovering touch moves through the body's energy centers while singing bowls, essential oils, and guided breath deepen the release. Many clients feel warmth, gentle movement, or waves of deep calm.",
      },
      {
        title: "Integration",
        body: "You'll return slowly, share what you noticed if you wish, and leave with simple aftercare guidance — hydration, rest, and how to hold the shift.",
      },
    ],
    benefits: [
      "Deep nervous-system relaxation and stress release",
      "Emotional clearing after grief, burnout, or life transitions",
      "Better sleep and a quieter mind",
      "Renewed energy and a feeling of lightness — clients describe leaving \"light, rejuvenated, and happy\"",
    ],
    faqs: [
      {
        q: "What should I wear to a reiki session?",
        a: "Comfortable, loose clothing. You remain fully clothed for the entire session — only shoes come off.",
      },
      {
        q: "Will I feel anything during reiki?",
        a: "Everyone is different. Common sensations include warmth, tingling, gentle movement of energy, deep relaxation, or simply falling into a meditative rest. There's no wrong way to experience it.",
      },
      {
        q: "Is reiki a substitute for medical care?",
        a: "No. Reiki is a complementary relaxation and wellness practice. It works beautifully alongside — never instead of — care from your doctor or therapist.",
      },
      {
        q: "How often should I come?",
        a: "Many clients start with a session every 2–4 weeks, then space them out as they learn how long the calm holds. Tamika will suggest a rhythm after your first visit.",
      },
    ],
    review: {
      quote:
        "I wasn't sure what to expect going into my Reiki session, but wow. I felt clear movement in my feet and legs even when she wasn't touching them.",
      source: "Google review",
    },
    seoTitle: "Reiki Healing in Elk Grove, CA | Delta Roe",
    seoDescription:
      "30-minute reiki sessions with a Certified Reiki Master in historic Old Town Elk Grove. Singing bowls, essential oils, deep relaxation. $144 — book online.",
    image: "/img/service-reiki.jpg",
    imageAlt: "Tingsha cymbals, healing crystals, an abalone shell and feather arranged for a reiki session",
  },
  {
    slug: "sound-bath-elk-grove",
    name: "Sound Bath",
    menuName: "Sound Bath",
    price: 77,
    duration: "30 minutes",
    durationIso: "PT30M",
    tag: "Most accessible",
    short:
      "Tibetan and crystal singing bowls tuned to 432 Hz wash over you in waves of vibration — meditation without the effort.",
    answer:
      "A sound bath at Delta Roe in Elk Grove lasts 30 minutes and costs $77. You lie back, fully supported, while Tibetan and crystal singing bowls tuned to 432 Hz — layered with binaural beats — guide your brain and body into deep meditative rest.",
    intro:
      "If your mind won't sit still for meditation, sound does the work for you. Frequencies from Tibetan and crystal singing bowls slow brainwave activity the way an hour of deep meditation would — you simply lie down, wrapped and comfortable, and let the vibration move through you. It's the easiest first step into energy work, and the reason many Delta Roe regulars started here.",
    expect: [
      {
        title: "Cocoon in",
        body: "You'll settle onto a cushioned mat with blankets and an eye pillow, in low candle-light.",
      },
      {
        title: "The immersion",
        body: "Waves of sound from bowls tuned to 432 Hz move around and over you, layered with binaural beats. Most people drop into a dream-like theta state within minutes.",
      },
      {
        title: "The return",
        body: "You're guided gently back, given a moment to re-land, and you'll walk out noticeably slower, softer, and clearer.",
      },
    ],
    benefits: [
      "Deep meditative rest without needing to \"be good at\" meditating",
      "Relief from anxiety, overthinking, and sensory overload",
      "Improved sleep the night of a session — the most common report",
      "A gentle, no-touch introduction to energy healing",
    ],
    faqs: [
      {
        q: "What is 432 Hz and why does it matter?",
        a: "432 Hz is a tuning many sound healers use because clients consistently describe it as warmer and more settling than standard concert pitch. Combined with binaural beats, it encourages the brain toward slower, meditative wave states.",
      },
      {
        q: "Do I need any experience to attend a sound bath?",
        a: "None. You lie down and listen — that's the entire job. It's the most beginner-friendly offering at Delta Roe.",
      },
      {
        q: "Can I book a sound bath for a group or private event?",
        a: "Yes — group sound baths and private events are available. Reach out at (916) 206-1752 or Info@deltaroe.com to arrange one.",
      },
    ],
    review: {
      quote:
        "My mind relaxed, then my body followed. After my treatment I felt light, rejuvenated, and happy!",
      source: "Google review",
    },
    seoTitle: "Sound Bath in Elk Grove, CA — 432 Hz Sound Healing | Delta Roe",
    seoDescription:
      "30-minute 432 Hz sound baths with Tibetan & crystal singing bowls in Old Town Elk Grove. Deep rest for busy minds. $77 — book online.",
    image: "/img/service-sound-bath.jpg",
    imageAlt: "Hammered Tibetan singing bowl with wooden mallet in warm candlelight",
  },
  {
    slug: "chakra-alignment",
    name: "Chakra Alignment",
    menuName: "Chakra Alignment + Sound Bath",
    price: 177,
    priceNote: "with sound bath · Reiki & Chakra Alignment $144",
    duration: "30 minutes",
    durationIso: "PT30M",
    tag: "Deep reset",
    short:
      "Reiki, guided meditation, and intuitive chakra balancing to clear energetic blockages from crown to root.",
    answer:
      "A chakra alignment at Delta Roe in Elk Grove lasts 30 minutes and costs $177 paired with a sound bath, or $144 paired with reiki. The session combines reiki energy healing, guided meditation, and intuitive balancing of the seven chakras to clear energetic blockages.",
    intro:
      "The seven chakras are the body's energy centers — root to crown — and when one is blocked, you feel it: fog you can't name, emotions that loop, exhaustion that sleep doesn't fix. In a chakra alignment, Tamika reads where energy is stuck and works center by center — reiki, sound, crystal placement, and guided meditation — until the whole column flows again.",
    expect: [
      {
        title: "Reading the field",
        body: "The session begins with a brief intuitive assessment of where energy feels dense, guarded, or depleted.",
      },
      {
        title: "Center by center",
        body: "Working from root to crown, each chakra is cleared and balanced with reiki, targeted sound frequencies, and crystals matched to each center.",
      },
      {
        title: "Sealing the work",
        body: "The session closes with grounding — so the alignment holds when you walk back into your life.",
      },
    ],
    benefits: [
      "Clears the \"stuck\" feeling that lingers after stress, loss, or change",
      "Restores emotional balance and mental clarity",
      "Pairs reiki, sound, and crystal work in one integrated session",
      "The signature Delta Roe experience — the fullest single-session reset on the menu",
    ],
    faqs: [
      {
        q: "How do I know if my chakras are blocked?",
        a: "Common signs: persistent fatigue, looping emotions, feeling unheard (throat), difficulty trusting your gut (solar plexus), or feeling disconnected (crown). Tamika assesses this intuitively at the start of every session.",
      },
      {
        q: "What's the difference between chakra alignment and reiki?",
        a: "Reiki is the healing energy; chakra alignment is a structured session that applies it center by center along with sound and crystals. If reiki is the medicine, alignment is the full treatment plan.",
      },
      {
        q: "Which option should I book?",
        a: "Chakra Alignment + Sound Bath ($177) is the fullest experience. Reiki & Chakra Alignment ($144) focuses the session on hands-on energy work. Unsure? Book the free discovery call.",
      },
    ],
    review: {
      quote:
        "My first Reiki/Crystal session was with Ms. Banks… my mind relaxed then my body followed.",
      source: "Google review",
    },
    seoTitle: "Chakra Alignment & Balancing in Elk Grove, CA | Delta Roe",
    seoDescription:
      "Intuitive chakra balancing with reiki, sound, and crystals in Old Town Elk Grove. Clear energetic blockages from root to crown. From $144 — book online.",
    image: "/img/service-chakra.jpg",
    imageAlt: "Quartz crystal towers and tumbled stones on black",
    chakra: true,
  },
  {
    slug: "fascia-flow-reset",
    name: "Fascia Flow Reset",
    menuName: "Fascia Flow Reset + Sound Bath",
    price: 188,
    duration: "30 minutes",
    durationIso: "PT30M",
    tag: "Body-first",
    short:
      "Gentle fascia release paired with a 432 Hz sound bath — for tension the body holds that stretching can't reach.",
    answer:
      "The Fascia Flow Reset at Delta Roe in Elk Grove is a 30-minute session costing $188 that pairs gentle fascia-release work with a 432 Hz sound bath — releasing physical tension and the stored stress underneath it in the same session.",
    intro:
      "Fascia is the connective tissue that wraps every muscle — and it's where the body files unfinished stress. Tight shoulders that massage doesn't fix, a jaw that won't unclench, breath that stays shallow: that's fascia holding a pattern. This session releases the tissue gently while sound slows the nervous system, so the body lets go instead of bracing.",
    expect: [
      {
        title: "Where the body holds",
        body: "A short conversation and assessment finds where your tension pattern lives — shoulders, hips, jaw, breath.",
      },
      {
        title: "Release + resonance",
        body: "Gentle, sustained fascia work moves through those areas while the sound bath keeps your nervous system in rest-and-release rather than guard mode.",
      },
      {
        title: "Re-pattern",
        body: "You'll leave with one or two simple practices to keep the tissue — and the pattern — from re-tightening.",
      },
    ],
    benefits: [
      "Releases chronic tension that stretching and massage haven't resolved",
      "Physical and energetic release in a single session",
      "Noticeably freer breath and posture afterward",
      "Ideal for desk-bound professionals and athletes alike",
    ],
    faqs: [
      {
        q: "Is fascia work painful?",
        a: "No — this is slow, sustained, gentle release, not deep-tissue pressure. The sound bath keeps your system relaxed, which is what actually lets fascia soften.",
      },
      {
        q: "How is this different from massage?",
        a: "Massage works muscle; this works the connective web around it, paired with sound to address the stress pattern that created the tension in the first place.",
      },
    ],
    review: {
      quote:
        "I felt clear movement in my feet and legs even when she wasn't touching them.",
      source: "Google review",
    },
    seoTitle: "Fascia Release + Sound Bath in Elk Grove, CA | Delta Roe",
    seoDescription:
      "The Fascia Flow Reset pairs gentle fascia release with a 432 Hz sound bath in Old Town Elk Grove. Release what stretching can't. $188 — book online.",
    image: "/img/service-fascia.jpg",
    imageAlt: "Amber massage-oil bottles with soft towels and linen",
  },
  {
    slug: "life-coaching",
    name: "Life Coaching",
    menuName: "Life Coaching — Clarity, Healing & Growth",
    price: 250,
    duration: "90 minutes",
    durationIso: "PT1H30M",
    tag: "Transformation",
    short:
      "One-on-one empowerment coaching — goal-setting, limiting beliefs, and alignment with purpose, guided by intuition.",
    answer:
      "A life-coaching session at Delta Roe in Elk Grove lasts 90 minutes and costs $250. Sessions are one-on-one with Tamika Banks, a certified Empowerment Life Coach, and focus on clarity, healing, limiting beliefs, and aligning your life with purpose.",
    intro:
      "Some seasons need more than relaxation — they need a guide. Empowerment coaching at Delta Roe is a 90-minute working session: naming what you actually want, finding the beliefs in the way, and building the path between. Tamika coaches the way she heals — intuitive, direct, and entirely in your corner. For deeper work, the Soulful Journey Transformation Program extends this into a 12-month container.",
    expect: [
      {
        title: "Clarity",
        body: "We name the real goal — not the safe version of it — and what's been keeping it at arm's length.",
      },
      {
        title: "The work",
        body: "Limiting beliefs get examined and dismantled; energy work can be woven in when the block lives deeper than logic.",
      },
      {
        title: "The path",
        body: "You leave with concrete next steps and, if you choose, a rhythm of ongoing sessions or the year-long Soulful Journey program.",
      },
    ],
    benefits: [
      "A full 90 minutes of undivided, one-on-one guidance",
      "Blends practical goal work with energetic and spiritual insight",
      "Gateway to the 12-month Soulful Journey Transformation Program",
      "Begin with a free 30-minute discovery call — zero risk",
    ],
    faqs: [
      {
        q: "How is this different from therapy?",
        a: "Coaching is forward-looking — goals, decisions, momentum. It complements rather than replaces mental-health care, and Tamika will always encourage professional support where it's needed.",
      },
      {
        q: "What is the Soulful Journey Transformation Program?",
        a: "A 12-month container at $399/month: monthly master classes, four 30-minute reiki sessions, bi-weekly one-on-one coaching, and quarterly live panels. It's the deepest way to work with Tamika.",
      },
      {
        q: "Can I try coaching before committing?",
        a: "Yes — book the free 30-minute Discovery Call. You'll know within that half hour whether this is your person.",
      },
    ],
    review: {
      quote:
        "Guided by divine intuition, ancient wisdom, and a deep passion for helping others return to themselves.",
      source: "The Delta Roe promise",
    },
    seoTitle: "Life Coaching in Elk Grove, CA — Empowerment Coaching | Delta Roe",
    seoDescription:
      "90-minute one-on-one empowerment coaching with a certified life coach in Elk Grove. Clarity, healing & growth. $250 — free discovery call available.",
    image: "/img/service-coaching.jpg",
    imageAlt: "Candle flames glowing in a dark room",
  },
];

export const COMBOS = [
  { name: "Reiki + Sound Bath", price: 188, duration: "30 min" },
  { name: "Reiki & Chakra Alignment", price: 144, duration: "30 min" },
  { name: "Chakra Alignment + Sound Bath", price: 177, duration: "30 min" },
  { name: "Fascia Flow Reset + Sound Bath", price: 188, duration: "30 min" },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
