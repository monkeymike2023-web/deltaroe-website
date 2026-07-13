export type ArticleSection = { heading?: string; paragraphs: string[] };
export type ArticleFaq = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  description: string; // meta description + index card
  date: string; // ISO
  dateLabel: string;
  readMinutes: number;
  answer: string; // direct-answer opening paragraph (AI/SEO)
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  cta: { label: string; href: string };
  related: { label: string; href: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "first-sound-bath-what-to-expect",
    title: "Your First Sound Bath: What to Expect",
    description:
      "Never been to a sound bath? Here's exactly what happens in a 30-minute session at Delta Roe in Elk Grove — what to wear, what you'll feel, and why first-timers get the most out of it.",
    date: "2026-07-13",
    dateLabel: "July 2026",
    readMinutes: 5,
    answer:
      "At your first sound bath you lie down fully clothed, wrapped in blankets in a candle-lit room, while Tibetan and crystal singing bowls tuned to 432 Hz are played around you for 30 minutes. There is nothing to do, nothing to believe, and no experience required — and research suggests first-timers feel the biggest drop in tension of anyone.",
    sections: [
      {
        paragraphs: [
          "If you've been circling the idea of a sound bath — curious, maybe a little skeptical, not sure what you'd actually be signing up for — this is the walkthrough. No mystique, no jargon. Just what happens from the moment you walk up the stairs in Old Town Elk Grove to the moment you float back down them.",
        ],
      },
      {
        heading: "Before you arrive",
        paragraphs: [
          "Wear anything comfortable and loose — you stay fully clothed the entire time, and only your shoes come off. Eat light beforehand, skip the heavy perfume (the studio's essential oils are part of the experience), and if you can, don't schedule anything demanding right after. You'll want to drift home, not sprint to a meeting.",
          "That's the whole preparation. There is no belief requirement, no mantra to learn, and no way to be bad at this. People of every faith and none receive sound baths; skeptics are genuinely welcome.",
        ],
      },
      {
        heading: "The first five minutes",
        paragraphs: [
          "You'll be welcomed into a warm, candle-lit studio and settle onto a cushioned mat with blankets and an eye pillow. Tamika will ask briefly what you're carrying — stress, grief, a racing mind, plain exhaustion — and shape the session around it. Then you close your eyes, and your only job for the next half hour begins: lying there.",
        ],
      },
      {
        heading: "What you'll actually feel",
        paragraphs: [
          "Waves. The bowls are played around and over you, and their vibration moves through the room — and through you — in slow, layered swells. Delta Roe's bowls are tuned to 432 Hz and layered with binaural beats, which nudge your brainwaves toward the slow theta state your mind normally only reaches in deep meditation or right at the edge of sleep.",
          "Most people describe some mix of: heaviness like the moment before falling asleep, warmth, gentle tingling, thoughts loosening their grip, and — very commonly — actually falling asleep. That's not failing the sound bath. It's your body finally feeling safe enough to let go, and the vibrations keep working either way.",
          "There's science under this, honestly told: a University of California San Diego study of 62 adults found singing-bowl meditation significantly reduced tension, anger, fatigue, and depressed mood — and participants who had never done it before showed the largest reduction in tension of anyone. Your first time is, statistically, your most powerful one.",
        ],
      },
      {
        heading: "The return",
        paragraphs: [
          "You're guided gently back — no jarring alarm, no fluorescent lights. There's a moment to re-land, share what you noticed if you feel like it, and take simple aftercare home: drink more water than usual, keep the evening soft, and let whatever surfaced keep moving.",
          "The most common report from first-timers isn't mystical at all. It's the drive home feeling strangely quiet, and the best night of sleep in recent memory.",
        ],
      },
      {
        heading: "Booking your first one",
        paragraphs: [
          "A sound bath at Delta Roe is $77 for a private 30-minute session — just you, Tamika, and the room. It's deliberately the gentlest and most affordable doorway into everything else the studio offers. If you'd rather talk before you book, the 30-minute Discovery Call is free.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need any experience for my first sound bath?",
        a: "None at all. You lie down, fully clothed, and listen — that's the entire job. Research even suggests first-timers experience the biggest reduction in tension of anyone.",
      },
      {
        q: "What if I fall asleep during my first sound bath?",
        a: "It's common and completely fine — it means your body felt safe enough to let go. The vibrations continue working whether you're in dreamy awareness or fully asleep, and you'll be guided gently back at the end.",
      },
      {
        q: "How should I prepare for my first sound bath?",
        a: "Wear loose comfortable clothing, eat light beforehand, skip heavy perfume, and try not to schedule anything demanding right after. You stay fully clothed; only your shoes come off.",
      },
    ],
    cta: { label: "Book your first sound bath — $77", href: "/services/sound-bath-elk-grove" },
    related: [
      { label: "Sound Bath details & pricing", href: "/services/sound-bath-elk-grove" },
      { label: "432 Hz, explained", href: "/journal/432-hz-explained" },
    ],
  },
  {
    slug: "reiki-vs-massage",
    title: "Reiki vs. Massage: Which Does Your Body Need?",
    description:
      "Massage works the muscle; reiki works what the muscle is holding. An honest guide to choosing between them — and when the answer is fascia work or both.",
    date: "2026-07-13",
    dateLabel: "July 2026",
    readMinutes: 5,
    answer:
      "Massage physically manipulates muscle tissue to release mechanical tension; reiki is a light-touch energy practice that settles the nervous system holding that tension in place. Choose massage for a knot from sleeping wrong — choose reiki when stress, grief, or burnout is what your body keeps re-tightening around. For tension that massage never quite fixes, fascia work may be the missing layer.",
    sections: [
      {
        paragraphs: [
          "It's the most practical question in wellness, and it deserves a straight answer: you have one hour and one tired body — where should it go?",
        ],
      },
      {
        heading: "What massage does",
        paragraphs: [
          "Massage is mechanical. A therapist physically works muscle tissue — kneading, compressing, stretching — to move blood, release adhesions, and unwind the knots that effort and posture tie. When the problem is in the tissue (you lifted wrong, sat wrong, trained hard), massage is exactly the right tool.",
          "But you've probably noticed its limit: some tension comes back within days, in the same places, no matter how good the massage was. That's usually because the tissue wasn't the source. Something keeps re-tightening it.",
        ],
      },
      {
        heading: "What reiki does",
        paragraphs: [
          "Reiki works at the level of the system doing the tightening. It's a gentle Japanese practice — developed by Mikao Usui in the early 1920s — in which you rest fully clothed while the practitioner uses light or hovering touch through the body's energy centers. At Delta Roe, singing bowls, essential oils, and guided breath are woven through the session.",
          "The honest science: reviews of clinical trials suggest reiki can reduce pain and anxiety, most plausibly by shifting the nervous system out of fight-or-flight and into its rest-and-repair state — with zero adverse effects reported across the research. The energy mechanism practitioners describe hasn't been measured by science, and Delta Roe won't tell you otherwise. What's consistently observed is the state change: heart rate settles, breathing slows, and the grip your body has been keeping — through grief, burnout, or a season of too much — loosens.",
          "That's the practical difference. Massage releases the tension. Reiki addresses the reason your body keeps making more of it.",
        ],
      },
      {
        heading: "The layer in between: fascia",
        paragraphs: [
          "There's a third answer for a specific, stubborn kind of tension: the kind massage finds every single time but never fully releases. Fascia — the connective web wrapping every muscle — is one of the body's richest sensory organs, and it's where chronic stress physically installs itself as armor.",
          "Delta Roe's Fascia Flow Reset pairs gentle, sustained fascia release with a live 432 Hz sound bath, so your nervous system stays in rest-and-release instead of bracing against the work. It exists precisely for the 'massage never quite fixes it' body.",
        ],
      },
      {
        heading: "So which one?",
        paragraphs: [
          "A simple honest guide: if the problem started in your body (a workout, a mattress, a desk), book a massage — Delta Roe doesn't offer them, and a good massage therapist is the right call. If the problem started in your life (stress, loss, overwhelm, the year you've had), book reiki. If it's tension that survives every massage you throw at it, book the Fascia Flow Reset. And if you genuinely can't tell, the free Discovery Call exists for exactly this conversation.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is reiki like a massage?",
        a: "No — massage physically works muscle tissue; reiki uses light or hovering touch while you rest fully clothed, working on the nervous system that holds tension in place rather than the tissue itself. Many clients use both for different needs.",
      },
      {
        q: "Can reiki help with physical pain?",
        a: "Reviews of clinical trials suggest reiki can reduce pain and anxiety, likely by settling the nervous system into its rest-and-repair state — with no adverse effects reported in the research. It complements medical care and bodywork; it doesn't replace them.",
      },
      {
        q: "What helps tension that massage doesn't fix?",
        a: "Chronic tension often lives in the fascia — the connective tissue wrapping every muscle — rather than the muscle itself. The Fascia Flow Reset at Delta Roe pairs gentle sustained fascia release with a 432 Hz sound bath so the nervous system doesn't brace against the work.",
      },
    ],
    cta: { label: "Book reiki with Tamika — $144", href: "/services/reiki-elk-grove" },
    related: [
      { label: "Reiki details & pricing", href: "/services/reiki-elk-grove" },
      { label: "Fascia Flow Reset", href: "/services/fascia-flow-reset" },
    ],
  },
  {
    slug: "432-hz-explained",
    title: "432 Hz, Explained: Why Delta Roe Tunes Everything Lower",
    description:
      "What 432 Hz actually is, what small studies found about heart rate and sleep, what binaural beats add — and an honest account of where the science stands.",
    date: "2026-07-13",
    dateLabel: "July 2026",
    readMinutes: 4,
    answer:
      "432 Hz is a musical tuning slightly lower than the modern standard of 440 Hz. Small controlled studies found music tuned to 432 Hz lowered heart rate by roughly five beats per minute versus 440 Hz and improved sleep quality in a clinical pilot — early evidence, honestly labeled as such. Delta Roe's bowls are tuned to 432 Hz and layered with binaural beats, which carry stronger research support for reducing anxiety.",
    sections: [
      {
        paragraphs: [
          "Every bowl at Delta Roe is tuned to 432 Hz. Ask why, and you'll get the studio's favorite kind of answer: part history, part early science, part something you can simply test with your own ears in sixty seconds.",
        ],
      },
      {
        heading: "What 432 Hz actually means",
        paragraphs: [
          "Tuning is just the reference pitch instruments agree on. Modern concert tuning sets the note A at 440 vibrations per second; 432 Hz sets it eight vibrations lower. It's a small difference — less than a third of a semitone — but many sound healers choose it because clients so consistently describe it the same way: warmer, rounder, easier to surrender to.",
        ],
      },
      {
        heading: "What the research found",
        paragraphs: [
          "Here's the honest state of the science. A 2019 double-blind pilot study found that listening to music tuned to 432 Hz was associated with a marked decrease in heart rate — about five beats per minute — compared with the same music at 440 Hz, along with slight reductions in blood pressure and breathing rate. A follow-up clinical pilot with spinal-cord-injury patients found 432 Hz music improved sleep quality.",
          "These are small pilot studies, not settled proof, and Delta Roe will never dress them up as more. But they point the same direction as what happens in the room: bodies settle faster under the lower tuning.",
        ],
      },
      {
        heading: "The stronger science: binaural beats",
        paragraphs: [
          "Layered under the bowls is a second frequency tool with a deeper research base. Binaural beats work by giving each ear a slightly different frequency; your brain perceives a third 'beat' — the difference between them — and tends to sync toward it. Tuned low, that nudges brainwaves toward theta, the slow rhythm of deep meditation and the edge of sleep.",
          "A meta-analysis of 22 experiments found a consistent, significant effect of binaural beats on anxiety, with longer listening producing stronger results — which is precisely what 30 unbroken minutes in a sound bath provides, and why headphones matter if you try the online sample.",
        ],
      },
      {
        heading: "Test it yourself",
        paragraphs: [
          "There's a 60-second 432 Hz sample on the Sound Bath page. Put headphones on — the binaural effect needs one frequency per ear — and notice two things: how your shoulders sit at the end, and whether you wish it hadn't stopped. That second feeling is the entire pitch for the full 30 minutes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is 432 Hz scientifically proven?",
        a: "Not proven — studied. Small controlled pilots found 432 Hz music lowered heart rate about five beats per minute versus 440 Hz and improved sleep in one clinical trial. Early, promising, honestly labeled. The binaural beats layered into Delta Roe's sound baths have stronger backing: a 22-study meta-analysis found a consistent effect on anxiety.",
      },
      {
        q: "Can I hear 432 Hz before booking a session?",
        a: "Yes — there's a free 60-second 432 Hz sample on the Sound Bath page at deltaroe.com. Use headphones so each ear receives its own frequency; the 'beat' you feel between them is the binaural effect.",
      },
    ],
    cta: { label: "Hear it live — book a sound bath", href: "/services/sound-bath-elk-grove" },
    related: [
      { label: "Sound Bath details & the 60-second sample", href: "/services/sound-bath-elk-grove" },
      { label: "Your first sound bath: what to expect", href: "/journal/first-sound-bath-what-to-expect" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
