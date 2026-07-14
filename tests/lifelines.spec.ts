import { test, expect } from '@playwright/test';

test.describe('Lifelines', () => {
test.beforeEach(async ({ page }) => {
    // 1. Go to login
    await page.goto('/login');

    // 2. Fill credentials (seeded user)
    await page.fill('input[name="email"]', 'test@test.com');
    await page.fill('input[name="password"]', 'smileyCat123');

    // 3. Submit
    await page.click('button[type="submit"]');

    // 4. Wait for redirect to home
    await expect(page).toHaveURL('/', { timeout: 10000 });

    // 5. Start game
    await page.click('button:has-text("Frontend Mastery")');
    await expect(page).toHaveURL('/play');
});

  test('50/50 hides two wrong options', async ({ page }) => {
    const options = await page.locator('button.grid button').allTextContents();
    await page.click('button:has-text("rm -rf 50%")');
const visibleOptions = await page.locator('div.grid > button').allTextContents();
expect(visibleOptions.length).toBe(options.length - 2);
  });

  test('Phone a Friend shows modal with message', async ({ page }) => {
    await page.click('button:has-text("📱 Phone a Friend")');
    await expect(page.getByText('🧙‍♂️ Your Senior Dev Friend Says...')).toBeVisible();
    await expect(page.locator('p.text-white.text-lg.leading-relaxed.italic')).toBeVisible();
    await page.click('button:has-text("Close")');
    await expect(page.getByText('🧙‍♂️ Your Senior Dev Friend Says...')).not.toBeVisible();
  });

  test('Ask StackOverflow shows bar chart', async ({ page }) => {
    await page.click('button:has-text("Ask StackOverflow")');
  await expect(page.getByText('StackOverflow Says...')).toBeVisible();
await expect(page.locator('div.h-full.bg-blue-500').first()).toBeVisible({ timeout: 5000 });
const width = await page.locator('div.h-full.bg-blue-500').first().getAttribute('style');
expect(width).toContain('width:');
    await page.click('button:has-text("Close Window")');
  });
});
