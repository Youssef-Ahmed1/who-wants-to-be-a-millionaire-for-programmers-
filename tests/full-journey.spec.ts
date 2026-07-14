import { test, expect } from '@playwright/test';

test.skip("full user journey: register → login → play → save score → leaderboard", async ({
    page,
}) => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testName = "Test Engineer";
    const testPassword = "password123";

    //  REGISTER
    await page.goto("/register");
    await page.fill('input[name="name"]', testName);
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);

    await Promise.all([
        page.waitForURL("/login", { timeout: 10000 }),
        page.click('button[type="submit"]'),
    ]);

    await expect(page).toHaveURL("/login", { timeout: 10000 });

    // LOGIN
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await Promise.all([
        page.waitForURL("/", { timeout: 10000 }),
        page.click('button[type="submit"]'),
    ]);
    await expect(page).toHaveURL("/");

    //  SELECT CATEGORY
    await expect(page.getByText(`Welcome back, ${testName}`)).toBeVisible();
    await page.click('button:has-text("Frontend Mastery")');
    await expect(page).toHaveURL("/play");

    //  PLAY 2 QUESTIONS
    for (let i = 0; i < 2; i++) {
        await expect(page.locator("h2.text-2xl")).toBeVisible({
            timeout: 10000,
        });
        await page.locator("button.grid button").first().click();

        //  Wait for either next question or game-over
        await Promise.race([
            page.waitForSelector("h2.text-2xl", { timeout: 3000 }),
            page.waitForURL("/game-over", { timeout: 3000 }),
        ]);
    }

    // GAME OVER SCREEN
    await expect(page).toHaveURL("/game-over");
    await expect(page.getByText("GAME OVER")).toBeVisible();

    // SAVE SCORE
    await page.click('button:has-text("Save Score")');
    await expect(page.getByText("Score Saved!")).toBeVisible();

    // LEADERBOARD
    await page.goto("/leaderboard");
    await expect(page.getByText("Global Leaderboard")).toBeVisible();
    await expect(page.getByText(testName)).toBeVisible();
});
