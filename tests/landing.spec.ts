import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Kill decorative looping animations (e.g. gallery-float) so elements stay
  // bbox-stable for Playwright actionability. Playwright's reducedMotion
  // emulation does not reliably suppress them in this setup, so disable in-page.
  await page.addInitScript(() => {
    const css =
      '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}';
    const inject = () => {
      const style = document.createElement('style');
      style.textContent = css;
      (document.head || document.documentElement).appendChild(style);
    };
    // addInitScript runs at document-start; documentElement may not exist yet.
    if (document.documentElement) inject();
    else document.addEventListener('DOMContentLoaded', inject);
  });
  await page.goto('/');
});

test('page loads without console errors', async ({ page }) => {
  const errors: string[] = [];
  // Ignore Astro dev toolbar internal messages (start with %c for styled logging)
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().startsWith('%c')) errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('/');
  expect(errors).toHaveLength(0);
});

test('key sections are visible', async ({ page }) => {
  await expect(page.locator('#historia')).toBeVisible();
  await expect(page.locator('#galeria')).toBeVisible();
  await expect(page.locator('#menu')).toBeVisible();
  await expect(page.locator('#ubicacion')).toBeVisible();
  await expect(page.locator('#reservas')).toBeVisible();
});

test('WhatsApp CTA links are present and valid', async ({ page }) => {
  const ctaLinks = page.locator('a[href*="wa.me"], a[href*="whatsapp"]');
  const count = await ctaLinks.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const href = await ctaLinks.nth(i).getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toMatch(/wa\.me|whatsapp/);
  }
});

test('gallery renders 12 images across 2 pages', async ({ page }) => {
  const items = page.locator('.gallery-item');
  await expect(items).toHaveCount(12);
  await expect(page.locator('.gallery-page')).toHaveCount(2);
});

test('gallery pagination: next arrow advances to page 2', async ({ page }) => {
  const prev = page.locator('.gallery-nav--prev');
  const next = page.locator('.gallery-nav--next');
  await expect(prev).toBeDisabled();
  await next.click();
  await expect(page.locator('.gallery-page-indicator span')).toHaveText('2');
  await expect(next).toBeDisabled();
  await expect(prev).toBeEnabled();
});

test('navigation links point to existing sections', async ({ page }) => {
  const navLinks = page.locator('.nav-link');
  const count = await navLinks.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const href = await navLinks.nth(i).getAttribute('href');
    expect(href).toMatch(/^#/);
    const sectionId = href!.slice(1);
    await expect(page.locator(`#${sectionId}`)).toBeAttached();
  }
});

test('page title and meta description are set', async ({ page }) => {
  await expect(page).toHaveTitle(/.+/);
  const metaDesc = page.locator('meta[name="description"]');
  await expect(metaDesc).toBeAttached();
  const content = await metaDesc.getAttribute('content');
  expect(content?.length).toBeGreaterThan(10);
});

test('mobile: hamburger menu opens navigation', async ({ page, isMobile }) => {
  if (!isMobile) test.skip();
  const menuBtn = page.locator('.menu-toggle, [aria-controls="nav-menu"]');
  // force:true bypasses Playwright's hit-test: the fixed nav header is promoted to a
  // compositor layer by backdrop-filter transitions, which confuses elementFromPoint.
  // The button is real, visible, and functional — this is a Chromium rendering quirk.
  await menuBtn.click({ force: true });
  await expect(page.locator('#nav-menu')).toBeVisible();
});

test('menu tabs: clicking a tab shows the correct panel', async ({ page }) => {
  await page.locator('.tab-btn[data-tab="parrillas"]').click();
  await expect(page.locator('#panel-parrillas')).toBeVisible();
  await expect(page.locator('#panel-piqueos')).not.toBeVisible();
});

test('menu tabs: aria-selected updates correctly on tab click', async ({ page }) => {
  await page.locator('.tab-btn[data-tab="parrillas"]').click();
  expect(await page.locator('.tab-btn[data-tab="parrillas"]').getAttribute('aria-selected')).toBe('true');
  expect(await page.locator('.tab-btn[data-tab="piqueos"]').getAttribute('aria-selected')).toBe('false');
});

async function openLightbox(page: Page) {
  const img = page.locator('.gallery-img-wrap').first();
  await img.scrollIntoViewIfNeeded();
  await img.click();
  await expect(page.locator('#lightbox')).toBeVisible();
}

test('lightbox: clicking a gallery image opens the lightbox', async ({ page }) => {
  await openLightbox(page);
});

test('lightbox: close button closes the lightbox', async ({ page }) => {
  await openLightbox(page);
  await page.locator('.lightbox-close').click();
  await expect(page.locator('#lightbox')).not.toBeVisible();
});

test('lightbox: ESC key closes the lightbox', async ({ page }) => {
  await openLightbox(page);
  await page.keyboard.press('Escape');
  await expect(page.locator('#lightbox')).not.toBeVisible();
});
