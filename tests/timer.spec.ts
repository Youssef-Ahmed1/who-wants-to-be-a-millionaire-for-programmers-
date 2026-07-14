import { test, expect } from '@playwright/test';

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

  // Wait for the timer to expire (15s + buffer)
await expect(page.getByText('GAME OVER')).toBeVisible({ timeout: 20000 });
  // Game should auto-fail and redirect to game-over
  await expect(page).toHaveURL('/game-over');
  await expect(page.getByText('GAME OVER')).toBeVisible();
});
