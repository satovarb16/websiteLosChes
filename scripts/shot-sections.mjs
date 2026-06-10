// Captures viewport-sized screenshots of each section for visual audit.
import { chromium } from '@playwright/test';

const base = process.env.SHOT_URL ?? 'http://localhost:3001';
const outDir = process.env.SHOT_DIR ?? 'shots';
const ids = ['inicio', 'historia', 'galeria', 'menu', 'ubicacion', 'reservas', 'contacto'];
const extra = ['.stats-strip', '.doneness-section', '.story--image-right'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base, { waitUntil: 'networkidle' });

for (const id of ids) {
  await page.evaluate((id) => document.getElementById(id)?.scrollIntoView(), id);
  await page.evaluate(() => new Promise(r => setTimeout(r, 900)));
  await page.screenshot({ path: `${outDir}/section-${id}.png` });
}
for (const sel of extra) {
  await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView(), sel);
  await page.evaluate(() => new Promise(r => setTimeout(r, 900)));
  const name = sel.replace(/[^a-z-]/g, '');
  await page.screenshot({ path: `${outDir}/section-${name}.png` });
}

await browser.close();
console.log('done');
