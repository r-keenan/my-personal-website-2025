import type { Page } from 'playwright';
import { faker } from '@faker-js/faker';
import type { Qualification } from '../src/lib/utils/types/types';
import type { PortableTextBlock } from '@portabletext/types';
import { sanityApiVersion } from '../src/lib/clients/sanity';

export const mockSanityAPI = async (page: Page) => {
	// Mock AWS Secrets Manager call
	await page.route('**/secretsmanager/**', async (route) => {
		const body = route.request().postData();
		let secretValue = '';

		if (body?.includes('SANITY_PROJECT_ID')) {
			secretValue = 'mock-project-id';
		} else if (body?.includes('SANITY_DATASET')) {
			secretValue = 'mock-dataset';
		} else if (body?.includes('SANITY_TOKEN')) {
			secretValue = 'mock-token';
		} else if (body?.includes('SANITY_CDN_URL')) {
			secretValue = 'https://mock-cdn.sanity.io';
		}

		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ SecretString: secretValue })
		});
	});
	await page.route(`**/v${sanityApiVersion}/data/query/**`, async (route) => {
		const url = route.request().url();
		const body = route.request().postData();
		const queryParams = new URL(url).searchParams;
		const query = queryParams.get('query');

		console.log('Intercepted Sanity API call:', url);

		if (body?.includes('qualifications') || url.includes('qualifications')) {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ result: generateMockQualifications() })
			});
		} else {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ result: [] })
			});
		}
	});
};

const generatePortableText = (): PortableTextBlock[] => {
	return [
		{
			_type: 'block',
			_key: faker.string.uuid(),
			style: 'normal',
			markDefs: [],
			children: [
				{
					_type: 'span',
					_key: faker.string.uuid(),
					text: faker.lorem.sentences(2),
					marks: []
				}
			]
		}
	];
};

const generateQualification = (): Qualification => {
	return {
		_id: faker.string.uuid(),
		_type: 'qualification',
		_createdAt: faker.date.past().toISOString(),
		_updatedAt: faker.date.recent().toISOString(),
		_rev: faker.string.alphanumeric(10),
		name: faker.person.jobTitle(),
		description: generatePortableText(),
		category: faker.string.alphanumeric(10)
	};
};

const generateMockQualifications = (count: number = 3): Qualification[] =>
	faker.helpers.multiple(generateQualification, { count });
