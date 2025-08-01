import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	test('should render h2', () => {
		const mockData = {
			initialData: {
				qualifications: [
					{
						_id: 'test-id-1',
						_type: 'qualification',
						_createdAt: '2023-01-01T00:00:00Z',
						_updatedAt: '2023-01-01T00:00:00Z',
						_rev: 'test-rev',
						name: 'Test Qualification',
						description: [
							{
								_type: 'block',
								_key: 'test-key',
								children: [{ _type: 'span', text: 'Test description' }]
							}
						],
						category: 'Test Category'
					}
				]
			}
		};

		render(Page, { props: { data: mockData } });
		expect(screen.getByText('Technologies I Work With')).toBeInTheDocument();

		expect(screen.getByText('Senior Software Consultant')).toBeInTheDocument();
	});
});
