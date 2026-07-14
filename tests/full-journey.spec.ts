import { test, expect } from '@playwright/test';

test('full user journey: register → login → play → save score → leaderboard', async ({ page }) => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testName = 'Test Engineer';
  const testPassword = 'password123';

  // 1. REGISTER
  await page.goto('/register');
  await page.fill('input[name="name"]', testName);
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', testPassword);
  await page.click('button[type="submit"]');
  await page.waitForSelector('.text-red-500', { timeout: 5000 }).catch(() => {});
const errorText = await page.locator('.text-red-500').textContent().catch(() => null);
if (errorText) {
  console.error('Registration error:', errorText);
}
await expect(page).toHaveURL('/login', { timeout: 10000 });
  await expect(page).toHaveURL('/login', { timeout: 10000 });

  // 2. LOGIN
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', testPassword);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/');

  // 3. SELECT CATEGORY
  await expect(page.getByText(`Welcome back, ${testName}`)).toBeVisible();
  await page.click('button:has-text("Frontend Mastery")');
  await expect(page).toHaveURL('/play');

  // 4. PLAY 5 QUESTIONS (ensure you have at least 5 questions)
  for (let i = 0; i < 5; i++) {
    // Wait for the question to load
    await expect(page.locator('h2.text-2xl')).toBeVisible();

    // Click the first answer (any option)
    await page.locator('button.grid button').first().click();

    // Wait for the result to process (1.5s + next question load)
    await page.waitForTimeout(2000);
  }

  // 5. GAME OVER SCREEN
  await expect(page).toHaveURL('/game-over');
  await expect(page.getByText('GAME OVER')).toBeVisible();

  // 6. SAVE SCORE
  await page.click('button:has-text("Save Score")');
  await expect(page.getByText('Score Saved!')).toBeVisible();

  // 7. LEADERBOARD
  await page.goto('/leaderboard');
  await expect(page.getByText('Global Leaderboard')).toBeVisible();
  await expect(page.getByText(testName)).toBeVisible();
});
