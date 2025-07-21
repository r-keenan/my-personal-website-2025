import { createClient, SanityClient } from '@sanity/client';
import { getSecret } from './aws/awsSecretsManager';

// Singleton client
let client: SanityClient | null = null;

export async function sanityClient() {
	if (client) return client;
	try {
		const [projectId, dataset, token] = await Promise.all([
			getSecret('SANITY_PROJECT_ID').then((value) => {
				if (typeof value !== 'string' || value === null) {
					throw new Error('Failed to get Sanity Project ID');
				}
				return value;
			}),
			getSecret('SANITY_DATASET').then((value) => {
				if (typeof value !== 'string' || value === null) {
					throw new Error('Failed to get Sanity Dataset');
				}
				return value;
			}),
			getSecret('SANITY_TOKEN').then((value) => {
				if (typeof value !== 'string' || value === null) {
					throw new Error('Failed to get Sanity Dataset');
				}
				return value;
			})
		]);

		client = createClient({
			projectId,
			dataset,
			token,
			useCdn: false,
			apiVersion: '2025-02-19',
			ignoreBrowserTokenWarning: true
		});

		return client;
	} catch (error) {
		console.error('Error initializing Sanity Client');
		throw new Error('Failed to set up Sanity Client config');
	}
}

export async function getSanityImageUrl(): Promise<string> {
	const sanityImageUrl = await getSecret('SANITY_CDN_URL');
	if (typeof sanityImageUrl !== 'string' || sanityImageUrl === null) {
		throw new Error('Failed to get Sanity Image URL');
	}
	return sanityImageUrl;
}

export function getSanityClient() {
	return sanityClient();
}

export default { getSanityClient, getSanityImageUrl };
