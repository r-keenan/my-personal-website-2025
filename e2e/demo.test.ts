import { expect, test } from '@playwright/test';
import { mockExperience, mockQualifications } from './mockData';
import { mockSanityAPI } from './mockSanity';

test('home page has two expected h2s', async ({ page }) => {
	await mockSanityAPI(page);

	await page.goto('/');

	// Wait for the page to load and check for the specific h2 content
	await expect(page.locator('h2:has-text("Senior Software Consultant")')).toBeVisible();
});
