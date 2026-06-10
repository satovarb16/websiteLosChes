// Regression check: open the mobile nav drawer while the page is scrolled.
import { chromium, devices } from '@playwright/test';

const base = process.env.SHOT_URL ?? 'http://localhost:3001';
const outDir = process.env.SHOT_DIR ?? 'shots';

const browser = await chromium.launch();
const page = await browser.newPage({ ...devices['iPhone 13'] });
await page.goto(base, { waitUntil: 'networkidle' });

// Scroll mid-page so .is-scrolled (and its old backdrop-filter) is active
await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
await page.evaluate(() => new Promise(r => setTimeout(r, 500)));
await page.tap('#nav-toggle', { force: true });
await page.evaluate(() => new Promise(r => setTimeout(r, 700)));
await page.screenshot({ path: `${outDir}/mobile-drawer-scrolled.png` });

// Menu items at narrow width — dot leaders with wrapping names
await page.tap('#nav-toggle', { force: true });
await page.evaluate(() => new Promise(r => setTimeout(r, 500)));
await page.evaluate(() => {
  document.getElementById('tab-cortes')?.click();
  document.getElementById('panel-piqueos')?.scrollIntoView();
});
await page.evaluate(() => new Promise(r => setTimeout(r, 800)));
await page.screenshot({ path: `${outDir}/mobile-menu-items.png` });

await browser.close();
console.log('done');
