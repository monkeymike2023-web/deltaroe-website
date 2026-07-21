// Verify /the-clearing (full 7-round playthrough, mobile, reduced motion)
// and confirm /sound-chakras still works after the bowl-audio refactor.
// Usage: node scripts/snap-clearing.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3210";
const browser = await chromium.launch();
let failures = 0;
const ok = (cond, label) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${label}`);
  if (!cond) failures++;
};

function watchConsole(page, tag, errors) {
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${tag}] ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${tag}] pageerror: ${e.message}`));
}

/* ---------------- desktop full playthrough ---------------- */
{
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  watchConsole(page, "clearing-desktop", errors);
  await page.goto(`${base}/the-clearing`, { waitUntil: "networkidle", timeout: 60000 });

  ok((await page.locator("h1").innerText()) === "The Clearing", "intro: h1 renders");
  ok(await page.getByRole("button", { name: "Begin the ritual" }).isVisible(), "intro: begin button");
  ok(await page.getByRole("button", { name: /hear the bowls/i }).isVisible(), "intro: sound toggle");
  await page.screenshot({ path: ".data-snap-clearing-intro.png" });

  // enable sound (verifies makeBowl on gesture throws nothing)
  await page.getByRole("button", { name: /hear the bowls/i }).click();
  await page.getByRole("button", { name: "Begin the ritual" }).click();

  const roundNames = ["Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown"];
  for (let r = 0; r < 7; r++) {
    await page.waitForSelector('button[aria-label^="Break the heavy word"]', { timeout: 20000 });
    const hud = (await page.locator("main").innerText()).toLowerCase();
    ok(hud.includes(`round ${r + 1} of 7`), `round ${r + 1}: HUD shows round ${r + 1} (${roundNames[r]})`);
    if (r === 0) await page.screenshot({ path: ".data-snap-clearing-round1.png" });

    // round 3 (index 2): leave motes uncollected to test auto-drift
    if (r !== 2) {
      for (const el of await page.locator('button[aria-label^="Gather the bright word"]:enabled').elementHandles()) {
        await el.click({ force: true }).catch(() => {});
        await page.waitForTimeout(120);
      }
    }
    // break a shard, confirm the counter advances once
    const first = page.locator('button[aria-label^="Break the heavy word"]:enabled').first();
    await first.click({ force: true }).catch(() => {});
    await page.waitForTimeout(250);
    const hud2 = (await page.locator("main").innerText()).toLowerCase();
    if (r === 0) ok(/1\s*of 5 released/.test(hud2), "round 1: shatter advances counter");
    // break the rest
    for (let guard = 0; guard < 10; guard++) {
      const els = await page.locator('button[aria-label^="Break the heavy word"]:enabled').elementHandles();
      if (els.length === 0) break;
      for (const el of els) {
        await el.click({ force: true }).catch(() => {});
        await page.waitForTimeout(150);
      }
    }
    // wait for next round intro or finale
    if (r < 6) {
      await page.waitForFunction(
        (n) => document.querySelector("main")?.innerText.toLowerCase().includes(`round ${n} of 7`),
        r + 2,
        { timeout: 25000 }
      );
    }
  }

  await page.waitForSelector("text=You cleared what you were carrying.", { timeout: 30000 });
  ok(true, "finale: closing copy renders");
  await page.waitForTimeout(2500); // let stars enter
  const stars = await page.locator("main span").filter({ hasText: /^(grounded|safe|steady|creative|alive|flowing|confident|capable|bold|loved|open|forgiven|heard|honest|clear-voiced|clear|intuitive|knowing|connected|whole|at peace)$/ }).count();
  ok(stars >= 21, `finale: constellation has ${stars} word-stars (expect >= 21)`);
  ok(await page.getByRole("link", { name: "Book a Sound Bath" }).isVisible(), "finale: booking CTA");
  ok(await page.getByRole("link", { name: /meet your seven chakras/i }).isVisible(), "finale: chakras CTA");
  ok(await page.getByRole("button", { name: "Begin again" }).isVisible(), "finale: begin again");
  await page.screenshot({ path: ".data-snap-clearing-finale.png" });
  ok(errors.length === 0, `desktop: zero console errors${errors.length ? " -> " + errors.join(" | ") : ""}`);
  await page.close();
}

/* ---------------- mobile 375px: no horizontal overflow ---------------- */
{
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  watchConsole(page, "clearing-mobile", errors);
  await page.goto(`${base}/the-clearing`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Begin the ritual" }).click();
  await page.waitForSelector('button[aria-label^="Break the heavy word"]', { timeout: 20000 });
  await page.waitForTimeout(600);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  ok(overflow <= 0, `mobile 375px: no horizontal overflow (delta ${overflow}px)`);
  const shard = page.locator('button[aria-label^="Break the heavy word"]').first();
  const box = await shard.boundingBox();
  ok(box && box.width >= 44 && box.height >= 44, `mobile: shard tap target ${Math.round(box?.width)}x${Math.round(box?.height)} >= 44`);
  await page.screenshot({ path: ".data-snap-clearing-mobile.png" });
  ok(errors.length === 0, `mobile: zero console errors${errors.length ? " -> " + errors.join(" | ") : ""}`);
  await page.close();
}

/* ---------------- reduced motion: static grid + dissolve ---------------- */
{
  const errors = [];
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  watchConsole(page, "clearing-reduced", errors);
  await page.goto(`${base}/the-clearing`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Begin the ritual" }).click();
  await page.waitForSelector('button[aria-label^="Break the heavy word"]', { timeout: 20000 });
  const display = await page.evaluate(() => {
    const field = document.querySelector('button[aria-label^="Break the heavy word"]')?.closest("div[class*=field]");
    return field ? getComputedStyle(field).display : "none";
  });
  ok(display === "grid", `reduced motion: field is a static grid (display: ${display})`);
  await page.locator('button[aria-label^="Break the heavy word"]').first().click();
  await page.waitForTimeout(600);
  const fragCount = await page.locator("i").count();
  ok(fragCount === 0, "reduced motion: no shatter particles rendered");
  const remaining = await page.locator('button[aria-label^="Break the heavy word"]').count();
  ok(remaining === 4, `reduced motion: shard dissolved and removed (${remaining} left)`);
  await page.screenshot({ path: ".data-snap-clearing-reduced.png" });
  ok(errors.length === 0, `reduced: zero console errors${errors.length ? " -> " + errors.join(" | ") : ""}`);
  await ctx.close();
}

/* ---------------- /sound-chakras regression (audio refactor) ---------------- */
{
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  watchConsole(page, "chakras", errors);
  await page.goto(`${base}/sound-chakras`, { waitUntil: "networkidle" });
  ok((await page.locator("h1").innerText()).includes("Seven Chakras"), "chakras: h1 renders");
  const orbs = await page.locator('svg [role="button"]').count();
  ok(orbs === 7, `chakras: 7 orbs rendered (${orbs})`);
  // symbols: petal paths exist inside orbs
  const petals = await page.evaluate(() => document.querySelectorAll('svg [role="button"] g path').length);
  ok(petals > 40, `chakras: lotus glyph paths present (${petals})`);
  await page.getByRole("button", { name: "Throat chakra — Vishuddha, 741 hertz" }).click();
  await page.waitForTimeout(600);
  const panel = await page.locator("main").innerText();
  ok(panel.includes("Vishuddha") && panel.includes("741"), "chakras: selecting Throat updates panel (741 Hz)");
  // sound toggle exercises makeBowl/strikeBowl from the shared module
  await page.getByRole("button", { name: /hear your chakras/i }).click();
  await page.waitForTimeout(400);
  ok(await page.getByRole("button", { name: /sound on/i }).isVisible(), "chakras: sound toggle turns on (shared bowl-audio)");
  ok(panel.includes("Try The Clearing"), "chakras: invite card to The Clearing present");
  await page.screenshot({ path: ".data-snap-chakras-regression.png", fullPage: true });
  ok(errors.length === 0, `chakras: zero console errors${errors.length ? " -> " + errors.join(" | ") : ""}`);
  await page.close();
}

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
