// Verify the services menu (price-sorted) + the two new service pages.
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3210";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1100 }, deviceScaleFactor: 1.5 });

await page.goto(`${base}/services`, { waitUntil: "networkidle", timeout: 60000 });
const items = await page.locator(".menu-item").allInnerTexts();
console.log("menu order:");
for (const it of items) console.log("  " + it.replace(/\s+/g, " ").slice(0, 90));
await page.screenshot({ path: ".data-snap-services.png", fullPage: true });

for (const slug of ["reiki-chakra-alignment", "reiki-sound-bath"]) {
  const r = await page.goto(`${base}/services/${slug}`, { waitUntil: "networkidle" });
  const h1 = await page.locator("h1").first().innerText().catch(() => "NO H1");
  console.log(`${slug}: HTTP ${r.status()} — ${h1}`);
  await page.screenshot({ path: `.data-snap-${slug}.png`, fullPage: false });
}
await browser.close();
