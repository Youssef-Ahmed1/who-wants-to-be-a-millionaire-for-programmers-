import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } }); // iPhone 12

test('mobile view shows compact ladder card', async ({ page }) => {
  // Log in and start a game
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
    await expect(page).toHaveURL('/play')

  // Verify mobile ladder card is visible
  await expect(page.locator('div.md\\:hidden .flex.justify-between')).toBeVisible();
  await expect(page.getByText('Question')).toBeVisible();
  await expect(page.getByText('Current Role')).toBeVisible();

  // Verify full ladder is hidden
  await expect(page.locator('div.hidden.md\\:block')).not.toBeVisible();
});
