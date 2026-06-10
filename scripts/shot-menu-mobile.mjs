// Mobile menu typography check: dot leaders with wrapping names + compact lists.
import { chromium, devices } from '@playwright/test';

const base = process.env.SHOT_URL ?? 'http://localhost:3001';
const outDir = process.env.SHOT_DIR ?? 'shots';

const browser = await chromium.launch();
const page = await browser.newPage({ ...devices['iPhone 13'] });
await page.goto(base, { waitUntil: 'networkidle' });

const jumpTo = (sel) => page.evaluate((sel) => {
  const el = document.querySelector(sel);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'instant' });
}, sel);

// Piqueos (default tab) — names with descriptions
await jumpTo('#panel-piqueos');
await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
await page.screenshot({ path: `${outDir}/mobile-menu-piqueos.png` });

// Cortes — long names with weight spans
await page.click('#tab-cortes', { force: true });
await page.evaluate(() => new Promise(r => setTimeout(r, 400)));
await jumpTo('#panel-cortes .menu-subsection');
await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
await page.screenshot({ path: `${outDir}/mobile-menu-cortes.png` });

// Bebidas — compact two-span rows
await page.click('#tab-bebidas', { force: true });
await page.evaluate(() => new Promise(r => setTimeout(r, 400)));
await jumpTo('#panel-bebidas');
await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
await page.screenshot({ path: `${outDir}/mobile-menu-bebidas.png` });

await browser.close();
console.log('done');
