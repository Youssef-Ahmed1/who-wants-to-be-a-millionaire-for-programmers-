import { test, expect } from '@playwright/test';

test('debug login', async ({ page }) => {
    // Go to login
    await page.goto('/login');
    await page.screenshot({ path: 'debug-1-login.png' });

    // Fill and submit
    await page.fill('input[name="email"]', 'test@test.com');
    await page.fill('input[name="password"]', 'smileyCat123');
    await page.click('button[type="submit"]');

    // Wait and screenshot
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'debug-2-after-submit.png' });

    // Check for error
    const error = await page.locator('.text-red-500').textContent().catch(() => null);
    console.log('Error text:', error);

    // Check URL
    console.log('Current URL:', page.url());
    await expect(page).toHaveURL('/');
});
