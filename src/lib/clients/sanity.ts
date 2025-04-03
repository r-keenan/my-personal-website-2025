import { createClient } from '@sanity/client';
import { getSecret } from './awsSecretsManager';

export async function sanityClient() {
	const sanityProjectId = await getSecret('SANITY_PROJECT_ID');
	const sanityDataset = await getSecret('SANITY_DATASET');
	const sanityToken = await getSecret('SANITY_TOKEN');

	if (!sanityProjectId || typeof sanityProjectId !== 'string') {
		throw new Error('Failed to get Sanity Project ID');
	}
	if (!sanityDataset || typeof sanityDataset !== 'string') {
		throw new Error('Failed to get Sanity Dataset');
	}
	if (!sanityToken || typeof sanityToken !== 'string') {
		throw new Error('Failed to get Sanity Dataset');
	}

	return createClient({
		projectId: sanityProjectId,
		dataset: sanityDataset,
		token: sanityToken,
		useCdn: true,
		apiVersion: '2023-02-19',
		ignoreBrowserTokenWarning: true
	});
}

export async function getSanityImageUrl() {
	const sanityImageUrl = await getSecret('SANITY_CDN_URL');
	if (!sanityImageUrl || typeof sanityImageUrl !== 'string') {
		throw new Error('Failed to get Sanity Image URL');
	}
	return sanityImageUrl;
}

export default sanityClient;
