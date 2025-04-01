import { createClient } from '@sanity/client';
import { SANITY_DATASET, SANITY_PROJECT_ID, SANITY_TOKEN } from '$env/static/private';

export const sanityClient = createClient({
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	token: SANITY_TOKEN,
	useCdn: true, // `false` if you want to ensure fresh data
	apiVersion: '2023-02-19',
	ignoreBrowserTokenWarning: true
});
