/** Spot-check routing quality: print which answer wins for tricky queries. */
import { findAnswer } from "../lib/roe-kb";

const QS = [
  "whats the difference between reiki and a sound bath",
  "my shoulders are always tight and massages dont help",
  "how often should i get reiki",
  "is this against my religion",
  "will i fall asleep during the sound bath",
  "why 432 hz",
  "do you take walk ins",
  "do you do couples sessions",
  "what happens in a chakra alignment session",
  "life coaching prices",
  "is the ritual membership worth it",
  "how does virtual reiki work",
  "gift for my mom who cant relax",
  "what is the sound of paint",
  "im pregnant is a sound bath ok",
  "tell me about the fascia flow reset",
  "what services do you offer",
  "where does reiki come from",
  "are chakras real",
  "what are binaural beats",
  "is there any research on sound baths",
  "has 432 hz been studied",
  "why do i feel tired after reiki",
  "how does stress affect the nervous system",
  "is sound healing ancient",
  "does reiki really work",
  "tell me about reiki",
  "whats a sound bath like",
];

for (const q of QS) {
  const a = findAnswer(q);
  console.log(`Q: ${q}\n→ ${a ? a.answer.slice(0, 110) : "FALLBACK"}...\n`);
}
