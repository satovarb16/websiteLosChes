// Mobile-viewport audit: menu section, open nav drawer, location, footer.
import { chromium, devices } from '@playwright/test';

const base = process.env.SHOT_URL ?? 'http://localhost:3001';
const outDir = process.env.SHOT_DIR ?? 'shots';

const browser = await chromium.launch();
const page = await browser.newPage({ ...devices['iPhone 13'] });
await page.goto(base, { waitUntil: 'networkidle' });

for (const id of ['menu', 'ubicacion', 'contacto']) {
  await page.evaluate((id) => document.getElementById(id)?.scrollIntoView(), id);
  await page.evaluate(() => new Promise(r => setTimeout(r, 900)));
  await page.screenshot({ path: `${outDir}/mobile-${id}.png` });
}

await page.evaluate(() => window.scrollTo(0, 0));
await page.evaluate(() => new Promise(r => setTimeout(r, 400)));
// force:true — fixed nav header is compositor-promoted and confuses hit-testing (see landing.spec.ts)
await page.tap('#nav-toggle', { force: true });
await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
await page.screenshot({ path: `${outDir}/mobile-nav-open.png` });

await browser.close();
console.log('done');
