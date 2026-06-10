// Quick visual audit: captures full-page desktop + mobile screenshots.
import { chromium, devices } from '@playwright/test';

const base = process.env.SHOT_URL ?? 'http://localhost:3001';
const outDir = process.env.SHOT_DIR ?? 'shots';

const browser = await chromium.launch();

// Desktop
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(base, { waitUntil: 'networkidle' });
await desktop.evaluate(() => new Promise(r => setTimeout(r, 800)));
await desktop.screenshot({ path: `${outDir}/desktop-full.png`, fullPage: true });
await desktop.screenshot({ path: `${outDir}/desktop-hero.png` });
await desktop.close();

// Mobile
const mobile = await browser.newPage({ ...devices['iPhone 13'] });
await mobile.goto(base, { waitUntil: 'networkidle' });
await mobile.evaluate(() => new Promise(r => setTimeout(r, 800)));
await mobile.screenshot({ path: `${outDir}/mobile-full.png`, fullPage: true });
await mobile.close();

await browser.close();
console.log('done');
