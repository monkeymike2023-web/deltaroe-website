// Client intake submissions → emailed to the studio inbox (Info@deltaroe.com)
// with reply-to set to the client. Requires RESEND_API_KEY in the environment;
// without it the route fails safe with a call-the-studio message (and logs the
// submission to the function logs as a last-resort backstop — filter
// "[intake]"). Interim sender: the send.robbjack.com verified domain until
// Delta Roe's own sending domain is set up at handover (owner's manual note).
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Malformed submission" }, { status: 400 });
  }

  const t = (k: string) => String(b[k] ?? "").trim().slice(0, 2000);
  const checks = (k: string) =>
    Object.entries((b[k] as Record<string, boolean>) ?? {})
      .filter(([, v]) => v)
      .map(([n]) => n)
      .join(", ") || "—";
  const yn = (v: unknown) => (v ? "YES" : "no");

  const name = t("name");
  const email = t("email");
  const phone = t("phone");
  if (!name || (!email && !phone)) {
    return Response.json({ ok: false, error: "Name and a way to reach you are required" }, { status: 422 });
  }
  if (!b.ackScope || !b.ackPhysician || !b.ackNoGuarantee || !b.ackCancellation || !b.ackAdult || !t("signature")) {
    return Response.json({ ok: false, error: "All consent acknowledgements and signature are required" }, { status: 422 });
  }

  const lines = [
    `NEW CLIENT INTAKE — ${name}`,
    `Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} (Pacific)`,
    "",
    "— ABOUT —",
    `Name: ${name}   DOB: ${t("dob") || "—"}`,
    `Address: ${[t("address"), t("city"), t("state"), t("zip")].filter(Boolean).join(", ") || "—"}`,
    `Phone: ${phone || "—"}   Email: ${email || "—"}   Prefers: ${t("contactPref") || "—"}`,
    `Emergency: ${t("emergencyName") || "—"} (${t("emergencyRelationship") || "—"}) ${t("emergencyPhone") || ""}`,
    "",
    "— WHAT BRINGS THEM IN —",
    `Goals: ${checks("goals")}${t("goalOther") ? `; other: ${t("goalOther")}` : ""}`,
    `Success in 3–6 months: ${t("success90") || "—"}`,
    "",
    "— HEALTH PICTURE —",
    `Diagnosed condition(s): ${t("diagnosed") || "—"}${t("diagnosedDetail") ? ` — ${t("diagnosedDetail")}` : ""}`,
    `Under physician care: ${t("underCare") || "—"}   Treatment plan: ${t("treatmentPlan") || "—"}`,
    `Medications/supplements: ${t("medications") || "—"}`,
    `SOUND/ENERGY SAFETY FLAGS: ${checks("safety")}`,
    "",
    "— LIFE RIGHT NOW —",
    `Nutrition: ${t("nutrition") || "—"}`,
    `Movement: ${t("movement") || "—"}`,
    `Sleep: ${t("sleepHours") || "—"} hrs   Stress (1–5): ${t("stress") || "—"}`,
    `Tried before: ${t("tried") || "—"}`,
    `Obstacles: ${checks("obstacles")}${t("obstacleOther") ? `; other: ${t("obstacleOther")}` : ""}`,
    `Wants help with: ${checks("helpWith")}${t("helpOther") ? `; other: ${t("helpOther")}` : ""}`,
    `Anything else: ${t("anythingElse") || "—"}`,
    "",
    "— CONSENT —",
    `Scope acknowledged: ${yn(b.ackScope)}  Physician-first: ${yn(b.ackPhysician)}  No-guarantees/release: ${yn(b.ackNoGuarantee)}`,
    `Cancellation policy: ${yn(b.ackCancellation)}  18+: ${yn(b.ackAdult)}`,
    `Email list opt-in: ${yn(b.optEmail)}   Testimonial invite ok: ${yn(b.optTestimonial)}`,
    `Signed (typed): ${t("signature")}   Date: ${t("signedDate")}`,
  ];
  const text = lines.join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[intake] RESEND_API_KEY missing — submission logged only:\n" + text);
    return Response.json(
      { ok: false, error: "form delivery is not configured — please call the studio" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Delta Roe Website <web@send.robbjack.com>",
        to: ["Info@deltaroe.com"],
        reply_to: email || undefined,
        subject: `New client intake — ${name}${checks("safety") !== "—" && !/none of these/i.test(checks("safety")) ? " ⚠ safety flags" : ""}`,
        text,
      }),
    });
    const j = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
    if (!res.ok) throw new Error(j.message || `send failed (${res.status})`);
    console.log(`[intake] sent ${j.id} for ${name}`);
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[intake] SEND FAILED — submission follows:\n" + text, e);
    return Response.json({ ok: false, error: "delivery failed — please call the studio" }, { status: 502 });
  }
}
