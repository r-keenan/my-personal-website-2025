import { expect, test } from '@playwright/test';
import { mockExperience, mockQualifications } from './mockData';

test('home page has two expected h2s', async ({ page }) => {
	await page.goto('/');

	await page.route('**/v1/data/query/**', async (route) => {
		const url = route.request().url();

		if (url.includes('qualifications')) {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ result: mockQualifications })
			});
		} else if (url.includes('experience')) {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ result: mockExperience })
			});
		} else {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ result: [] })
			});
		}
	});

	// Wait for the page to load and check for the specific h2 content
	await expect(page.locator('h2:has-text("Senior Software Consultant")')).toBeVisible();
});
