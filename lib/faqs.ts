export type Faq = { q: string; a: string };
export type FaqCategory = { title: string; faqs: Faq[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "New Here — Start With These",
    faqs: [
      {
        q: "I've never done anything like this. What should I book first?",
        a: "Start with a Sound Bath ($77, 30 minutes). There's no touch, no talking required, and nothing to be good at — you lie down under blankets while singing bowls tuned to 432 Hz do the work. It's the gentlest introduction to energy work at Delta Roe. If you'd rather talk it through first, book the free 30-minute Discovery Call and Tamika will point you to the right session.",
      },
      {
        q: "What should I expect at my first session at Delta Roe?",
        a: "You'll walk up to a quiet, candle-lit studio in historic Old Town Elk Grove. Tamika will ask what you're carrying — stress, grief, a decision, exhaustion — and shape the session around it. You stay fully clothed the entire time. Most sessions are 30 minutes. Afterward, most first-timers describe feeling lighter, clearer, and calmer than they've felt in months.",
      },
      {
        q: "What should I wear?",
        a: "Comfortable, loose clothing you can fully relax in. You remain clothed for every service — only your shoes come off. Skip heavy perfume; the studio uses essential oils as part of the experience.",
      },
      {
        q: "Do I have to believe in energy healing for it to work?",
        a: "No. Skeptics are welcome at Delta Roe, and many of the studio's most loyal clients started as skeptics. At minimum, you'll experience 30 minutes of profound rest in a candle-lit room — and rest that deep is measurably good for your nervous system. Whatever else you experience is yours to interpret.",
      },
      {
        q: "Is reiki or sound healing against my religion?",
        a: "Reiki and sound healing have no belief requirements and no religious doctrine. People of every faith — and none — receive these sessions. Many clients describe the experience as deeply compatible with their own prayer or spiritual practice, whatever it is. You will never be asked to believe anything at Delta Roe.",
      },
    ],
  },
  {
    title: "Reiki, Explained Honestly",
    faqs: [
      {
        q: "What actually happens during a reiki session?",
        a: "You rest fully clothed on a comfortable table while Tamika — a Certified Reiki Master — places her hands lightly on or just above the body's energy centers, working from crown to root. Singing bowls, essential oils, and guided breathing deepen the relaxation. Sessions at Delta Roe are 30 minutes and cost $144.",
      },
      {
        q: "What does reiki feel like?",
        a: "The most common reports: warmth where hands hover, gentle tingling or wave-like movement through the body, deep heaviness like the moment before sleep, and emotional release — some people laugh, some cry, most simply melt. One Delta Roe client described feeling 'clear movement in my feet and legs even when she wasn't touching them.' There is no wrong way to experience it.",
      },
      {
        q: "Is there science behind reiki?",
        a: "Honest answer: research shows reiki reliably reduces anxiety, stress, and pain perception — likely by activating the parasympathetic 'rest and digest' state — while the mechanism energy healers describe hasn't been measured by science. Delta Roe holds both truths comfortably: whatever the mechanism, a deeply rested nervous system heals, sleeps, and copes better.",
      },
      {
        q: "Can reiki replace my doctor or therapist?",
        a: "No — and any practitioner who says otherwise should be avoided. Reiki at Delta Roe is a complementary practice: it works alongside your medical and mental-health care, never instead of it. Many clients use sessions to manage the stress of treatment, grief, or recovery.",
      },
      {
        q: "How often should I get reiki?",
        a: "For a specific weight you're carrying — grief, a transition, burnout — many clients come weekly or bi-weekly for the first month, then monthly. For maintenance, monthly is the sweet spot, which is exactly why the Ritual Membership ($129/month) includes one session every month.",
      },
    ],
  },
  {
    title: "Sound Baths & 432 Hz",
    faqs: [
      {
        q: "What is a sound bath, exactly?",
        a: "A sound bath is 30 minutes of lying down — wrapped in blankets, eyes closed — while Tibetan and crystal singing bowls are played around you. The vibrations wash over you in waves (hence 'bath'). Your only job is to lie there. At Delta Roe, sound baths are $77 for a private 30-minute session in Old Town Elk Grove.",
      },
      {
        q: "What's special about 432 Hz?",
        a: "Delta Roe's bowls are tuned to 432 Hz, a tuning many sound healers choose because clients consistently describe it as warmer and more settling than standard concert pitch (440 Hz). Layered with binaural beats — slightly different frequencies in each ear — it encourages your brainwaves toward the slow theta state associated with deep meditation and the edge of sleep.",
      },
      {
        q: "Why do people fall asleep during sound baths — and is that okay?",
        a: "It's more than okay; it's the body finally feeling safe enough to let go. The slow brainwave states sound induces sit right at the boundary of sleep. Whether you stay in dreamy awareness or drift off entirely, the vibrations are still doing their work. You'll be gently guided back at the end.",
      },
      {
        q: "Sound bath vs. reiki — which should I choose?",
        a: "Choose a sound bath ($77) if you want no touch, pure rest, and the easiest entry point — especially if your mind races. Choose reiki ($144) if you're carrying something emotional or physical you want directly worked on. Can't decide? Reiki + Sound Bath ($188) combines both in one session, and it's Delta Roe's most-booked combination.",
      },
      {
        q: "Can I hear a sample before I book?",
        a: "Yes — there's a 60-second 432 Hz sample right on the Sound Bath page at deltaroe.com. Use headphones: the left and right ears receive slightly different frequencies, and the 'beat' you feel between them is the binaural effect that guides your brain toward stillness. Then imagine 30 unbroken minutes of it, live, in a candle-lit room.",
      },
    ],
  },
  {
    title: "Chakras & Energy Work",
    faqs: [
      {
        q: "What are chakras, in plain English?",
        a: "Chakras are the seven energy centers running from the base of your spine (root) to the top of your head (crown), each associated with a domain of life: safety, creativity, confidence, love, truth, intuition, and connection. Whether you treat them as literal energy or as a brilliant 3,000-year-old map of human experience, working through them one by one is a remarkably effective way to find where you're stuck.",
      },
      {
        q: "How do I know if a chakra is blocked?",
        a: "The classic signs, by center: constant anxiety about money or safety (root); creative flatness (sacral); shrinking around confident people (solar plexus); guarding your heart after loss (heart); swallowing what you need to say (throat); distrusting your own gut (third eye); feeling disconnected from meaning (crown). In a Chakra Alignment session, Tamika reads where energy feels dense and works center by center.",
      },
      {
        q: "What happens in a chakra alignment session?",
        a: "Tamika begins with an intuitive assessment, then works from root to crown using reiki, targeted sound frequencies, and crystals matched to each center — clearing and balancing as she goes. The session closes with grounding so the alignment holds. It's $177 paired with a sound bath, or $144 paired with reiki, 30 minutes.",
      },
      {
        q: "What is the Fascia Flow Reset?",
        a: "Fascia is the connective tissue that wraps every muscle — and it's where the body stores unfinished stress. The Fascia Flow Reset ($188, 30 min) pairs gentle, sustained fascia release with a 432 Hz sound bath, so your nervous system stays in rest-and-release instead of bracing. It's the session for tension that massage and stretching haven't fixed.",
      },
    ],
  },
  {
    title: "Booking, Pricing & Policies",
    faqs: [
      {
        q: "How much do sessions cost at Delta Roe?",
        a: "Sound Bath $77 · Reiki $144 · Reiki & Chakra Alignment $144 · Chakra Alignment + Sound Bath $177 · Reiki + Sound Bath $188 · Fascia Flow Reset + Sound Bath $188 — all 30 minutes. Life Coaching is $250 for a full 90 minutes. The Discovery Call is free. Memberships start at $33/month.",
      },
      {
        q: "How do I book a session?",
        a: "Book online anytime at deltaroe.com — every service page has a booking button — or call (916) 206-1752. Sessions are by appointment so you always have the studio to yourself; same-week openings are common.",
      },
      {
        q: "What if I need to cancel or reschedule?",
        a: "Life happens — just give the studio as much notice as you can, ideally 24 hours, by phone at (916) 206-1752 or through your booking confirmation link. Rescheduling is always preferred over cancelling: your nervous system still needs that hour.",
      },
      {
        q: "Do you offer gift cards?",
        a: "Yes, and they're the most-loved gift Delta Roe sells. A $77 sound bath makes an unforgettable gift for someone who 'can't relax'; $144 covers a full reiki session. Call (916) 206-1752 or email Info@deltaroe.com and it can be arranged same-day with a personal note.",
      },
      {
        q: "Are sessions private?",
        a: "Yes — every standard session is one-on-one. It's just you, Tamika, and the room. Group sound baths and private events are separate offerings you can arrange for 6–20 people.",
      },
    ],
  },
  {
    title: "Memberships & Going Deeper",
    faqs: [
      {
        q: "What memberships does Delta Roe offer?",
        a: "Three tiers: The Sanctuary Circle ($33/month, virtual — live monthly Zoom sound bath, the recorded 432 Hz library, a new meditation each month); The Ritual Membership ($129/month — one in-studio session monthly with rollover, priority booking, 10% off everything); and The Soulful Journey ($399/month — a 12-month transformation program with three private sessions monthly, a personalized wellness plan, the full digital library, and member privileges).",
      },
      {
        q: "Is the Ritual Membership actually a better deal?",
        a: "Yes, and it isn't close. A single reiki session is $144. For $129/month, members get a monthly session of their choice, unused sessions roll over a month, priority booking, and 10% off additional sessions and the Apothecary. It pays for itself the moment you show up — which is the point: it makes showing up automatic.",
      },
      {
        q: "What is the Soulful Journey Transformation Program?",
        a: "Delta Roe's deepest offering: twelve months of structured transformation at $399/month. Every month includes three private 30-minute sessions (coaching or wellness work, your choice), a personalized wellness plan, a guided journal with reflection prompts, and unlimited access to the full digital library of premium sound baths and meditations — plus priority messaging support, 15% off additional services and the Apothecary, and early access to workshops and retreats. It's built for seasons of real change — career shifts, healing after loss, or the year you decide to stop circling.",
      },
      {
        q: "What is life coaching with Tamika like?",
        a: "Direct, warm, and entirely in your corner. Tamika is a certified Empowerment Life Coach and the author of two books on self-love and resilience — FLY Queen: First Love Yourself and The Last Greyhound. Sessions are 90 minutes ($250): naming what you actually want, dismantling the beliefs in the way, and building the path between. Energy work can be woven in when the block lives deeper than logic.",
      },
    ],
  },
  {
    title: "Local & Practical — Elk Grove",
    faqs: [
      {
        q: "Where is Delta Roe located and where do I park?",
        a: "Delta Roe is at 9075 Elk Grove Blvd, Suite 220A — upstairs in historic Old Town Elk Grove, CA 95624. Free street parking is available on and around Elk Grove Blvd, and Old Town's public lots are a short walk. Arrive a few minutes early and enjoy the stroll; Old Town is part of the experience.",
      },
      {
        q: "What are Delta Roe's hours?",
        a: "Monday–Wednesday 9am–9pm, Thursday 9am–5pm, Friday 1pm–3pm, Saturday 11am–3pm, closed Sunday. Evening appointments on Monday through Wednesday are ideal for decompressing after work — sessions run by appointment only.",
      },
      {
        q: "Is there a reiki or sound bath studio near Sacramento?",
        a: "Yes — Delta Roe in Old Town Elk Grove serves the entire Sacramento region, about 20 minutes south of downtown Sacramento off Highway 99. Clients drive in from Sacramento, Laguna, Galt, Wilton, and Rancho Cordova for private sessions, and virtual options serve everyone else.",
      },
      {
        q: "Do you offer virtual or distance sessions?",
        a: "Yes. Reiki sessions are offered over Zoom (distance reiki is a long-established practice), the Sanctuary Circle membership is fully virtual, and events like guided meditations and truth-holding circles run on Zoom regularly. Distance is no obstacle to the work.",
      },
    ],
  },
  {
    title: "Groups, Events & Corporate",
    faqs: [
      {
        q: "What is The Sound of Paint?",
        a: "Delta Roe's signature workshop series: a live sound bath tuned to a single chakra while you paint what the frequency moves in you. No art skill needed — the bowls do the guiding. The series travels all seven centers, root to crown, one color at a time. Dates are on the Events page.",
      },
      {
        q: "What is Sound-Integrated Self-Defense™?",
        a: "A format created and trademarked by Tamika Banks at Delta Roe: practical self-defense training woven with sound work — learning to hold your ground and your center in the same session. It reflects the studio's deeper philosophy: empowerment and peace are the same practice. Offered on recurring dates in Elk Grove.",
      },
      {
        q: "Can I book Delta Roe for a private group or party?",
        a: "Yes — private group sound baths for birthdays, bridal parties, teams, and celebrations, either in-studio or on location around Elk Grove and Sacramento. Groups of 6–20 work beautifully. Email Info@deltaroe.com with your date and group size.",
      },
      {
        q: "Does Delta Roe do corporate wellness?",
        a: "Yes. On-site sound baths, guided meditation, and stress-reset sessions for Sacramento-area workplaces — or host your team in the Old Town studio. Tamika built Delta Roe partly for professionals; corporate sessions translate that mission into a format HR can put on a calendar. Request a proposal at Info@deltaroe.com.",
      },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_CATEGORIES.flatMap((c) => c.faqs);
