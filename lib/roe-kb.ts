/**
 * Roe — Delta Roe's guide. Retrieval knowledge base.
 * Voice: Tamika Banks — warm big-sister energy, direct, empowering.
 * Rooted in her books: "FLY Queen: First Love Yourself" and "The Last Greyhound."
 * F.L.Y. = First Love Yourself. Everything points gently back to self-care — and booking it.
 *
 * Two layers, matched together (hand-written wins ties):
 *   1. KB — hand-written entries in Roe's voice.
 *   2. Generated — every site FAQ and every service's page content, ingested
 *      automatically so the bot always knows what the website says.
 */

import { SERVICES } from "./services";
import { FAQ_CATEGORIES } from "./faqs";
import { ARTICLES } from "./journal";

export type KbLink = { href: string; label: string };
export type KbEntry = {
  keywords: string[];
  boost?: string[]; // strong signals — double weight
  answer: string;
  link?: KbLink;
  chips?: string[]; // suggested follow-up questions
  label?: string; // the question this entry answers — used for "did you mean" suggestions
};

export const GREETING =
  "Hey love, welcome to Delta Roe. 🪷 I'm Roe — think of me as the studio's front porch. Whether you're curious, skeptical, or carrying something heavy, you're in the right place. What can I help you with?";

export const GREETING_CHIPS = [
  "I've never done this before",
  "What does reiki cost?",
  "Hear the sound bath",
  "Which session is right for me?",
];

export const FALLBACK =
  "That's a beautiful question, and I want you to get a real answer — not a canned one. Call Tamika's studio at (916) 206-1752 or email Info@deltaroe.com and you'll hear back quickly. Meanwhile, is there something else I can help with?";

// Softer landing when the matcher found nearby topics but nothing certain.
export const FALLBACK_NEAR =
  "I want to point you to the right answer, not guess at it. Were you asking about one of these, love? If not, a real human is one call away: (916) 206-1752.";

export const FALLBACK_CHIPS = [
  "What services do you offer?",
  "How do I book?",
  "Where are you located?",
];

export const KB: KbEntry[] = [
  {
    keywords: ["never", "first", "time", "new", "beginner", "nervous", "scared", "anxious", "start", "afraid"],
    boost: ["never", "first time", "beginner", "nervous"],
    answer:
      "First of all — the fact that you're here means something in you is ready. Nobody stumbles into a sanctuary by accident. ✨ For a first visit, I always suggest the Sound Bath ($77, 30 min): no touch, nothing to believe, nothing to be good at. You lie down under blankets and let bowls tuned to 432 Hz do the work. Or start with a free 30-minute Discovery Call and let Tamika point you to the right door.",
    link: { href: "https://www.deltaroe.com/book-online", label: "Book your first session" },
    chips: ["What happens in a sound bath?", "What should I wear?", "Is reiki safe?"],
  },
  {
    keywords: ["reiki", "energy", "healing", "session", "what", "happens"],
    boost: ["reiki"],
    answer:
      "Reiki at Delta Roe is 30 minutes ($144) with Tamika, a Certified Reiki Master. You rest fully clothed in a candle-lit room while she works through your energy centers with light or hovering touch — singing bowls, essential oils, and guided breath woven through. Clients describe warmth, gentle waves of movement, and leaving \"light, rejuvenated, and happy.\" Your only job is to receive. When was the last time that was your only job?",
    link: { href: "/services/reiki-elk-grove", label: "Reiki details & booking" },
    chips: ["Does reiki really work?", "What does reiki feel like?", "How much are sessions?"],
  },
  {
    // 432/hz stay out of the keywords: "why 432 Hz?" should route to the
    // expert FAQ explanation, not this overview.
    keywords: ["sound", "bath", "bowls", "frequency", "singing", "listen", "hear", "sample", "audio"],
    boost: ["sound bath", "sample", "hear"],
    answer:
      "A sound bath is the easiest yes you'll ever say to yourself: 30 minutes ($77) lying wrapped in blankets while Tibetan and crystal bowls tuned to 432 Hz wash over you. Your brain slides into the same slow waves as deep meditation — no effort required. There's a 60-second sample on the Sound Bath page; put headphones on, and when it ends, notice that you wish it hadn't. That feeling? That's the whole point.",
    link: { href: "/services/sound-bath-elk-grove", label: "Listen & book a sound bath" },
    chips: ["Why 432 Hz?", "Sound bath or reiki first?", "Can I book a group sound bath?"],
  },
  {
    keywords: ["price", "cost", "how", "much", "pricing", "expensive", "rates", "fee", "afford"],
    boost: ["price", "cost", "how much"],
    answer:
      "Here's the menu, straight up: Sound Bath $77 · Reiki $144 · Reiki & Chakra Alignment $144 · Chakra + Sound Bath $177 · Reiki + Sound Bath $188 · Fascia Flow Reset + Sound Bath $188 — all 30 minutes. Life Coaching is $250 for a full 90. And listen — you budget for your car's maintenance. FLY, remember? First Love Yourself. You're allowed to be on your own budget line.",
    link: { href: "/services", label: "See the full menu" },
    chips: ["Do you have memberships?", "Do you sell gift cards?", "How do I book?"],
  },
  {
    keywords: ["chakra", "alignment", "blocked", "balance", "aura", "centers"],
    boost: ["chakra"],
    answer:
      "Your chakras are the seven energy centers from root to crown — safety, creativity, power, love, truth, intuition, connection. When one's blocked you feel it: fog you can't name, emotions that loop, tired no matter how much you sleep. In a Chakra Alignment ($177 with sound bath, $144 with reiki), Tamika reads where you're stuck and works center by center with reiki, sound, and crystals until the whole column flows. It's the fullest reset on the menu.",
    link: { href: "/services/chakra-alignment", label: "Chakra alignment details" },
    chips: ["How do I know if I'm blocked?", "What is the Sound of Paint?", "Book a session"],
  },
  {
    keywords: ["book", "booking", "appointment", "schedule", "reserve", "available", "availability", "openings", "walk", "walk-in", "walk-ins", "drop"],
    boost: ["book", "appointment", "schedule", "walk in", "walk-in"],
    answer:
      "Booking takes under a minute online — every session, including the free Discovery Call. Sessions are by appointment only, so the studio is always yours alone. Same-week openings are common, and Monday–Wednesday evenings (open until 9pm) are perfect for exhaling after work. Don't overthink it, love. The calendar is the easy part; showing up for yourself is the practice.",
    link: { href: "https://www.deltaroe.com/book-online", label: "Book now" },
    chips: ["What are your hours?", "Where are you located?", "What should I book first?"],
  },
  {
    keywords: ["where", "located", "location", "address", "parking", "elk", "grove", "sacramento", "directions", "near"],
    boost: ["where", "address", "parking", "located"],
    answer:
      "You'll find the sanctuary upstairs at 9075 Elk Grove Blvd, Suite 220A — in historic Old Town Elk Grove, about 20 minutes south of downtown Sacramento. Free street parking sits right on Elk Grove Blvd, with public lots a short stroll away. Come a few minutes early and walk Old Town slowly. Consider it the pre-ceremony.",
    link: { href: "/contact", label: "Directions & hours" },
    chips: ["What are your hours?", "Do you do virtual sessions?", "Book a session"],
  },
  {
    keywords: ["hours", "open", "time", "when", "today", "tonight", "weekend", "sunday", "saturday"],
    boost: ["hours", "open"],
    answer:
      "Monday–Wednesday 9am–9pm (yes, evenings — decompress after work), Thursday 9am–5pm, Friday 1–3pm, Saturday 11am–3pm, closed Sunday. Everything is by appointment so the room is always private. The night session hits different: you leave calm and go straight home to sleep like royalty.",
    link: { href: "https://www.deltaroe.com/book-online", label: "See open times & book" },
    chips: ["How do I book?", "Where are you located?"],
  },
  {
    // "ritual" deliberately absent: "is the Ritual Membership worth it" should
    // route to the specific FAQ answer, not this overview.
    keywords: ["membership", "subscription", "monthly", "member", "sanctuary", "circle", "plan"],
    boost: ["membership", "subscription", "monthly"],
    answer:
      "Three ways to make healing a rhythm instead of a rescue: The Sanctuary Circle ($33/mo, fully virtual — live monthly sound bath, the recorded 432 Hz library, new meditations); The Ritual Membership ($129/mo — a session every month, your choice, with rollover and 10% off everything); and The Soulful Journey ($399/mo — the 12-month transformation container). One session feels wonderful. A practice changes your life.",
    link: { href: "/memberships", label: "Compare memberships" },
    chips: ["Tell me about the Soulful Journey", "Is the Ritual Membership worth it?", "What's in the Ritual Box?"],
  },
  {
    keywords: ["soulful", "journey", "transformation", "program", "coaching", "coach", "life", "change", "stuck", "purpose"],
    boost: ["soulful journey", "coaching", "life coach"],
    answer:
      "Tamika wrote in FLY Queen that transformation starts the day you decide you're worth the work — the Soulful Journey is that decision, structured. Twelve months at $399/mo: monthly master classes, four reiki sessions every month, and bi-weekly one-on-one coaching built around your personal roadmap. If you're not ready for the year, start with a single 90-minute coaching session ($250) or the free Discovery Call. Tamika coaches like she writes: direct, warm, and entirely in your corner.",
    link: { href: "/soulful-journey", label: "Explore the Soulful Journey" },
    chips: ["Book a free Discovery Call", "What are her books about?", "What does coaching cost?"],
  },
  {
    keywords: ["book", "books", "author", "fly", "queen", "greyhound", "grayhound", "wrote", "written", "read"],
    boost: ["fly queen", "greyhound", "books", "author"],
    answer:
      "Yes — Tamika is a published author twice over. 💛 FLY Queen: First Love Yourself is her collection of stories, poems, and real strategies for rising out of crisis — FLY stands for First Love Yourself, and it's the philosophy under everything at Delta Roe. The Last Greyhound tells a young woman's true journey through rejection and abandonment toward identity and self-love. She built this studio the way she wrote those books: from lived experience, not theory. That's who's holding the space when you walk in.",
    chips: ["Tell me about Tamika", "Book a coaching session", "What services do you offer?"],
  },
  {
    keywords: ["tamika", "who", "owner", "founder", "practitioner", "about", "banks", "credentials", "certified"],
    boost: ["tamika", "who is"],
    answer:
      "Tamika Banks is the heart of Delta Roe: Certified Reiki Master, Empowerment Life Coach, published author of two books on self-love and resilience, and creator of Sound-Integrated Self-Defense™. What began as Nirvana Love evolved into this sanctuary in Old Town Elk Grove. Her approach is gentle, intuitive, and personal — clients' words, not mine: \"my mind relaxed, then my body followed.\"",
    link: { href: "/about", label: "Read her story" },
    chips: ["What are her books about?", "Book with Tamika", "What services do you offer?"],
  },
  {
    keywords: ["services", "offer", "menu", "options", "everything", "list", "do you"],
    boost: ["services", "menu", "what do you offer"],
    answer:
      "The full menu, all in a candle-lit private studio: Sound Baths ($77) · Reiki ($144) · Chakra Alignment ($144–177) · Fascia Flow Reset ($188) · Life Coaching ($250/90min) · plus group sound baths, corporate wellness, The Sound of Paint workshop series, Sound-Integrated Self-Defense™, memberships from $33/mo, and the Apothecary shop. Every path leads to the same place: you, back home in yourself.",
    link: { href: "/services", label: "Explore all services" },
    chips: ["Which session is right for me?", "What's the Apothecary?", "See memberships"],
  },
  {
    keywords: ["which", "right", "for", "me", "choose", "recommend", "best", "should", "pick", "help", "decide"],
    boost: ["which", "recommend", "right for me"],
    answer:
      "Let's find your door. Racing mind that won't shut off? → Sound Bath ($77). Carrying grief, heartbreak, or heaviness? → Reiki ($144). Feeling stuck and foggy everywhere at once? → Chakra Alignment + Sound Bath ($177). Body tension that massage never fixes? → Fascia Flow Reset ($188). Standing at a crossroads in your life? → Coaching, starting with the free Discovery Call. And if you're still unsure — the Discovery Call is free, love. That's what it's for.",
    link: { href: "https://www.deltaroe.com/book-online", label: "Book a free Discovery Call" },
    chips: ["What's a sound bath like?", "Tell me about reiki", "What does coaching cost?"],
  },
  {
    keywords: ["gift", "card", "certificate", "present", "mom", "birthday", "anniversary", "wife", "husband", "friend"],
    boost: ["gift"],
    answer:
      "A Delta Roe gift card says 'I see how much you're carrying' better than anything wrapped in a box. The $77 sound bath is the perfect gift for someone who 'can't relax'; $144 gives a full reiki session. Call (916) 206-1752 or email Info@deltaroe.com — same-day arrangement with a personal note included.",
    link: { href: "/gift-cards", label: "Gift card options" },
    chips: ["Can I book a group event?", "What services do you offer?"],
  },
  {
    keywords: ["shop", "apothecary", "candle", "candles", "oil", "oils", "crystal", "crystals", "products", "buy", "merch", "tea", "sage"],
    boost: ["shop", "apothecary", "candles", "products"],
    answer:
      "The Apothecary is the studio you can take home: Delta Roe intention candles, ritual body oils (the same blends that scent every session), crystals and chakra sets, sacred smoke kits, hand-charged jewelry Tamika makes herself, and the Monthly Ritual Box subscription ($44/mo). The online shop is in preview right now — everything's available in-studio today, and the launch list gets first access plus a launch discount.",
    link: { href: "/shop", label: "Browse the Apothecary" },
    chips: ["What's in the Ritual Box?", "Join the launch list", "Book a session"],
  },
  {
    keywords: ["ritual", "box", "subscription", "monthly", "box"],
    boost: ["ritual box"],
    answer:
      "The Monthly Ritual Box ($44/mo) is a ritual delivered to your door: an intention candle, a ritual oil or tea, a crystal chosen for the season, and a practice card written by Tamika. Cancel anytime, free local pickup in Elk Grove, and members save 10% in the Apothecary. It's the difference between owning nice things and having a practice.",
    link: { href: "/shop", label: "See the Ritual Box" },
    chips: ["What else is in the shop?", "Tell me about memberships"],
  },
  {
    keywords: ["group", "event", "party", "private", "bridal", "birthday", "team", "corporate", "office", "work", "company", "couple", "couples", "partner"],
    boost: ["group", "corporate", "party", "event", "couple"],
    answer:
      "Yes — and a shared sound bath is something a group never forgets. Private group sound baths work beautifully for 6–20 people: birthdays, bridal parties, girls' nights, grief circles, and corporate teams (on-site around Sacramento or in the Old Town studio). Tamika built Delta Roe partly for burnt-out professionals — your team is exactly who she had in mind. Email Info@deltaroe.com with your date and headcount.",
    link: { href: "/corporate-wellness", label: "Groups & corporate wellness" },
    chips: ["What does a sound bath cost?", "What is the Sound of Paint?"],
  },
  {
    keywords: ["sound", "paint", "art", "workshop", "class", "events", "calendar", "upcoming"],
    boost: ["sound of paint", "events", "workshop"],
    answer:
      "The Sound of Paint 🎨 is Delta Roe's signature series: a live sound bath tuned to one chakra while you paint whatever the frequency moves in you. Zero art skill required — the bowls do the guiding. The series travels all seven centers, root to crown, one color at a time. There's also Sound-Integrated Self-Defense™ and virtual circles on Zoom. Dates live on the events calendar.",
    link: { href: "/events", label: "See upcoming events" },
    chips: ["What is Sound-Integrated Self-Defense?", "Book a private event"],
  },
  {
    keywords: ["defense", "self-defense", "self", "protect", "safety", "empowerment"],
    boost: ["self-defense", "defense"],
    answer:
      "Sound-Integrated Self-Defense™ is Tamika's own trademarked creation: practical self-defense training woven with sound work — learning to hold your ground and your center in the same hour. It comes straight from her story; The Last Greyhound is about surviving what tried to break her. This class is that survival, turned into strength you can hand to someone else. Recurring dates in Elk Grove.",
    link: { href: "/events", label: "Find the next class" },
    chips: ["See all events", "Tell me about Tamika"],
  },
  {
    keywords: ["virtual", "online", "zoom", "distance", "remote", "far", "travel"],
    boost: ["virtual", "zoom", "online", "distance"],
    answer:
      "Distance is no obstacle to this work, love. Reiki sessions run over Zoom (distance reiki is a long-established practice), the Sanctuary Circle membership ($33/mo) is fully virtual with live monthly sound baths and a recorded 432 Hz library, and coaching happens anywhere you are. The healing travels; you don't have to.",
    link: { href: "/memberships", label: "Join the Sanctuary Circle" },
    chips: ["How does virtual reiki work?", "See memberships"],
  },
  {
    keywords: ["work", "real", "science", "proof", "skeptic", "skeptical", "scam", "fake", "evidence", "actually", "really"],
    boost: ["science", "skeptic", "really work", "actually work", "proof"],
    answer:
      "I love this question — bring the skepticism, seriously. The honest picture: a UC San Diego study found singing-bowl meditation significantly reduced tension, anxiety, and low mood (first-timers most of all); reviews of reiki trials suggest real benefit for pain and anxiety with zero reported harms; a 22-study meta-analysis backs binaural beats for anxiety. The energy mechanism healers describe? Science hasn't measured it, and Delta Roe won't pretend otherwise. Whatever the mechanism, rest that deep changes how you sleep, cope, and carry things. Come as a skeptic. Leave as whatever you leave as.",
    link: { href: "/faq", label: "More honest answers" },
    chips: ["What does reiki feel like?", "Book a sound bath"],
  },
  {
    keywords: ["wear", "clothes", "clothing", "bring", "prepare", "before", "eat"],
    boost: ["wear", "bring", "prepare"],
    answer:
      "Come as you are — that's practically the house motto. Wear anything comfortable and loose; you stay fully clothed for every session, only shoes come off. Skip heavy perfume (the studio's essential oils are part of the experience), eat light beforehand, and if you can, don't schedule anything demanding right after. You'll want to float home, not sprint.",
    chips: ["What happens in my first session?", "Book a session"],
  },
  {
    keywords: ["cancel", "reschedule", "late", "policy", "refund", "miss"],
    boost: ["cancel", "reschedule", "policy"],
    answer:
      "Life happens — just give the studio as much notice as you can, ideally 24 hours, by phone at (916) 206-1752 or through your booking confirmation. And a loving nudge from the FLY Queen playbook: reschedule, don't cancel. The week you're 'too busy' for your session is exactly the week you need it.",
    chips: ["How do I book?", "What are your hours?"],
  },
  {
    keywords: ["safe", "pregnant", "pregnancy", "medical", "condition", "doctor", "therapy", "medication", "health"],
    boost: ["safe", "pregnant", "pregnan", "medical"],
    answer:
      "Reiki and sound baths are gentle, non-invasive, and safe for nearly everyone — including during pregnancy (many expecting mothers find sound baths deeply soothing). Two honest notes: these sessions complement your medical and mental-health care, never replace it; and if you have a sound-sensitive condition or use a pacemaker, mention it when booking so Tamika can adapt the session. When in doubt, ask your doctor and tell Tamika — both/and, always.",
    chips: ["What should I book first?", "Contact the studio"],
  },
  {
    keywords: ["review", "reviews", "good", "rated", "best", "testimonial", "yelp", "google"],
    boost: ["reviews", "best"],
    answer:
      "Clients call Delta Roe the best healing experience in Elk Grove — their words. A taste: \"I wasn't sure what to expect going into my Reiki session, but wow. I felt clear movement in my feet and legs even when she wasn't touching them.\" And: \"My mind relaxed, then my body followed... I felt light, rejuvenated, and happy!\" Go read the rest, then come write your own. 👑",
    link: { href: "/reviews", label: "Read the reviews" },
    chips: ["Book my first session", "Which session is right for me?"],
  },
  {
    keywords: ["contact", "phone", "call", "email", "reach", "number", "talk", "human"],
    boost: ["contact", "phone", "email"],
    answer:
      "A real human is one ring away: (916) 206-1752, or email Info@deltaroe.com. Tamika's studio answers personally — no phone trees, no scripts. And if it's easier to just come by: 9075 Elk Grove Blvd, Suite 220A, upstairs in Old Town Elk Grove.",
    link: { href: "/contact", label: "Contact & directions" },
    chips: ["What are your hours?", "Book online instead"],
  },
  {
    keywords: ["fascia", "tension", "massage", "knots", "tight", "stiff", "shoulders", "neck", "back", "body", "release", "muscle"],
    boost: ["fascia", "tension", "massage"],
    answer:
      "If massage and stretching keep not-fixing it, the tension probably lives in your fascia — the connective tissue wrapping every muscle, and the body's favorite place to store unfinished stress. The Fascia Flow Reset ($188, 30 min) pairs gentle, sustained fascia release with a live 432 Hz sound bath, so your nervous system stays in rest-and-release instead of bracing against the work. Clients describe it as the exhale their body's been waiting years for.",
    link: { href: "/services/fascia-flow-reset", label: "Fascia Flow Reset details" },
    chips: ["What should I wear?", "Sound bath or fascia first?", "Book a session"],
  },
  {
    keywords: ["discovery", "call", "free", "consult", "consultation", "talk", "questions", "unsure", "intro"],
    boost: ["discovery call", "free call", "consultation"],
    answer:
      "The Discovery Call is 30 minutes, completely free, and exactly what it sounds like: you and Tamika, talking about what you're carrying and which door makes sense — session work, coaching, or the Soulful Journey. No script, no pressure, no card required. If a session is a leap, this is the step. Every transformation at Delta Roe has started with this exact conversation.",
    link: { href: "https://www.deltaroe.com/book-online", label: "Book your free Discovery Call" },
    chips: ["What does coaching cost?", "Which session is right for me?"],
  },
  {
    keywords: ["combo", "combination", "combined", "together", "difference", "versus", "vs", "compare", "both", "add", "pair", "sound", "bath", "reiki", "chakra", "fascia"],
    boost: ["difference between", "difference", "at the same time", "combine", "sound bath or reiki", "reiki or sound"],
    answer:
      "Yes, love — the combos are where the magic multiplies. Reiki + Sound Bath ($188) is the most-booked pairing: hands-on energy work while the bowls hold the room. Chakra Alignment comes paired two ways — with a sound bath ($177) or with reiki ($144). And the Fascia Flow Reset ($188) is itself a combo: fascia release inside a live sound bath. Rule of thumb: sound reaches the mind, reiki reaches the heart, fascia reaches the body — combine the two you need most.",
    link: { href: "/services", label: "Compare all sessions" },
    chips: ["Which session is right for me?", "How much are sessions?", "Book a session"],
  },

  /* ---- expert layer: the deeper questions, answered honestly ---- */
  {
    keywords: ["reiki", "history", "origin", "come", "from", "mean", "meaning", "japanese", "japan", "usui", "invented", "word"],
    boost: ["reiki come from", "reiki mean", "who invented reiki", "history of reiki", "where does reiki"],
    answer:
      "Reiki comes from Japan — developed by Mikao Usui in the early 1920s. The word joins two Japanese ideas: 'rei' (universal) and 'ki' (life energy), the same concept called chi or prana in other traditions. It traveled west through Hawayo Takata in the 1930s and is now offered in hospitals and hospice programs worldwide. A century later, the practice Tamika trained in as a Certified Reiki Master still follows Usui's lineage: light touch, quiet intention, and the body's own settling.",
    link: { href: "/services/reiki-elk-grove", label: "Reiki at Delta Roe" },
    chips: ["What does reiki feel like?", "Is there science behind reiki?", "Book a reiki session"],
  },
  {
    keywords: ["chakra", "old", "ancient", "origin", "history", "sanskrit", "wheel", "real", "come", "tradition", "hindu", "yoga"],
    boost: ["chakras real", "chakras come from", "how old", "chakra system"],
    answer:
      "The chakra system is at least 3,000 years old — it first appears in the Vedas, ancient India's oldest texts, and 'chakra' is Sanskrit for 'wheel.' Whether you take the seven centers literally or treat them as a brilliant ancient map of human experience — safety, creativity, power, love, truth, intuition, connection — is entirely up to you. Either way, moving attention through them one by one is a remarkably effective way to find where you're holding, and that's exactly how Tamika works an alignment.",
    link: { href: "/services/chakra-alignment", label: "Chakra alignment details" },
    chips: ["How do I know if I'm blocked?", "What happens in a chakra alignment session?"],
  },
  {
    keywords: ["binaural", "beats", "beat", "headphones", "brainwaves", "brain", "waves", "theta", "entrainment"],
    boost: ["binaural", "brainwave", "theta"],
    answer:
      "Binaural beats are a small piece of neuroscience magic: each ear receives a slightly different frequency, and your brain perceives a third 'beat' — the difference between them — then tends to sync toward it. Tuned low, that nudges you toward theta waves, the slow rhythm of deep meditation and the edge of sleep. And it's studied: a meta-analysis of 22 experiments found a consistent, significant effect on anxiety, with longer listening working better — which is exactly what 30 unbroken minutes under the bowls gives you.",
    link: { href: "/services/sound-bath-elk-grove", label: "Experience it in a sound bath" },
    chips: ["Why 432 Hz?", "Hear the sound bath", "Book a sound bath"],
  },
  {
    keywords: ["research", "study", "studies", "sound", "bath", "bowl", "singing", "evidence", "data", "trial"],
    boost: ["sound bath research", "research on sound", "studies on sound", "sound healing research", "singing bowl study"],
    answer:
      "There's real research here, love. A University of California San Diego study of 62 adults found singing-bowl meditation significantly reduced tension, anger, fatigue, and depressed mood — and here's my favorite part: first-timers showed the biggest drop in tension of anyone. Researchers called it a low-cost, low-risk intervention for anxiety and low mood. Delta Roe never overclaims — this is deep rest, not medicine — but the deep rest itself is measurably real.",
    link: { href: "/services/sound-bath-elk-grove", label: "Book a sound bath" },
    chips: ["Why 432 Hz?", "Is there science behind reiki?"],
  },
  {
    keywords: ["432", "hz", "research", "study", "studied", "proven", "frequency", "science"],
    boost: ["432 hz research", "432 hz studied", "research on 432", "432 hz science", "432 hz proven", "studied", "evidence for 432"],
    answer:
      "Honest answer, as always: the research on 432 Hz is young but interesting. Small controlled studies found music tuned to 432 Hz lowered heart rate (about 5 beats per minute versus standard 440 Hz tuning), nudged blood pressure and breathing down, and improved sleep quality in one clinical pilot. These are pilots, not proof — but they match what clients report in the room: 432 feels warmer, rounder, easier to surrender to. Put headphones on the 60-second sample and let your own nervous system vote.",
    link: { href: "/services/sound-bath-elk-grove", label: "Hear the 432 Hz sample" },
    chips: ["What are binaural beats?", "Book a sound bath"],
  },
  {
    keywords: ["fascia", "science", "works", "nerve", "nerves", "sensory", "connective", "tissue", "stores", "trauma"],
    boost: ["fascia work", "what is fascia", "fascia science", "body keeps"],
    answer:
      "Fascia is the connective web wrapping every muscle, organ, and nerve — one continuous sheet from scalp to sole. Researchers now consider it one of the body's richest sensory organs, packed with nerve endings that register tension and threat. When stress becomes chronic, fascia is where the bracing lives — that armor massage keeps finding but not releasing. The Fascia Flow Reset works because of the pairing: gentle sustained release while the sound bath keeps your nervous system in rest-and-release instead of guarding.",
    link: { href: "/services/fascia-flow-reset", label: "Fascia Flow Reset details" },
    chips: ["Book the Fascia Flow Reset", "What should I wear?"],
  },
  {
    keywords: ["nervous", "system", "parasympathetic", "vagus", "cortisol", "stress", "hormone", "fight", "flight", "regulate", "regulation", "calm"],
    boost: ["nervous system", "fight or flight", "cortisol", "vagus"],
    answer:
      "Here's the thread under everything at Delta Roe: your nervous system has two gears — fight-or-flight (sympathetic) and rest-and-repair (parasympathetic) — and modern life leaves most of us stuck in the first one, marinating in cortisol. Sound, reiki, breath, and stillness are all doorways to the second gear: heart rate settles, breathing slows, digestion and repair switch back on. That's why 30 minutes can change your whole week — you're not escaping your life, you're switching the gear it runs in.",
    link: { href: "https://www.deltaroe.com/book-online", label: "Give your nervous system 30 minutes" },
    chips: ["Which session is right for me?", "Will I fall asleep?"],
  },
  {
    keywords: ["after", "afterwards", "aftercare", "tired", "sleepy", "emotional", "headache", "water", "hydrate", "following", "later", "cry", "crying"],
    boost: ["after my session", "after a session", "feel tired", "aftercare", "feel after"],
    answer:
      "Sweet question — the session keeps working after you leave. Most people float out calm and clear; some feel wonderfully sleepy, extra emotional, or thirsty for a few hours — that's your system completing what it started on the table, not something going wrong. The care plan is simple: drink more water than usual, keep the evening soft if you can, let feelings move through without gripping them, and sleep. Tamika sends you home with aftercare guidance tailored to what came up in your session.",
    chips: ["How often should I come?", "Book my next session"],
  },
  {
    keywords: ["sound", "healing", "ancient", "tradition", "history", "culture", "gong", "tibetan", "himalayan", "old", "long"],
    boost: ["sound healing history", "how ancient", "ancient practice", "sound healing old", "ancient"],
    answer:
      "Older than almost anything else humans do together. Himalayan metal bowls have rung through meditation halls for many centuries; Australian didgeridoo traditions reach back millennia; ancient Greece — Pythagoras himself — prescribed specific modes of music for the body and soul. Nearly every culture found the same secret independently: sustained resonant tone settles a human being. What's new is only the science catching up. At Delta Roe you're not trying something trendy — you're joining one of humanity's oldest medicines.",
    link: { href: "/services/sound-bath-elk-grove", label: "Experience a sound bath" },
    chips: ["Is there research on sound baths?", "Book a session"],
  },
];

/* ------------------------------------------------------------------ */
/* Generated layer — the website's own content, ingested automatically */
/* ------------------------------------------------------------------ */

const STOP = new Set(
  (
    "the a an and or but of to in at on for with from by is are was were be been being am do does did doing " +
    "have has had having i me my we our you your it its this that these those what which who whom when where " +
    "why how can could should would will shall may might must not no yes if then than so as into out up down " +
    "over under again once here there all any both each few more most other some such only own same too very " +
    "just don now really actually like get got need want know tell about delta roe deltaroe"
  ).split(" ")
);

// Plural-tolerant normalization: "sessions" matches "session", "bowls" → "bowl".
function norm(w: string): string {
  const x = w.toLowerCase();
  return x.length > 3 && x.endsWith("s") && !x.endsWith("ss") ? x.slice(0, -1) : x;
}

function contentWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

// Phrase signals from a question ("how often", "432 hz", "ritual membership")
// — strong evidence the visitor is asking THIS question, not just nearby ones.
// Glue words are excluded entirely: phrases like "reiki and" or "the difference"
// match half the questions on the site and misroute more than they help.
const GLUE = new Set(
  "the a an and or but of to in at on i you it is are was were do does did my me we us about that this whats what".split(" ")
);

function bigrams(text: string): string[] {
  const toks = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
  const out: string[] = [];
  for (let i = 0; i < toks.length - 1; i++) {
    if (GLUE.has(toks[i]) || GLUE.has(toks[i + 1])) continue;
    out.push(`${toks[i]} ${toks[i + 1]}`);
  }
  return [...new Set(out)];
}

// Where each FAQ category should send people.
const CATEGORY_LINKS: Record<string, KbLink> = {
  "New Here — Start With These": { href: "https://www.deltaroe.com/book-online", label: "Book your first session" },
  "Reiki, Explained Honestly": { href: "/services/reiki-elk-grove", label: "Reiki details & booking" },
  "Sound Baths & 432 Hz": { href: "/services/sound-bath-elk-grove", label: "Sound bath details & booking" },
  "Chakras & Energy Work": { href: "/services/chakra-alignment", label: "Chakra alignment details" },
  "Booking, Pricing & Policies": { href: "https://www.deltaroe.com/book-online", label: "Book now" },
  "Memberships & Going Deeper": { href: "/memberships", label: "Compare memberships" },
  "Local & Practical — Elk Grove": { href: "/contact", label: "Directions & hours" },
  "Groups, Events & Corporate": { href: "/events", label: "See upcoming events" },
};

function buildGenerated(): KbEntry[] {
  const out: KbEntry[] = [];

  // Every Q&A on the /faq page becomes an answer the bot knows.
  for (const cat of FAQ_CATEGORIES) {
    for (const f of cat.faqs) {
      const siblings = cat.faqs.filter((s) => s !== f).slice(0, 2).map((s) => s.q);
      out.push({
        keywords: [...new Set(contentWords(f.q).map(norm))],
        boost: bigrams(f.q),
        answer: f.a,
        link: CATEGORY_LINKS[cat.title] ?? { href: "/faq", label: "More answers" },
        chips: siblings,
        label: f.q,
      });
    }
  }

  // Every service: a rich overview entry plus its page FAQs.
  for (const svc of SERVICES) {
    const nameWords = contentWords(svc.name).map(norm);
    const expectLine = svc.expect.map((e) => e.title.toLowerCase()).join(" → ");
    out.push({
      keywords: [
        ...new Set([
          ...nameWords,
          ...contentWords(svc.short).map(norm),
          ...contentWords(svc.tag).map(norm),
        ]),
      ],
      boost: [...new Set([svc.name.toLowerCase(), svc.menuName.toLowerCase()])],
      answer: `${svc.answer} The session moves through ${expectLine}. Clients book it for: ${svc.benefits[0].toLowerCase()}${svc.benefits[1] ? ", and " + svc.benefits[1].toLowerCase() : ""}.`,
      link: { href: `/services/${svc.slug}`, label: `${svc.name} details & booking` },
      chips: svc.faqs.slice(0, 2).map((f) => f.q),
      label: `What is ${svc.name} like at Delta Roe?`,
    });
    for (const f of svc.faqs) {
      out.push({
        keywords: [...new Set([...contentWords(f.q).map(norm), ...nameWords])],
        boost: bigrams(f.q),
        answer: f.a,
        link: { href: `/services/${svc.slug}`, label: `${svc.name} details & booking` },
        chips: [`Book ${svc.name}`, ...svc.faqs.filter((s) => s !== f).slice(0, 1).map((s) => s.q)],
        label: f.q,
      });
    }
  }

  // Journal articles: each one's quick answers join the knowledge base too.
  for (const art of ARTICLES) {
    for (const f of art.faqs) {
      out.push({
        keywords: [...new Set(contentWords(f.q).map(norm))],
        boost: bigrams(f.q),
        answer: f.a,
        link: { href: `/journal/${art.slug}`, label: "Read the full guide" },
        chips: art.faqs.filter((s) => s !== f).slice(0, 2).map((s) => s.q),
        label: f.q,
      });
    }
  }

  return out;
}

// Hand-written first: on a tie score, Roe answers in her own voice.
export const ALL_KB: KbEntry[] = [...KB, ...buildGenerated()];

// Rare keywords are strong signals — "fascia" alone should find its answer.
const KW_FREQ = new Map<string, number>();
for (const e of ALL_KB) {
  for (const kw of new Set(e.keywords.map(norm))) {
    KW_FREQ.set(kw, (KW_FREQ.get(kw) ?? 0) + 1);
  }
}

// Edit distance ≤ 1 (insert / delete / substitute) — catches phone-keyboard
// typos like "riki", "chackra", "sond" without a fuzzy-search dependency.
function within1(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length > b.length) [a, b] = [b, a];
  if (b.length - a.length > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length === b.length) {
      i++;
      j++;
    } else {
      j++;
    }
  }
  return edits + (b.length - j) + (a.length - i) <= 1;
}

function scoreEntry(entry: KbEntry, q: string, words: string[]): number {
  let score = 0;
  for (const kw of new Set(entry.keywords.map(norm))) {
    const weight = (KW_FREQ.get(kw) ?? 1) <= 2 ? 2 : 1;
    if (words.includes(kw)) {
      score += weight;
    } else if (kw.length >= 5) {
      // fuzzy rescue for misspellings — only on words long enough to be distinctive
      if (words.some((w) => w.length >= 4 && within1(w, kw))) score += weight;
    }
  }
  for (const b of entry.boost ?? []) {
    if (q.includes(b)) score += 2.5;
  }
  return score;
}

function tokenize(input: string): { q: string; words: string[] } {
  const q = input.toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
  return { q, words: q.split(/\s+/).filter((w) => w.length > 1).map(norm) };
}

export function findAnswer(input: string): KbEntry | null {
  const { q, words } = tokenize(input);
  let best: KbEntry | null = null;
  let bestScore = 0;
  for (const entry of ALL_KB) {
    const score = scoreEntry(entry, q, words);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore >= 2 ? best : null;
}

// "Did you mean…" — when nothing clears the answer threshold, surface the
// closest labeled questions so a near-miss becomes a next tap, not a dead end.
export function suggestTopics(input: string, n = 3): string[] {
  const { q, words } = tokenize(input);
  return ALL_KB.map((e) => ({
    // Hand-written entries carry no label — their first follow-up chip is a
    // routable stand-in (the check script proves every chip resolves).
    label: e.label ?? e.chips?.[0],
    score: scoreEntry(e, q, words),
  }))
    .filter((s): s is { label: string; score: number } => !!s.label && s.score > 0)
    .sort((a, b) => b.score - a.score)
    .reduce<string[]>((acc, s) => {
      if (acc.length < n && !acc.includes(s.label)) acc.push(s.label);
      return acc;
    }, []);
}
