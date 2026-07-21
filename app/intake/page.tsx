import type { Metadata } from "next";
import IntakeForm from "./IntakeForm";

export const metadata: Metadata = {
  title: "New Client Intake — Begin Your Journey",
  description:
    "Delta Roe's client intake & wellness assessment — a few unhurried minutes that help Tamika meet you exactly where you are. Complete it online before your first visit.",
};

export default function IntakePage() {
  return (
    <main>
      <div className="svc-hero">
        <div className="narrow">
          <div className="eyebrow">Begin Your Journey</div>
          <h1 style={{ marginTop: 14 }}>Client Intake &amp; Wellness Assessment</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            A few unhurried minutes, five gentle steps. There are no wrong
            answers here — this simply helps Tamika meet you exactly where you
            are, so your first session starts deeper.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: 8 }}>
        <div className="narrow">
          <IntakeForm />
          <p
            style={{
              marginTop: 40,
              fontSize: 13,
              opacity: 0.7,
              lineHeight: 1.6,
            }}
          >
            Everything you share is held in confidence — used only to serve
            you, never sold, and shared only if the law requires it. Reiki,
            sound baths, chakra work, and coaching at Delta Roe are
            complementary wellness practices — deeply restful, never a
            substitute for medical or mental-health care. If you are in
            crisis, please call 911 or dial 988.
          </p>
        </div>
      </section>
    </main>
  );
}
