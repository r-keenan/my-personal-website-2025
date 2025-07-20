import { Page } from '@playwright/test';
import { mockQualifications, mockExperience } from './mockData';

export async function mockSanityAPI(page: Page) {
	await page.route('**/v1/data/query/**', async (route) => {
		const url = route.request().url();
		const body = route.request().postData();

		if (body?.includes('qualifications') || url.includes('qualifications')) {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ result: mockQualifications })
			});
		} else if (body?.includes('experience') || url.includes('experience')) {
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
}
