import { expect, test } from '@playwright/test';

test('home page has expected h2', async ({ page }) => {
	await page.goto('/');
	
	// Wait for the page to load and check for the specific h2 content
	await expect(page.locator('h2:has-text("Senior Software Consultant")')).toBeVisible();
});
