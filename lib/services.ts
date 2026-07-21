export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  menuName: string;
  price: number; // 0 = free (renders as "Free" via fmtPrice)
  priceNote?: string;
  duration?: string; // omit when the session length is set at booking
  durationIso?: string; // ISO 8601 for schema
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

// Authored in menu order; the export below re-sorts lowest → highest price
// (Tamika's rule, 7/14/2026) so every menu renders the same way.
const ALL_SERVICES: Service[] = [
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
    image: "/img/hero-sanctuary.jpg",
    imageAlt: "Tamika sounds crystal singing bowls over a resting client amid candlelight at Delta Roe",
  },
  {
    slug: "chakra-alignment",
    name: "Chakra Alignment + Sound Bath",
    menuName: "Chakra Alignment + Sound Bath",
    price: 177,
    priceNote: "with sound bath",
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
  {
    slug: "reiki-chakra-alignment",
    name: "Reiki & Chakra Alignment",
    menuName: "Reiki & Chakra Alignment",
    price: 144,
    duration: "30 minutes",
    durationIso: "PT30M",
    tag: "Hands-on focus",
    short:
      "A full reiki session devoted to the seven energy centers — hands-on healing, center by center, from root to crown.",
    answer:
      "A Reiki & Chakra Alignment session at Delta Roe in Elk Grove lasts 30 minutes and costs $144. It's a hands-on reiki session focused entirely on the seven chakras — Tamika works center by center from root to crown, clearing and balancing each one with reiki energy healing.",
    intro:
      "This is chakra work at its most direct: a full reiki session where every minute is spent on the body's seven energy centers. Where the Chakra Alignment + Sound Bath surrounds the work with sound, this session keeps it hands-on — Tamika reads where energy is dense or depleted and works each center with reiki until the whole column flows. Choose it when you want the healing concentrated in the hands, not the room.",
    expect: [
      {
        title: "Reading the field",
        body: "A brief intuitive assessment finds which centers feel guarded, heavy, or depleted — most clients recognize the description immediately.",
      },
      {
        title: "Root to crown",
        body: "Hands-on reiki moves through each chakra in turn, staying longer where energy is stuck. Warmth, tingling, and waves of release are common.",
      },
      {
        title: "Grounding",
        body: "The session closes at the root — so you leave anchored, not floating — with simple guidance for holding the balance.",
      },
    ],
    benefits: [
      "The most focused chakra work on the menu — every minute hands-on",
      "Clears looping emotions, mental fog, and the \"stuck\" feeling",
      "Same $144 as a classic reiki session — the focus is the difference",
      "Pairs beautifully with a sound bath on a later visit",
    ],
    faqs: [
      {
        q: "How is this different from the Chakra Alignment + Sound Bath?",
        a: "Same intention, different vehicle. This session is hands-on reiki through all seven centers for $144; the $177 version wraps that work in a 432 Hz sound bath. Choose hands-on if touch is what settles you, sound if immersion is.",
      },
      {
        q: "How is this different from a regular reiki session?",
        a: "A classic reiki session goes where the energy calls. This one follows the map — all seven chakras, in order, every time. If you want structure and a full-column reset, book this.",
      },
      {
        q: "Do I stay clothed?",
        a: "Yes — fully clothed for the entire session, resting comfortably on the table in candle-light.",
      },
    ],
    review: {
      quote:
        "My first Reiki/Crystal session was with Ms. Banks… my mind relaxed then my body followed.",
      source: "Google review",
    },
    seoTitle: "Reiki & Chakra Alignment in Elk Grove, CA | Delta Roe",
    seoDescription:
      "A 30-minute hands-on reiki session focused on all seven chakras, root to crown, in Old Town Elk Grove. $144 — book online.",
    image: "/img/service-chakra.jpg",
    imageAlt: "Quartz crystal towers and tumbled stones on black",
    chakra: true,
  },
  {
    slug: "reiki-sound-bath",
    name: "Reiki + Sound Bath",
    menuName: "Reiki + Sound Bath",
    price: 188,
    duration: "30 minutes",
    durationIso: "PT30M",
    tag: "Most-booked pairing",
    short:
      "Hands-on reiki while 432 Hz singing bowls wash over you — energy healing and sound immersion in a single session.",
    answer:
      "A Reiki + Sound Bath session at Delta Roe in Elk Grove lasts 30 minutes and costs $188. It combines hands-on reiki energy healing with a full 432 Hz sound bath — Tamika works through the body's energy centers while Tibetan and crystal singing bowls carry the nervous system into deep rest.",
    intro:
      "Some sessions you choose; this one clients keep choosing — the most-booked pairing on the menu. Reiki opens and moves what the body has been holding while waves of 432 Hz sound keep the mind from standing guard. The two do together what neither does alone: the bowls quiet the thinking so the energy work lands deeper, and the reiki gives the sound somewhere to go.",
    expect: [
      {
        title: "Cocoon in",
        body: "You settle onto the table fully clothed, wrapped and supported, candle-light low, a brief word about what you're carrying.",
      },
      {
        title: "Two currents at once",
        body: "Hands-on reiki moves through the energy centers while Tibetan and crystal bowls tuned to 432 Hz sound around you. Most clients describe dropping deeper than either practice alone has taken them.",
      },
      {
        title: "The slow return",
        body: "Sound brings you back gently; you re-land, share what surfaced if you wish, and leave with aftercare guidance.",
      },
    ],
    benefits: [
      "The most-booked combination at Delta Roe — for a reason",
      "Energy healing lands deeper when sound quiets the mind first",
      "One session, two modalities — nothing else to schedule",
      "The fullest 30 minutes on the menu short of a chakra alignment",
    ],
    faqs: [
      {
        q: "Should I start with this or with a plain sound bath?",
        a: "If touch-based energy work is new to you and you'd rather ease in, start with the $77 sound bath. If you're ready for the full experience, this pairing is the one regulars book on repeat.",
      },
      {
        q: "Is it still 30 minutes if it's two modalities?",
        a: "Yes — the reiki and the sound happen together, not back-to-back. It's one seamless 30-minute immersion.",
      },
      {
        q: "What should I wear?",
        a: "Comfortable, loose clothing — you stay fully clothed, shoes off, wrapped in blankets.",
      },
    ],
    review: {
      quote:
        "My mind relaxed, then my body followed. After my treatment I felt light, rejuvenated, and happy!",
      source: "Google review",
    },
    seoTitle: "Reiki + Sound Bath in Elk Grove, CA | Delta Roe",
    seoDescription:
      "Hands-on reiki paired with a 432 Hz sound bath in one 30-minute session — Delta Roe's most-booked pairing. $188 in Old Town Elk Grove — book online.",
    image: "/img/tamika-reiki.jpg",
    imageAlt: "Tamika giving hands-on reiki over a resting client at Delta Roe",
  },
  {
    slug: "discovery-call",
    name: "Discovery Call",
    menuName: "Discovery Call",
    price: 0,
    duration: "30 minutes",
    durationIso: "PT30M",
    tag: "Start here",
    short:
      "A free 30-minute conversation with Tamika — where you are, what you're carrying, and which session fits. Zero pressure.",
    answer:
      "The Discovery Call at Delta Roe in Elk Grove is a free 30-minute conversation with Tamika Banks. You'll talk about where you are, what you're carrying, and which offering — reiki, sound bath, chakra alignment, coaching, or the Soulful Journey program — actually fits. No cost, no obligation.",
    intro:
      "Not sure where to start? That's exactly what this call is for. Thirty minutes, no charge, no pitch — just a real conversation about what brought you here and an honest recommendation for where to begin. Some people book a session afterward; some realize the Soulful Journey is what they've been circling; some just needed to be heard first. All three are wins.",
    expect: [
      {
        title: "You talk, she listens",
        body: "Tell Tamika what's going on — the stress, the stuck place, the thing you can't name. There's no wrong way to start.",
      },
      {
        title: "Honest direction",
        body: "Tamika will tell you plainly which offering fits — and if what you need is a therapist, a doctor, or simply rest, she'll say that too.",
      },
      {
        title: "Your choice",
        body: "You leave with a clear next step. Book it, sleep on it, or don't — the call costs nothing either way.",
      },
    ],
    benefits: [
      "Completely free — 30 minutes of real guidance, zero obligation",
      "Find the right first session instead of guessing",
      "The doorway to the Soulful Journey Transformation Program",
      "Perfect if energy work is brand new to you",
    ],
    faqs: [
      {
        q: "Is the discovery call really free?",
        a: "Really free. No card, no obligation, no hard sell — it exists so your first session is the right one.",
      },
      {
        q: "Is it in person or by phone?",
        a: "Either — most calls happen by phone or Zoom, so you can book one from anywhere.",
      },
      {
        q: "What should I prepare?",
        a: "Nothing. Come as you are; the conversation finds its own way.",
      },
    ],
    review: {
      quote:
        "Nobody stumbles into a sanctuary by accident.",
      source: "The Delta Roe welcome",
    },
    seoTitle: "Free Discovery Call — Start Your Healing Journey | Delta Roe",
    seoDescription:
      "A free 30-minute discovery call with Tamika Banks in Elk Grove, CA. Find the right session — reiki, sound bath, chakra alignment, or coaching. Book online.",
    image: "/img/about.jpg",
    imageAlt: "The candle-lit Delta Roe studio in Old Town Elk Grove",
  },
  {
    slug: "diet-nutrition-coaching",
    name: "Diet & Nutrition Coaching",
    menuName: "Diet & Nutrition Coaching",
    price: 88,
    tag: "Nourish",
    short:
      "Grounded, results-driven nutrition coaching with Cline Moore — sustainable habits, energy optimization, and physical alignment.",
    answer:
      "Diet & Nutrition Coaching at Delta Roe in Elk Grove costs $88 per session and is led by nutrition coach Cline Moore. It's a grounded, results-driven approach — practical nutrition science paired with lifestyle awareness to build realistic, consistent, effective habits.",
    intro:
      "Healing isn't only energetic — the body keeps its own ledger. This is the practical side of the Delta Roe menu: nutrition coaching with Cline Moore that trades fads and restriction for habits you can actually keep. Sustainable health, steadier energy, and a body that feels aligned with the work you're doing on the table. It pairs naturally with the energy sessions — what reiki releases, nutrition sustains.",
    expect: [
      {
        title: "Where you are",
        body: "An honest look at how you eat, sleep, and move now — no judgment, no lecture, just a clear starting point.",
      },
      {
        title: "The plan that fits your life",
        body: "Practical nutrition science shaped around your schedule, culture, and preferences — realistic beats perfect, every time.",
      },
      {
        title: "Habits that hold",
        body: "Small, consistent changes with follow-through and accountability, so the results outlast the enthusiasm.",
      },
    ],
    benefits: [
      "Results-driven and grounded — no fads, no shame",
      "Sustainable energy instead of crash-and-restrict cycles",
      "Complements the energy work: nourish what you've cleared",
      "The most affordable one-on-one offering after the sound bath",
    ],
    faqs: [
      {
        q: "Who leads the nutrition coaching?",
        a: "Cline Moore, Delta Roe's nutrition coach — a grounded, practical guide focused on sustainable habits rather than quick fixes.",
      },
      {
        q: "Is this a meal plan service?",
        a: "It's bigger than a meal plan: nutrition science plus lifestyle awareness, built into habits that fit your real life. A rigid plan you'll abandon in three weeks isn't the goal — consistency is.",
      },
      {
        q: "How long is a session?",
        a: "Session length is set when you book — reach out at (916) 206-1752 or Info@deltaroe.com and we'll fit it to what you need.",
      },
    ],
    review: {
      quote:
        "Designed to support sustainable health, energy optimization, and physical alignment.",
      source: "The coaching promise",
    },
    seoTitle: "Diet & Nutrition Coaching in Elk Grove, CA | Delta Roe",
    seoDescription:
      "Grounded, results-driven nutrition coaching with Cline Moore at Delta Roe in Elk Grove. Sustainable habits and energy optimization. $88 per session.",
    image: "/img/events.jpg",
    imageAlt: "Warm, welcoming gathering space at Delta Roe",
  },
  {
    slug: "chakra-alignment-session",
    name: "Chakra Alignment",
    menuName: "Chakra Alignment",
    price: 120,
    duration: "30 minutes",
    durationIso: "PT30M",
    tag: "Essential",
    short:
      "The essential chakra session — gentle energy healing with sound and crystals to clear blockages and restore balance.",
    answer:
      "A Chakra Alignment session at Delta Roe in Elk Grove lasts 30 minutes and costs $120. It's gentle energy healing focused on the seven chakras — hands-on or hands-above techniques with sound and crystals to clear energetic blockages and restore natural balance.",
    intro:
      "The essential version of Delta Roe's signature work: a focused half hour on the body's seven energy centers. Tamika works hands-on or hands-above — whichever your comfort calls for — using sound and crystals to activate the body's own intelligence and let it do what it was built to do: heal. Choose this when you want dedicated chakra work at its simplest; step up to the reiki or sound-bath pairings when you want the fuller immersion.",
    expect: [
      {
        title: "Settle in",
        body: "Fully clothed, candle-lit, a brief word about what feels blocked — stress, emotional heaviness, fatigue, or creativity that won't flow.",
      },
      {
        title: "Center by center",
        body: "Gentle hands-on or hands-above work through the seven chakras, with sound and crystals matched to each center.",
      },
      {
        title: "Rebalanced",
        body: "You leave grounded and lighter, with simple guidance for holding the balance between sessions.",
      },
    ],
    benefits: [
      "Targeted help for stress, emotional imbalance, chronic fatigue, and blocked creativity",
      "Hands-on or hands-above — your comfort leads",
      "The most affordable doorway into chakra work at Delta Roe",
      "Upgrade any time: pair it with reiki ($144) or a sound bath ($177)",
    ],
    faqs: [
      {
        q: "How is this different from the $144 and $177 chakra sessions?",
        a: "This is the essential chakra session — dedicated energy work on all seven centers. The $144 version wraps it in a full hands-on reiki treatment; the $177 version adds a 432 Hz sound bath. Start here if you're new to chakra work.",
      },
      {
        q: "Do you have to touch me?",
        a: "No — Tamika works hands-on or hands-above, whichever you prefer. You set the comfort level before the session begins.",
      },
      {
        q: "How will I know it worked?",
        a: "Most clients notice it immediately: lighter shoulders, quieter mind, steadier mood in the days after. Blocked creativity and heavy emotions tend to loosen first.",
      },
    ],
    review: {
      quote:
        "My first Reiki/Crystal session was with Ms. Banks… my mind relaxed then my body followed.",
      source: "Google review",
    },
    seoTitle: "Chakra Alignment Session in Elk Grove, CA — $120 | Delta Roe",
    seoDescription:
      "A 30-minute chakra alignment session with sound and crystals in Old Town Elk Grove. Clear blockages, restore balance. $120 — book online.",
    image: "/img/service-chakra.jpg",
    imageAlt: "Quartz crystal towers and tumbled stones on black",
    chakra: true,
  },
];

// Menu rule (Tamika, 7/14/2026): services always list lowest price first.
// Stable sort — equal-priced services keep their authored order.
export const SERVICES: Service[] = [...ALL_SERVICES].sort((a, b) => a.price - b.price);

/** menu price display — free offerings say "Free", never "$0" */
export function fmtPrice(price: number): string {
  return price === 0 ? "Free" : `$${price}`;
}

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
