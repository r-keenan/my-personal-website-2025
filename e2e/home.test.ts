import { expect, test } from '@playwright/test';
import { mockSanityAPI } from './mockSanity';

test('home page has two expected h2s', async ({ page }) => {
	await mockSanityAPI(page);

	await page.goto('/');

	await page.waitForLoadState('networkidle');

	const h2Elements = await page.locator('h2').allTextContents();

	// Wait for the page to load and check for the specific h2 content
	await expect(page.locator('h2:has-text("Senior Software Consultant")')).toBeVisible();

	await expect(page.locator('h2:has-text("Senior Software Consultant")')).toBeVisible();
});
