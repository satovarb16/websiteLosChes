import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
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

test('gallery renders all 6 images', async ({ page }) => {
  const items = page.locator('.gallery-item');
  await expect(items).toHaveCount(6);
  for (let i = 0; i < 6; i++) {
    await expect(items.nth(i).locator('img')).toBeVisible();
  }
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
  await menuBtn.click();
  await expect(page.locator('#nav-menu')).toBeVisible();
});
