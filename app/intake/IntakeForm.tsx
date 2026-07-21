"use client";

/* Delta Roe client intake — five gentle steps with a progress bar, a
   print-blank option for the studio clipboard, and an electronic-signature
   consent section. Submissions post to /api/intake (emailed to the studio).
   Redesigned (not copied) from a paper sample Tamika liked; legal section
   upgraded: energy-work scope, sound-bath safety screening, not-therapy +
   crisis line, privacy, cancellation, 18+, e-signature clause. */

import { useMemo, useState } from "react";
import s from "./IntakeForm.module.css";

const STEPS = ["About You", "What Brings You In", "Health Picture", "Life Right Now", "Consent"];

const GOALS = [
  "Stress reduction & nervous-system calm",
  "Better sleep",
  "Emotional release / grief support",
  "Energy & vitality",
  "Spiritual connection",
  "Chakra / energy balance",
  "Improve nutrition",
  "Weight goals (loss or gain)",
  "Healthy lifestyle habits",
  "Support alongside medical care",
  "Exercise & movement",
];

const SAFETY = [
  "Currently pregnant",
  "Seizure disorder / epilepsy",
  "Pacemaker or implanted device",
  "Recent surgery or injury",
  "Severe sound or vibration sensitivity",
  "None of these apply",
];

const OBSTACLES = [
  "Time",
  "Motivation",
  "Stress",
  "Chronic pain",
  "A medical condition",
  "Emotional eating",
  "Not knowing where to start",
  "Family responsibilities",
  "Finances",
];

const HELP_WITH = [
  "Reiki / energy healing",
  "Sound baths",
  "Chakra alignment",
  "Life & empowerment coaching",
  "Nutrition education",
  "Healthy habit formation",
  "Daily routine & structure",
  "Goal setting",
  "Accountability",
  "Finding root causes of what's in the way",
];

type Multi = Record<string, boolean>;
const multi = (keys: string[]): Multi => Object.fromEntries(keys.map((k) => [k, false]));

export default function IntakeForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [printAll, setPrintAll] = useState(false); // renders every step for the clipboard print

  const printBlank = () => {
    setPrintAll(true);
    setTimeout(() => {
      window.print();
      setPrintAll(false);
    }, 80);
  };
  const show = (i: number) => step === i || printAll;

  const [f, setF] = useState({
    name: "",
    dob: "",
    address: "",
    city: "",
    state: "CA",
    zip: "",
    phone: "",
    email: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    contactPref: "",
    goals: multi(GOALS),
    goalOther: "",
    success90: "",
    diagnosed: "",
    diagnosedDetail: "",
    underCare: "",
    treatmentPlan: "",
    medications: "",
    safety: multi(SAFETY),
    nutrition: "",
    movement: "",
    sleepHours: "",
    stress: "",
    tried: "",
    obstacles: multi(OBSTACLES),
    obstacleOther: "",
    helpWith: multi(HELP_WITH),
    helpOther: "",
    anythingElse: "",
    // consents
    ackScope: false,
    ackPhysician: false,
    ackNoGuarantee: false,
    ackCancellation: false,
    ackAdult: false,
    optEmail: false,
    optTestimonial: false,
    signature: "",
  });

  const set = (k: string, v: unknown) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (group: "goals" | "safety" | "obstacles" | "helpWith", k: string) =>
    setF((p) => ({ ...p, [group]: { ...p[group], [k]: !p[group][k] } }));

  const today = useMemo(
    () => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    [],
  );

  const stepValid = () => {
    if (step === 0) return f.name.trim() && (f.phone.trim() || f.email.trim());
    if (step === 4)
      return (
        f.ackScope && f.ackPhysician && f.ackNoGuarantee && f.ackCancellation && f.ackAdult && f.signature.trim()
      );
    return true; // middle steps are never blocking — share what you want
  };

  const submit = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, signedDate: today }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) throw new Error(j.error || "Something went sideways.");
      setSent(true);
    } catch (e) {
      setError(
        `We couldn't send your form (${(e as Error).message}) — please try again, or call the studio and we'll take it over the phone.`,
      );
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className={s.done}>
        <div className={s.doneMark}>✦</div>
        <h2>Received, {f.name.split(" ")[0] || "friend"}.</h2>
        <p>
          Tamika will read every word before you arrive. If anything else comes
          to mind, just bring it with you — the sanctuary has room for it.
        </p>
      </div>
    );
  }

  const Chip = ({ group, label }: { group: "goals" | "safety" | "obstacles" | "helpWith"; label: string }) => (
    <button
      type="button"
      className={f[group][label] ? `${s.chip} ${s.chipOn}` : s.chip}
      aria-pressed={f[group][label]}
      onClick={() => toggle(group, label)}
    >
      {label}
    </button>
  );

  return (
    <div className={s.wrap}>
      {/* progress */}
      <div className={s.progress} aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}>
        {STEPS.map((label, i) => (
          <div key={label} className={i === step ? `${s.pStep} ${s.pNow}` : i < step ? `${s.pStep} ${s.pDone}` : s.pStep}>
            <span className={s.pDot}>{i < step ? "✓" : i + 1}</span>
            <span className={s.pLabel}>{label}</span>
          </div>
        ))}
      </div>

      <div className={s.card}>
        {show(0) && (
          <fieldset className={s.fs}>
            <legend className={s.legend}>About you</legend>
            <div className={s.grid2}>
              <label className={s.field}><span>Full name *</span>
                <input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></label>
              <label className={s.field}><span>Date of birth</span>
                <input type="date" value={f.dob} onChange={(e) => set("dob", e.target.value)} /></label>
            </div>
            <label className={s.field}><span>Street address</span>
              <input value={f.address} onChange={(e) => set("address", e.target.value)} autoComplete="street-address" /></label>
            <div className={s.grid3}>
              <label className={s.field}><span>City</span>
                <input value={f.city} onChange={(e) => set("city", e.target.value)} /></label>
              <label className={s.field}><span>State</span>
                <input value={f.state} onChange={(e) => set("state", e.target.value)} /></label>
              <label className={s.field}><span>ZIP</span>
                <input value={f.zip} onChange={(e) => set("zip", e.target.value)} inputMode="numeric" /></label>
            </div>
            <div className={s.grid2}>
              <label className={s.field}><span>Phone *</span>
                <input value={f.phone} onChange={(e) => set("phone", e.target.value)} type="tel" autoComplete="tel" /></label>
              <label className={s.field}><span>Email *</span>
                <input value={f.email} onChange={(e) => set("email", e.target.value)} type="email" autoComplete="email" /></label>
            </div>
            <div className={s.grid3}>
              <label className={s.field}><span>Emergency contact</span>
                <input value={f.emergencyName} onChange={(e) => set("emergencyName", e.target.value)} /></label>
              <label className={s.field}><span>Relationship</span>
                <input value={f.emergencyRelationship} onChange={(e) => set("emergencyRelationship", e.target.value)} /></label>
              <label className={s.field}><span>Their phone</span>
                <input value={f.emergencyPhone} onChange={(e) => set("emergencyPhone", e.target.value)} type="tel" /></label>
            </div>
            <label className={s.field}><span>Preferred way to reach you</span>
              <select value={f.contactPref} onChange={(e) => set("contactPref", e.target.value)}>
                <option value="">Choose…</option>
                <option>Text</option><option>Phone call</option><option>Email</option>
              </select></label>
            <p className={s.note}>* We just need your name and one way to reach you.</p>
          </fieldset>
        )}

        {show(1) && (
          <fieldset className={s.fs}>
            <legend className={s.legend}>What brings you in</legend>
            <p className={s.prompt}>Choose anything that speaks to you — there are no wrong answers here.</p>
            <div className={s.chips}>{GOALS.map((g) => <Chip key={g} group="goals" label={g} />)}</div>
            <label className={s.field}><span>Something else?</span>
              <input value={f.goalOther} onChange={(e) => set("goalOther", e.target.value)} /></label>
            <label className={s.field}><span>Three to six months from now — what would success <em>feel</em> like?</span>
              <textarea rows={3} value={f.success90} onChange={(e) => set("success90", e.target.value)} /></label>
          </fieldset>
        )}

        {show(2) && (
          <fieldset className={s.fs}>
            <legend className={s.legend}>Your health picture</legend>
            <p className={s.prompt}>Share what you're comfortable sharing — it stays between us and helps keep every session safe.</p>
            <div className={s.grid2}>
              <label className={s.field}><span>Any diagnosed medical conditions?</span>
                <select value={f.diagnosed} onChange={(e) => set("diagnosed", e.target.value)}>
                  <option value="">Choose…</option><option>No</option><option>Yes</option>
                </select></label>
              <label className={s.field}><span>Currently under a physician&apos;s care?</span>
                <select value={f.underCare} onChange={(e) => set("underCare", e.target.value)}>
                  <option value="">Choose…</option><option>No</option><option>Yes</option>
                </select></label>
            </div>
            {(f.diagnosed === "Yes" || printAll) && (
              <label className={s.field}><span>Briefly, if you&apos;re willing</span>
                <textarea rows={2} value={f.diagnosedDetail} onChange={(e) => set("diagnosedDetail", e.target.value)} /></label>
            )}
            <label className={s.field}><span>Following a treatment plan or doctor&apos;s recommendations? (briefly)</span>
              <input value={f.treatmentPlan} onChange={(e) => set("treatmentPlan", e.target.value)} /></label>
            <label className={s.field}><span>Current medications or supplements (optional)</span>
              <textarea rows={2} value={f.medications} onChange={(e) => set("medications", e.target.value)} /></label>
            <h3 className={s.sub}>For sound &amp; energy sessions — do any of these apply?</h3>
            <div className={s.chips}>{SAFETY.map((g) => <Chip key={g} group="safety" label={g} />)}</div>
          </fieldset>
        )}

        {show(3) && (
          <fieldset className={s.fs}>
            <legend className={s.legend}>Your life right now</legend>
            <label className={s.field}><span>How do you typically eat? (a sentence is plenty)</span>
              <input value={f.nutrition} onChange={(e) => set("nutrition", e.target.value)} /></label>
            <label className={s.field}><span>Movement / exercise</span>
              <input value={f.movement} onChange={(e) => set("movement", e.target.value)} /></label>
            <div className={s.grid2}>
              <label className={s.field}><span>Average sleep (hours/night)</span>
                <input value={f.sleepHours} onChange={(e) => set("sleepHours", e.target.value)} inputMode="numeric" /></label>
              <div className={s.field}><span>Stress lately</span>
                <div className={s.stressRow} role="radiogroup" aria-label="Stress level, 1 low to 5 high">
                  {["1", "2", "3", "4", "5"].map((n) => (
                    <button key={n} type="button" role="radio" aria-checked={f.stress === n}
                      className={f.stress === n ? `${s.stressBtn} ${s.stressOn}` : s.stressBtn}
                      onClick={() => set("stress", n)}>{n}</button>
                  ))}
                  <span className={s.stressCap}>1 = calm · 5 = heavy</span>
                </div>
              </div>
            </div>
            <label className={s.field}><span>What have you tried before? (diets, programs, therapies, practices…)</span>
              <textarea rows={3} value={f.tried} onChange={(e) => set("tried", e.target.value)} /></label>
            <h3 className={s.sub}>What gets in the way?</h3>
            <div className={s.chips}>{OBSTACLES.map((g) => <Chip key={g} group="obstacles" label={g} />)}</div>
            <label className={s.field}><span>Another obstacle?</span>
              <input value={f.obstacleOther} onChange={(e) => set("obstacleOther", e.target.value)} /></label>
            <h3 className={s.sub}>What would you like help with?</h3>
            <div className={s.chips}>{HELP_WITH.map((g) => <Chip key={g} group="helpWith" label={g} />)}</div>
            <label className={s.field}><span>Anything else Tamika should know before you arrive?</span>
              <textarea rows={3} value={f.anythingElse} onChange={(e) => set("anythingElse", e.target.value)} /></label>
          </fieldset>
        )}

        {show(4) && (
          <fieldset className={s.fs}>
            <legend className={s.legend}>Acknowledgement &amp; informed consent</legend>
            <div className={s.legal}>
              <p>Delta Roe (Tamika Banks, Certified Reiki Master &amp; Empowerment Life Coach) provides holistic
              wellness services — reiki, sound baths, chakra alignment, life &amp; wellness coaching, and
              educational support. These are <strong>complementary wellness practices</strong>.</p>
              <p>Delta Roe is not a licensed physician, nurse, registered dietitian, psychologist, therapist, or
              other licensed healthcare provider, and does not diagnose, treat, prescribe for, or cure any
              disease or medical or mental-health condition. Coaching and energy work are not psychotherapy or
              counseling. <strong>If you are in crisis, call 911 or dial 988.</strong></p>
              <p>All recommendations are educational and intended to complement — never replace — care from your
              physician or licensed providers. Before changing your diet, exercise, medications, supplements, or
              healthcare regimen, consult your physician. You remain solely responsible for your own healthcare
              decisions and outcomes.</p>
              <p>Session fees are as listed on the current service menu at deltaroe.com/services. Your information
              is held in confidence, used only to serve you, never sold, and shared only as required by law.</p>
            </div>
            <label className={s.check}><input type="checkbox" checked={f.ackScope} onChange={(e) => set("ackScope", e.target.checked)} />
              <span>I understand the services are complementary wellness practices, not medical or mental-health care. *</span></label>
            <label className={s.check}><input type="checkbox" checked={f.ackPhysician} onChange={(e) => set("ackPhysician", e.target.checked)} />
              <span>I will consult my physician or licensed provider before changing my diet, medications, or healthcare regimen. *</span></label>
            <label className={s.check}><input type="checkbox" checked={f.ackNoGuarantee} onChange={(e) => set("ackNoGuarantee", e.target.checked)} />
              <span>No specific outcomes have been promised, and I voluntarily participate, releasing Delta Roe from liability for my own health decisions except as provided under applicable California law. *</span></label>
            <label className={s.check}><input type="checkbox" checked={f.ackCancellation} onChange={(e) => set("ackCancellation", e.target.checked)} />
              <span>I&apos;ll give at least 24 hours&apos; notice to reschedule or cancel whenever possible. *</span></label>
            <label className={s.check}><input type="checkbox" checked={f.ackAdult} onChange={(e) => set("ackAdult", e.target.checked)} />
              <span>I am 18 or older (or a parent/guardian completing this for a minor with my consent). *</span></label>
            <div className={s.optRow}>
              <label className={s.check}><input type="checkbox" checked={f.optEmail} onChange={(e) => set("optEmail", e.target.checked)} />
                <span>Keep me in the loop — occasional emails about events &amp; offerings (optional)</span></label>
              <label className={s.check}><input type="checkbox" checked={f.optTestimonial} onChange={(e) => set("optTestimonial", e.target.checked)} />
                <span>You may invite me to share a testimonial someday (optional)</span></label>
            </div>
            <div className={s.grid2}>
              <label className={s.field}><span>Type your full name as your signature *</span>
                <input value={f.signature} onChange={(e) => set("signature", e.target.value)} className={s.sig} /></label>
              <label className={s.field}><span>Date</span><input value={today} readOnly /></label>
            </div>
            <p className={s.note}>Typing your name here acts as your electronic signature on this form.</p>
            {error && <p className={s.error} role="alert">{error}</p>}
          </fieldset>
        )}

        {/* nav */}
        <div className={s.nav}>
          {step > 0 ? (
            <button type="button" className={s.back} onClick={() => setStep(step - 1)}>← Back</button>
          ) : (
            <button type="button" className={s.back} onClick={printBlank}>Print a blank copy</button>
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn btn-solid" disabled={!stepValid()} onClick={() => setStep(step + 1)}>
              Continue →
            </button>
          ) : (
            <button type="button" className="btn btn-solid" disabled={!stepValid() || sending} onClick={submit}>
              {sending ? "Sending…" : "Sign & send"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
