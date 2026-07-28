import { test, expect } from '@playwright/test';

test.describe('Lifelines', () => {
test.beforeEach(async ({ page }) => {
    // 1. Navigate to home
    await page.goto("/");

    // 2. If redirected to login, authenticate
    if (page.url().includes("/login")) {
        await page.fill('input[name="email"]', "test@test.com");
        await page.fill('input[name="password"]', "smileyCat123");
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/\/$/, { timeout: 10000 });
    }

    // 3. Start game
    await page.click('button:has-text("Frontend Mastery")');
    await expect(page).toHaveURL("/play");

    // 🛑 4. WAIT FOR ASYNC QUESTION FETCH TO COMPLETE
    await expect(page.getByText("Loading the Gauntlet...")).not.toBeVisible({
        timeout: 10000,
    });
});
  test('50/50 hides two wrong options', async ({ page }) => {
 const answerButtons = page.locator("div.grid > button");
 await expect(answerButtons).toHaveCount(4);
 const options = await page
     .locator('[data-testid^="option-"]')
     .allTextContents();
 await page.click('button:has-text("rm -rf 50%")');

  await expect(answerButtons).toHaveCount(2);
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
