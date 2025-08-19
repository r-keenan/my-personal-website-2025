import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

// Mock the imported components
vi.mock('$components/SeoHead.svelte', () => ({
	default: vi.fn(() => ({ $$: {} }))
}));

vi.mock('$lib/components/HomeHero.svelte', () => ({
	default: vi.fn(() => ({ $$: {} }))
}));

vi.mock('flowbite-svelte-icons', () => ({
	CheckCircleSolid: vi.fn(() => ({ $$: {} }))
}));

// Mock the utility function
vi.mock('$lib/utils/utilityFunctions', () => ({
	sliceTechLogos: vi.fn((count: number) => {
		// Return mock slides based on count
		return [
			[
				{ title: 'JavaScript', src: '/js-logo.png', alt: 'JavaScript' },
				{ title: 'TypeScript', src: '/ts-logo.png', alt: 'TypeScript' }
			]
		];
	})
}));

describe('/+page.svelte', () => {
	test('should render h2', () => {
		const mockData = {
			initialData: {
				qualifications: [
					{
						id: 'test-id-1', // Changed from _id to id
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
