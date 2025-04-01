import { type Qualification } from '$lib/utils/types/types';
import sanityClient from '$lib/clients/sanity';
import type { PageServerLoad } from './$types';
import { qualificationsPreviewQuery } from '$lib/utils/queries/sanityQueries';

// This will not allow me to use a constant from utils. It throws an error that the value must be statically analyzable
// 86400 = seconds in a day
export const revalidate = 86_400;

export const load: PageServerLoad = async () => {
	const sanityData: Qualification[] = await sanityClient.fetch(qualificationsPreviewQuery);
	return { sanityData };
};
