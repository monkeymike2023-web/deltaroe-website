// Roe chat telemetry: every question lands in the Vercel function logs
// (filter on "[roe-chat]"). MISS lines are the training backlog — questions
// visitors asked that the knowledge base couldn't answer.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const q = typeof body?.q === "string" ? body.q.slice(0, 300).replace(/\s+/g, " ").trim() : "";
    if (q) {
      console.log(`[roe-chat] ${body?.matched ? "HIT " : "MISS"} ${q}`);
    }
  } catch {
    // malformed beacon — nothing to log
  }
  return new Response(null, { status: 204 });
}
