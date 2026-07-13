/**
 * Coverage check for Roe's knowledge base. Run: npx tsx scripts/roe-kb-check.mts
 * Fails (exit 1) if any suggested chip or battery question falls to the fallback.
 */
import { findAnswer, ALL_KB, GREETING_CHIPS } from "../lib/roe-kb";

// Every chip the UI can ever show must resolve to a real answer.
const chips = new Set<string>(GREETING_CHIPS);
for (const e of ALL_KB) for (const c of e.chips ?? []) chips.add(c);

// Realistic visitor questions, phrased the messy way people type.
const BATTERY = [
  "whats a sound bath like",
  "how much does reiki cost",
  "do you take walk ins",
  "is this safe while pregnant",
  "my shoulders are always tight and massages dont help",
  "whats the fascia flow reset",
  "tell me about the fascia thing",
  "can my husband come with me",
  "do you do couples sessions",
  "what is 432 hz",
  "why do your bowls sound different",
  "im skeptical does this actually work",
  "is reiki against christianity",
  "do i need to believe in this",
  "what happens at my first appointment",
  "how long are sessions",
  "whats the difference between reiki and a sound bath",
  "can i do reiki and sound bath together",
  "how often should i come in",
  "will i fall asleep",
  "what are chakras",
  "how do i know if my chakras are blocked",
  "what happens during chakra alignment",
  "life coaching prices",
  "what is the soulful journey program",
  "is the ritual membership worth the money",
  "whats included in memberships",
  "do you sell gift certificates",
  "gift for my mom who cant relax",
  "where do i park",
  "are you near sacramento",
  "what time do you close",
  "are you open sundays",
  "can i book online",
  "i need to reschedule my appointment",
  "do you do zoom sessions",
  "i live far away can i still work with tamika",
  "who is tamika banks",
  "what books did she write",
  "what is fly queen about",
  "sound of paint event",
  "self defense classes",
  "corporate wellness for my office",
  "team building sound bath",
  "private party for my birthday",
  "what do you sell in the shop",
  "whats in the monthly ritual box",
  "candles and crystals",
  "what should i wear",
  "should i eat before my session",
  "can i talk to a real person",
  "phone number",
  // expert layer
  "where does reiki come from",
  "what does the word reiki mean",
  "who invented reiki",
  "are chakras real or made up",
  "how old is the chakra system",
  "what are binaural beats",
  "is there any research on sound baths",
  "has 432 hz actually been studied",
  "why do i feel so tired after reiki",
  "i cried after my session is that normal",
  "what should i do after my session",
  "how does stress affect the nervous system",
  "what is fascia exactly",
  "is sound healing an ancient practice",
];

let misses = 0;
const check = (label: string, q: string) => {
  const hit = findAnswer(q);
  if (!hit) {
    misses++;
    console.log(`MISS  [${label}] ${q}`);
  }
};

for (const c of chips) check("chip", c);
for (const q of BATTERY) check("battery", q);

console.log(`\n${ALL_KB.length} KB entries · ${chips.size} chips + ${BATTERY.length} battery questions · ${misses} misses`);
if (misses > 0) process.exit(1);
console.log("All covered.");
