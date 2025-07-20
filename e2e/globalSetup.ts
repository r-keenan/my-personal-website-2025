import { chromium } from '@playwright/test';

const globalSetup = async () => {
	const browser = await chromium.launch();
	const context = await browser.newContext();

	// Mock all Sanity requests globally
	await context.route('**/v1/data/query/**', (route) => {
		route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ result: [] })
		});
	});

	await browser.close();
};

export default globalSetup;
