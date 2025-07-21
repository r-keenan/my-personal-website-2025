import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { mockQualifications } from './mockData';
import type { Qualification } from '../src/lib/utils/types/types';
import { PortableTextBlock } from '@portabletext/types';

export const mockSanityAPI = async (page: Page) => {
	await page.route('**/v1/data/query/**', async (route) => {
		const url = route.request().url();
		const body = route.request().postData();

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
